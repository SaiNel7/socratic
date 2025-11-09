-- Clean up duplicate resources
-- This script keeps only the most recent entry for each unique title

-- First, let's see what duplicates exist
-- SELECT title, COUNT(*) as count 
-- FROM resources 
-- GROUP BY title 
-- HAVING COUNT(*) > 1;

-- Delete duplicates, keeping only the newest entry for each title
DELETE FROM resources
WHERE id IN (
  SELECT id
  FROM (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY title ORDER BY created_at DESC) as rn
    FROM resources
  ) t
  WHERE rn > 1
);

-- Verify the cleanup worked
SELECT title, COUNT(*) as count 
FROM resources 
GROUP BY title 
ORDER BY title;

