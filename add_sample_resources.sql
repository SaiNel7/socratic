-- Sample resources to get you started
-- Replace the file URLs with your actual PDF URLs from your storage solution
-- (e.g., Supabase Storage, Google Drive, Dropbox, AWS S3, etc.)

INSERT INTO resources (title, description, category, file_url, file_size, order_index) VALUES
('Possible Questions', '3 of 6 will be chosen', 'Practice Exams', 'https://vzsjytauzlytwzygeyjm.supabase.co/storage/v1/object/public/resources/Questions.pdf', '1 MB', 1);

INSERT INTO resources (title, description, category, file_url, file_size, order_index) VALUES
('Course Syllabus', 'Complete course syllabus with schedule and grading', 'Other Materials', 'https://vzsjytauzlytwzygeyjm.supabase.co/storage/v1/object/public/resources/Syllabus.pdf', '127 KB', 2);

INSERT INTO resources (title, description, category, file_url, file_size, order_index) VALUES
('God Notes', 'Sorry for the poor handwriting', 'Lecture Notes', 'https://vzsjytauzlytwzygeyjm.supabase.co/storage/v1/object/public/resources/Notes.pdf', '14.6 MB', 3);

INSERT INTO resources (title, description, category, file_url, file_size, order_index) VALUES
('Short Essay Structure', 'Suggested in discussion', 'Other Materials', 'https://vzsjytauzlytwzygeyjm.supabase.co/storage/v1/object/public/resources/SuggestedEssayStructure.pdf', '41 KB', 4);
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

