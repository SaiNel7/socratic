-- Create resources table for course materials
CREATE TABLE IF NOT EXISTS resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('Lecture Notes', 'Practice Exams', 'Other Materials')),
  file_url TEXT NOT NULL,
  file_size TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index for faster ordering
CREATE INDEX IF NOT EXISTS idx_resources_order ON resources(order_index);

-- Enable RLS (Row Level Security)
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read resources
CREATE POLICY "Resources are viewable by everyone"
  ON resources
  FOR SELECT
  USING (true);

-- Optional: Add some sample resources
-- You can uncomment and modify these to add initial data:

-- INSERT INTO resources (title, description, category, file_url, file_size, order_index) VALUES
-- ('Week 1 - Introduction to Philosophy', 'Overview of key philosophical concepts and methods', 'Lecture Notes', 'https://your-storage-url.com/lecture-1.pdf', '2.3 MB', 1),
-- ('Week 2 - Ethics and Morality', 'Exploration of ethical frameworks and moral reasoning', 'Lecture Notes', 'https://your-storage-url.com/lecture-2.pdf', '1.8 MB', 2),
-- ('Midterm Practice Exam', 'Sample questions covering weeks 1-4', 'Practice Exams', 'https://your-storage-url.com/practice-midterm.pdf', '1.2 MB', 3),
-- ('Final Exam Review Guide', 'Comprehensive review of all course material', 'Other Materials', 'https://your-storage-url.com/final-review.pdf', '3.5 MB', 4);

