import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { showToast } from '../lib/toast';
import Composer from '../ui/Composer';
import PostRow from '../ui/PostRow';

export default function TopicPage() {
  const { slug } = useParams<{ slug: string }>();
  const [topic, setTopic] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showComposer, setShowComposer] = useState(false);

  const topicId = topic?.id;

  const handleNewPostClick = async () => {
    // Check if user is signed in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      showToast("You must be signed in to create a post", "warning");
      return;
    }
    setShowComposer(!showComposer);
  };

  useEffect(() => {
    async function fetchTopic() {
      if (!slug) return;
      
      setLoading(true);
      const { data: t } = await supabase
        .from('topics')
        .select('*')
        .eq('slug', slug)
        .single();
      
      setTopic(t);
      setLoading(false);
    }
    fetchTopic();
  }, [slug]);

  useEffect(() => {
    if (!topicId) return;

    const load = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('id,title,body,tag,is_anonymous,score,created_at,author:profiles!posts_author_id_fkey(handle)')
        .eq('topic_id', topicId)
        .order('score', { ascending: false })
        .order('created_at', { ascending: false });

      console.log('Posts query result:', { data, error, topicId });
      
      if (error) {
        console.error('Error fetching posts:', error);
      }

      setPosts(data ?? []);
    };

    load();

    // Realtime updates for posts (new posts, edits, deletes)
    const postsChannel = supabase
      .channel(`posts-${topicId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts', filter: `topic_id=eq.${topicId}` },
        () => {
          // Slight delay to ensure trigger has completed
          setTimeout(load, 150);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(postsChannel);
    };
  }, [topicId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-20 bg-white rounded-xl animate-pulse" />
        <div className="h-64 bg-white rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-gray-500">Topic not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{topic.title}</h1>
        <button
          onClick={handleNewPostClick}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm hover:shadow"
        >
          {showComposer ? 'Cancel' : '+ New Post'}
        </button>
      </div>

      {/* Composer */}
      {showComposer && (
        <Composer
          topicId={topic.id}
          onPosted={(p) => {
            setPosts((prev) => [p, ...prev]);
            setShowComposer(false);
          }}
        />
      )}

      {/* Posts */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-gray-500 text-lg mb-2">No posts yet</p>
              <p className="text-gray-400 text-sm">Be the first to contribute to this discussion!</p>
            </div>
          </div>
        ) : (
          posts.map((post) => <PostRow key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}

