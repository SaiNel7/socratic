import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { showToast } from "../lib/toast";
import type { Post, PostTag } from "../types/database";

type PostRowProps = {
  post: Post & {
    author?: { handle: string | null } | null;
  };
};

const TAG_COLORS: Record<PostTag, string> = {
  Claim: "bg-blue-100 text-blue-800",
  Counterexample: "bg-red-100 text-red-800",
  Objection: "bg-purple-100 text-purple-800",
  Definition: "bg-yellow-100 text-yellow-800",
  Quote: "bg-pink-100 text-pink-800",
  Question: "bg-indigo-100 text-indigo-800",
};

export default function PostRow({ post }: PostRowProps) {
  const [score, setScore] = useState(post.score);
  const [userVote, setUserVote] = useState<-1 | 0 | 1>(0);
  const [isVoting, setIsVoting] = useState(false);
  const [lastServerState, setLastServerState] = useState({ score: post.score, vote: 0 as -1 | 0 | 1 });

  // Load user's existing vote on mount
  useEffect(() => {
    async function loadUserVote() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('post_votes_users')
        .select('value')
        .eq('post_id', post.id)
        .eq('voter_id', user.id)
        .maybeSingle();

      const vote = (data?.value as -1 | 1) || 0;
      setUserVote(vote);
      setLastServerState({ score: post.score, vote });
    }

    loadUserVote();
  }, [post.id, post.score]);

  const handleVote = async (clickedValue: -1 | 1) => {
    // Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      showToast("You must be signed in to vote", "warning");
      return;
    }

    // Prevent concurrent votes
    if (isVoting) return;
    setIsVoting(true);

    // Determine new intended state: toggle if same, switch if different
    const newVote = userVote === clickedValue ? 0 : clickedValue;
    const delta = newVote - userVote;

    // Optimistic UI update
    setScore(score + delta);
    setUserVote(newVote);

    try {
      // Execute the vote operation
      if (newVote === 0) {
        // Clear vote - DELETE
        const { error } = await supabase
          .from("post_votes_users")
          .delete()
          .eq("post_id", post.id)
          .eq("voter_id", user.id);

        if (error) throw error;
      } else {
        // Set vote - UPSERT (handles both new vote and switching)
        const { error } = await supabase
          .from("post_votes_users")
          .upsert({
            post_id: post.id,
            voter_id: user.id,
            value: newVote,
          });

        if (error) throw error;
      }

      // Wait for trigger to complete (DB triggers update score)
      await new Promise(resolve => setTimeout(resolve, 200));

      // Reconcile with server (fetch authoritative state)
      const [postResult, voteResult] = await Promise.all([
        supabase
          .from('posts')
          .select('score')
          .eq('id', post.id)
          .single(),
        supabase
          .from('post_votes_users')
          .select('value')
          .eq('post_id', post.id)
          .eq('voter_id', user.id)
          .maybeSingle()
      ]);

      if (postResult.error) throw postResult.error;

      // Server is source of truth - reconcile
      const serverScore = postResult.data.score;
      const serverVote = (voteResult.data?.value as -1 | 1) || 0;

      setScore(serverScore);
      setUserVote(serverVote);
      setLastServerState({ score: serverScore, vote: serverVote });

    } catch (error: any) {
      console.error("Vote failed:", error);
      // Revert to last known good server state
      setScore(lastServerState.score);
      setUserVote(lastServerState.vote);
      showToast("Vote failed; reverted", "error");
    } finally {
      setIsVoting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const authorName = post.is_anonymous
    ? "Anonymous"
    : post.author?.handle || "Unknown";

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-5 hover:shadow-md transition-all">
      <div className="flex gap-2 sm:gap-4">
        {/* Vote buttons */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <button
            onClick={() => handleVote(1)}
            disabled={isVoting}
            className={`p-1 sm:p-1.5 rounded-lg transition-all ${
              userVote === 1 
                ? "text-blue-600 bg-blue-50" 
                : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"
            } ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Upvote"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 3l6 6H4l6-6z" />
            </svg>
          </button>
          <span className={`text-sm sm:text-base font-bold min-w-[1.5rem] sm:min-w-[2rem] text-center ${
            score > 0 ? "text-blue-600" : score < 0 ? "text-red-600" : "text-gray-600"
          }`}>
            {score}
          </span>
          <button
            onClick={() => handleVote(-1)}
            disabled={isVoting}
            className={`p-1 sm:p-1.5 rounded-lg transition-all ${
              userVote === -1 
                ? "text-red-600 bg-red-50" 
                : "text-gray-400 hover:text-red-600 hover:bg-red-50"
            } ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Downvote"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 17l6-6H4l6 6z" />
            </svg>
          </button>
        </div>

        {/* Post content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug break-words mb-2 sm:mb-3">
            {post.title}
          </h3>

          <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 whitespace-pre-wrap break-words leading-relaxed">
            {post.body}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
            <span
              className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-xs font-semibold ${
                TAG_COLORS[post.tag]
              }`}
            >
              {post.tag}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="font-medium text-gray-700">{authorName}</span>
            <span className="hidden sm:inline">•</span>
            <span>{formatDate(post.created_at)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

