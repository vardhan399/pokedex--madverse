# 📖 Full-Stack Pokédex

A production-ready full-stack Pokédex application built with:

- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Prisma ORM** + PostgreSQL
- **tRPC** + React Query
- **Material UI v5**
- **Zod** validation

---

## 🗂 Project Structure

```
/app
  /api/trpc/[trpc]     → tRPC HTTP handler
  /part-1              → Single Pokémon lookup
  /part-2              → Multi-Pokémon fetch
  /part-3              → Filter by type
  layout.tsx           → Root layout with providers
  page.tsx             → Landing page

/components
  TRPCProvider.tsx     → tRPC + React Query setup
  ThemeProvider.tsx    → Material UI dark theme
  Navigation.tsx       → Top nav bar
  PokemonRow.tsx       → Reusable table row
  PokedexTable.tsx     → Paginated MUI table
  PokemonTypeSelection.tsx  → Type dropdown
  FilterablePokedexTable.tsx → Filtered table with state

/server
  /routers
    _app.ts            → Root tRPC router
    pokemon.ts         → Pokemon procedures
  /db
    client.ts          → Prisma singleton
  context.ts           → tRPC context
  trpc.ts              → tRPC init + middleware

/prisma
  schema.prisma        → Prisma schema
  seed.ts              → Database seed script

/lib
  trpc.ts              → tRPC React client

/types
  pokemon.ts           → Shared TypeScript types
```

---

## 🚀 Local Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### 1. Clone and Install

```bash
git clone <your-repo>
cd pokedex
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and set your PostgreSQL connection string:

```
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/pokedex"
```

### 3. Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Run migrations (creates the database schema)
npm run db:migrate

# Seed with 35 Pokémon
npm run db:seed
```

### 4. Start Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📌 Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/part-1` | Search single Pokémon by name |
| `/part-2` | Fetch multiple Pokémon by comma-separated names |
| `/part-3` | Browse & filter Pokémon by type |

---

## 🛠 tRPC Procedures

```typescript
// Part 1
pokemon.getPokemon({ name: string })
  → { id, name, types, sprite }

// Part 2
pokemon.getPokemonByNames({ names: string[], limit?, offset? })
  → { pokemon[], total, limit, offset, hasMore }

// Part 3
pokemon.getPokemonByType({ type?: string, limit?, offset? })
  → { pokemon[], total, limit, offset, hasMore }

// Utility
pokemon.getAvailableTypes()
  → string[]
```

---

## ✅ Features

- **Strict TypeScript** throughout — no `any`
- **Pagination** on all tables (limit + offset)
- **React Query caching** — 5-minute stale time, no unnecessary refetches
- **Clean architecture** — routers, context, and DB client separated
- **Reusable components** — `PokemonRow`, `PokedexTable`, `PokemonTypeSelection`
- **Responsive UI** — works on mobile and desktop
- **Prisma migrations** with proper indexing on `name` and `types` columns
- **Zod validation** on all tRPC inputs
- **35 Pokémon** seeded across 15+ types
