import { useState } from "react";
import { supabase } from "../lib/supabase";
import type { PostTag } from "../types/database";

type ComposerProps = {
  topicId: string;
  onPosted?: (post: any) => void;
};

const POST_TAGS: PostTag[] = [
  "Claim",
  "Reason",
  "Counterexample",
  "Critique",
  "Definition",
  "Quote",
  "Question",
];

const TAG_COLORS: Record<PostTag, string> = {
  Claim: "bg-blue-100 text-blue-800",
  Reason: "bg-green-100 text-green-800",
  Counterexample: "bg-red-100 text-red-800",
  Critique: "bg-purple-100 text-purple-800",
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
      const { data, error } = await supabase
        .from("posts")
        .insert({
          topic_id: topicId,
          title: title.trim(),
          body: body.trim(),
          tag,
          is_anonymous: isAnonymous,
        })
        .select("id,title,body,tag,is_anonymous,score,created_at,author:profiles(handle)")
        .single();

      if (error) throw error;

      // Reset form
      setTitle("");
      setBody("");
      setTag("Claim");
      setIsAnonymous(false);

      if (data && onPosted) {
        onPosted(data);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          required
        />
      </div>

      <div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your thoughts..."
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base resize-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Tag</label>
        <div className="flex flex-wrap gap-2">
          {POST_TAGS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tag === t
                  ? `${TAG_COLORS[t]} ring-2 ring-offset-1 ring-blue-300`
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900">Post anonymously</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting || !title.trim() || !body.trim()}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium shadow-sm hover:shadow"
        >
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}

