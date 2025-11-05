-- Add description column to topics table
ALTER TABLE topics ADD COLUMN IF NOT EXISTS description TEXT;

-- Update topics with descriptions
UPDATE topics SET description = 'This section of the textbook explores various forms of theisms or beliefs in the existence of a god or gods, particularly a personal God who intervenes in the universe. It''s contrasted with atheism (denial of gods) and agnosticism (uncertainty about them). Key discussions often revolve around what kind of evidence or reasoning can justify belief in God.'
WHERE slug ILIKE 'theisms' OR title ILIKE 'Theisms';

UPDATE topics SET description = 'Pascal argued that believing in God is the most rational "bet" as in if God exists, you gain infinite reward; if not, you lose little. The wager prioritizes prudential reasoning and hence treats belief as a practical decision under uncertainty rather than a matter of proof.'
WHERE slug ILIKE 'pascals-wager' OR title ILIKE 'Pascal''s Wager';

UPDATE topics SET description = 'Anselm claimed that God, defined as "that than which nothing greater can be conceived," must exist because existence in reality is greater than existence in the mind alone. This is a purely logical argument from definition (a priori), not observation (experience / a posteriori).'
WHERE slug ILIKE 'anselms-ontological-argument' OR title ILIKE 'Anselm''s Ontological Argument';

UPDATE topics SET description = 'Aquinas argued that the existence of motion, causation, and contingency in the world requires a "First Cause" which he identifies as God. His reasoning is based on the impossibility of infinite regress in causes.'
WHERE slug = 'aquinas-cosmological';

UPDATE topics SET description = 'Paley compared the complexity of nature to a watch: just as a watch implies a watchmaker, the natural world implies an intelligent designer. His argument draws on order and purpose in living systems.'
WHERE slug ILIKE 'paleys-argument-by-design' OR title ILIKE 'Paley''s Argument by Design';

UPDATE topics SET description = 'Hume argued that the existence of evil and suffering seems incompatible with an all-powerful, all-good God. If God is able and willing to prevent evil, why does it persist? The problem raises deep questions about divine justice, free will, and whether moral evil can be reconciled with divine perfection.'
WHERE slug ILIKE 'humes-problem-of-evil' OR title ILIKE 'Hume''s Problem of Evil';

UPDATE topics SET description = 'To be covered in lecture...'
WHERE slug ILIKE 'theodicies' OR title ILIKE 'Theodicies';

