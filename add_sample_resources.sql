-- Sample resources to get you started
-- Replace the file URLs with your actual PDF URLs from your storage solution
-- (e.g., Supabase Storage, Google Drive, Dropbox, AWS S3, etc.)

-- Lecture Notes
INSERT INTO resources (title, description, category, file_url, file_size, order_index) VALUES
('Week 1 - Introduction to Philosophy', 'Overview of key philosophical concepts and methods', 'Lecture Notes', 'https://your-storage-url.com/lecture-1.pdf', '2.3 MB', 1),
('Week 2 - Ethics and Morality', 'Exploration of ethical frameworks and moral reasoning', 'Lecture Notes', 'https://your-storage-url.com/lecture-2.pdf', '1.8 MB', 2),
('Week 3 - Epistemology', 'Study of knowledge, belief, and justification', 'Lecture Notes', 'https://your-storage-url.com/lecture-3.pdf', '2.1 MB', 3);

-- Practice Exams
INSERT INTO resources (title, description, category, file_url, file_size, order_index) VALUES
('Midterm Practice Exam', 'Sample questions covering weeks 1-4', 'Practice Exams', 'https://your-storage-url.com/practice-midterm.pdf', '1.2 MB', 4),
('Final Exam Practice Questions', 'Comprehensive practice problems', 'Practice Exams', 'https://your-storage-url.com/practice-final.pdf', '2.5 MB', 5),
('Quiz 1 Review', 'Practice questions for the first quiz', 'Practice Exams', 'https://your-storage-url.com/quiz-1.pdf', '800 KB', 6);

-- Other Materials
INSERT INTO resources (title, description, category, file_url, file_size, order_index) VALUES
('Course Syllabus', 'Complete course syllabus with schedule and grading', 'Other Materials', 'https://your-storage-url.com/syllabus.pdf', '500 KB', 7),
('Study Guide - Prelim 3', 'Comprehensive review guide for the third prelim', 'Other Materials', 'https://your-storage-url.com/study-guide-prelim3.pdf', '3.5 MB', 8),
('Recommended Reading List', 'Additional philosophical texts for deeper understanding', 'Other Materials', 'https://your-storage-url.com/reading-list.pdf', '600 KB', 9);

-- To upload files and get URLs, you can:
-- 1. Use Supabase Storage (recommended if using Supabase):
--    - Go to your Supabase dashboard
--    - Navigate to Storage
--    - Create a bucket called 'resources' and set it to public
--    - Upload your PDFs
--    - Get the public URL for each file
--
-- 2. Use Google Drive:
--    - Upload files and set sharing to "Anyone with the link"
--    - Use the direct download link format
--
-- 3. Use Dropbox:
--    - Upload files and create public links
--    - Replace dl=0 with dl=1 in the URL for direct download
--
-- 4. Use any other cloud storage or CDN of your choice

