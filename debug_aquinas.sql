-- Check all topics to see their exact slugs and titles
SELECT 
  id, 
  slug, 
  title, 
  CASE WHEN description IS NULL THEN 'NO DESCRIPTION' ELSE 'HAS DESCRIPTION' END as has_desc,
  LEFT(description, 30) as desc_preview
FROM topics 
ORDER BY order_index;

-- Specifically look for Aquinas
SELECT * FROM topics WHERE slug ILIKE '%aquinas%' OR title ILIKE '%aquinas%';

-- If the above returns nothing, let's see all topics
-- SELECT * FROM topics;

