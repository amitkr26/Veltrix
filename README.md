# Veltrix | Elite Creator Platform

Veltrix is a high-performance short-video social ecosystem designed for engineers, digital artists, and technical makers. Built with Next.js 15 and Appwrite, it provides a "lived-in" creative space with elite interaction design and production-grade reliability.

![Veltrix Banner](https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop)

## 🚀 Core Features
- **Cinematic Feed**: Optimized for high-bitrate technical media with intersection-aware playback.
- **Creator Studio**: Professional media ingestion pipeline with Zod-hardened metadata validation.
- **Social Graph**: Persistent follows, likes, and threaded technical debates via Appwrite Databases.
- **Elite UX**: OKLCH-based design system, glassmorphic UI, and motion-heavy transitions.
- **Operational Safety**: Built-in observability, exponential backoff retries, and media failure fallbacks.

## 🛠️ Tech Stack
- **Frontend**: Next.js 15+ (App Router), Tailwind CSS 4, Framer Motion, Zustand, TanStack Query.
- **Backend-as-a-Service**: Appwrite (Auth, Database, Storage).
- **Testing**: Vitest + React Testing Library.
- **Deployment**: Vercel + Appwrite Cloud.

## 📦 Project Structure
```bash
src/
├── app/             # Route handlers and layout components
├── components/      # Global UI primitives and layout structures
├── features/        # Domain-driven modules (auth, feed, studio)
├── services/        # Resilient API communication layer (Appwrite)
├── store/           # Unified state management (Zustand)
├── lib/             # Utilities, validators, and infrastructure init
└── types/           # Strict domain models
```

## 🏗️ Architecture Overview
Veltrix follows a **Feature-Sliced Design** philosophy. Each domain (Auth, Feed, Upload) is encapsulated within the `features/` directory, containing its own components and hooks. The `services/` layer provides a resilient, singleton-based interface to Appwrite, implementing exponential backoff and structured error tracking via the `Observability` service.

## ⚙️ Infrastructure Setup

### 1. Appwrite Configuration
Veltrix requires the following collections in your Appwrite project:
- `users`: Profile metadata.
- `posts`: Video content and metadata.
- `comments`: Social interactions.
- `notifications`: Activity stream.

### 2. Environment Variables
Clone `.env.example` to `.env.local` and populate:
```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
# ... see .env.example for full list
```

## 🧪 Testing & Quality Assurance
Run the integrated test suite:
```bash
npm run test
```

## 🚀 Deployment

### Vercel (Frontend)
1. Push this repository to GitHub.
2. Connect the repository to Vercel.
3. Configure all `NEXT_PUBLIC_APPWRITE_*` environment variables in the Vercel dashboard.
4. Deploy.

### Appwrite (Backend)
1. Create a new Project in Appwrite Cloud.
2. Create the collections listed in `Infrastructure Setup`.
3. Configure Permissions: `Any` (Read) for public feeds, `User` (Create/Update/Delete) for owned content.
4. Set up a Storage Bucket named `media`.

## 🛠️ Troubleshooting
- **Hydration Errors**: Ensure that all browser-only APIs (like `window`) are wrapped in `useEffect` or used in `"use client"` components.
- **Appwrite Connection**: Verify that your Project ID and Endpoint are correct and that you have whitelisted your deployment domain in Appwrite Settings.
- **Upload Failures**: Check that the `media` bucket permissions allow 'Create' for authenticated users and that the file size is under 50MB.

---
Built with intensity by **amitkr26** for the next generation of digital creators.
