-- Add unique constraint to prevent duplicate titles
-- Run this AFTER cleaning up duplicates

ALTER TABLE resources 
ADD CONSTRAINT unique_resource_title UNIQUE (title);

-- This will prevent duplicate titles from being inserted in the future

