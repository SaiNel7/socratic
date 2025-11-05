# Socratic

A platform for philosophical discussion and Socratic dialogue.

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL)
- **Routing:** React Router v7
- **Authentication:** Supabase Auth (Cornell email only)

## Database Schema

- **Profiles:** User accounts linked to auth
- **Topics:** Philosophical discussion topics (Theisms, Pascal's Wager, etc.)
- **Posts:** Tagged contributions (Claim, Reason, Counterexample, Critique, Definition, Quote, Question)
- **Voting:** User-based and IP-based voting system with score aggregation

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── lib/           # Supabase client and auth utilities
├── routes/        # Page components (HomePage, TopicPage, etc.)
├── types/         # TypeScript types for database schema
└── ui/            # Reusable UI components (PostRow, Composer, etc.)
```
