import { useState } from "react";
import { supabase } from "../lib/supabase";
import { showToast } from "../lib/toast";
import type { PostTag } from "../types/database";

type ComposerProps = {
  topicId: string;
  onPosted?: (post: any) => void;
};

const POST_TAGS: PostTag[] = [
  "Claim",
  "Counterexample",
  "Objection",
  "Definition",
  "Quote",
  "Question",
];

const TAG_COLORS: Record<PostTag, string> = {
  Claim: "bg-blue-100 text-blue-800",
  Counterexample: "bg-red-100 text-red-800",
  Objection: "bg-purple-100 text-purple-800",
  Definition: "bg-yellow-100 text-yellow-800",
  Quote: "bg-pink-100 text-pink-800",
  Question: "bg-indigo-100 text-indigo-800",
};

export default function Composer({ topicId, onPosted }: ComposerProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState<PostTag>("Claim");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setIsSubmitting(true);
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        showToast("You must be signed in to post. Please sign in and try again.", "warning");
        setIsSubmitting(false);
        return;
      }
      
      const { data, error } = await supabase
        .from("posts")
        .insert({
          topic_id: topicId,
          author_id: user.id,
          title: title.trim(),
          body: body.trim(),
          tag,
          is_anonymous: isAnonymous,
        })
        .select("id,title,body,tag,is_anonymous,score,created_at,author:profiles!posts_author_id_fkey(handle)")
        .single();

      if (error) {
        if (error.code === '42501') {
          showToast("Permission denied. Make sure you're signed in with a Cornell email.", "error");
        } else {
          showToast(`Error creating post: ${error.message}`, "error");
        }
        console.error("Error creating post:", error);
        return;
      }
      
      showToast("Post created successfully!", "success");

      // Reset form
      setTitle("");
      setBody("");
      setTag("Claim");
      setIsAnonymous(false);

      if (data && onPosted) {
        onPosted(data);
      }
    } catch (error: any) {
      showToast(`Failed to create post: ${error.message || 'Unknown error'}`, "error");
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const titleLength = title.length;
  const bodyLength = body.length;
  const isTitleValid = titleLength >= 5 && titleLength <= 120;
  const isBodyValid = bodyLength >= 40 && bodyLength <= 1200;

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 space-y-4 sm:space-y-5">
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <span className={`text-xs ${isTitleValid ? 'text-gray-500 dark:text-gray-400' : 'text-red-600 dark:text-red-400'}`}>
            {titleLength}/120 (min: 5)
          </span>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title..."
          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${
            title && !isTitleValid ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
          }`}
          required
          minLength={5}
          maxLength={120}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Body</label>
          <span className={`text-xs ${isBodyValid ? 'text-gray-500 dark:text-gray-400' : 'text-red-600 dark:text-red-400'}`}>
            {bodyLength}/1200 (min: 40)
          </span>
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your thoughts... (minimum 40 characters)"
          rows={5}
          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-sm sm:text-base resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${
            body && !isBodyValid ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
          }`}
          required
          minLength={40}
          maxLength={1200}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Tag</label>
        <div className="flex flex-wrap gap-2">
          {POST_TAGS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                tag === t
                  ? `${TAG_COLORS[t]} ring-2 ring-offset-1 dark:ring-offset-gray-800 ring-blue-300 dark:ring-blue-500`
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="w-4 h-4 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">Post anonymously</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting || !isTitleValid || !isBodyValid}
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium shadow-sm hover:shadow"
        >
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}

