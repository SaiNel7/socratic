import { useState } from "react";
import { supabase } from "../lib/supabase";
import type { Post, PostTag } from "../types/database";

type PostRowProps = {
  post: Post & {
    author?: { handle: string | null } | null;
  };
};

const TAG_COLORS: Record<PostTag, string> = {
  Claim: "bg-blue-100 text-blue-800",
  Reason: "bg-green-100 text-green-800",
  Counterexample: "bg-red-100 text-red-800",
  Critique: "bg-purple-100 text-purple-800",
  Definition: "bg-yellow-100 text-yellow-800",
  Quote: "bg-pink-100 text-pink-800",
  Question: "bg-indigo-100 text-indigo-800",
};

export default function PostRow({ post }: PostRowProps) {
  const [score, setScore] = useState(post.score);
  const [userVote, setUserVote] = useState<-1 | 0 | 1>(0);

  const handleVote = async (value: -1 | 1) => {
    const newVote = userVote === value ? 0 : value;
    const delta = newVote - userVote;

    // Optimistic update
    setScore(score + delta);
    setUserVote(newVote);

    try {
      if (newVote === 0) {
        // Remove vote
        await supabase
          .from("post_votes_ip")
          .delete()
          .eq("post_id", post.id);
      } else {
        // Upsert vote
        await supabase
          .from("post_votes_ip")
          .upsert({
            post_id: post.id,
            value: newVote,
            ip_hash: "anonymous", // You'd need to implement IP hashing
          });
      }
    } catch (error) {
      console.error("Error voting:", error);
      // Revert on error
      setScore(score);
      setUserVote(userVote);
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
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all">
      <div className="flex gap-4">
        {/* Vote buttons */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <button
            onClick={() => handleVote(1)}
            className={`p-1.5 rounded-lg transition-all ${
              userVote === 1 
                ? "text-blue-600 bg-blue-50" 
                : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"
            }`}
            aria-label="Upvote"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 3l6 6H4l6-6z" />
            </svg>
          </button>
          <span className={`text-base font-bold min-w-[2rem] text-center ${
            score > 0 ? "text-blue-600" : score < 0 ? "text-red-600" : "text-gray-600"
          }`}>
            {score}
          </span>
          <button
            onClick={() => handleVote(-1)}
            className={`p-1.5 rounded-lg transition-all ${
              userVote === -1 
                ? "text-red-600 bg-red-50" 
                : "text-gray-400 hover:text-red-600 hover:bg-red-50"
            }`}
            aria-label="Downvote"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 17l6-6H4l6 6z" />
            </svg>
          </button>
        </div>

        {/* Post content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-3">
            <span
              className={`inline-block px-3 py-1.5 rounded-lg text-xs font-semibold flex-shrink-0 ${
                TAG_COLORS[post.tag]
              }`}
            >
              {post.tag}
            </span>
            <h3 className="flex-1 text-lg font-bold text-gray-900 leading-snug break-words">
              {post.title}
            </h3>
          </div>

          <p className="text-base text-gray-700 mb-4 whitespace-pre-wrap break-words leading-relaxed">
            {post.body}
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="font-medium text-gray-700">{authorName}</span>
            <span>•</span>
            <span>{formatDate(post.created_at)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

