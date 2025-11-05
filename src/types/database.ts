export type Profile = {
  id: string;
  handle: string | null;
  created_at: string;
};

export type Topic = {
  id: string;
  slug: string;
  title: string;
  order_index: number;
};

export type PostTag = 
  | 'Claim'
  | 'Counterexample'
  | 'Objection'
  | 'Definition'
  | 'Quote'
  | 'Question';

export type Post = {
  id: string;
  topic_id: string;
  author_id: string | null;
  title: string;
  body: string;
  tag: PostTag;
  is_anonymous: boolean;
  score: number;
  created_at: string;
};

export type PostVoteUser = {
  post_id: string;
  voter_id: string;
  value: -1 | 1;
};

export type PostVoteIP = {
  post_id: string;
  ip_hash: string;
  value: -1 | 1;
};

