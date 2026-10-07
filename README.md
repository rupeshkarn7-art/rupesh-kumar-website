# Rupesh Kumar — Personal Website

Personal brand, portfolio, knowledge hub and consulting/mentoring site.
**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Supabase (PostgreSQL, Auth, Storage) · Vercel.

---

## 1. Going live (one-time, ~5 minutes)

1. **Vercel** → [vercel.com/new](https://vercel.com/new) → sign in with GitHub → *Import* `rupesh-kumar-website`.
2. Before clicking *Deploy*, open **Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://airfuywxmjhkhonxpoeq.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | your Supabase publishable key (Supabase → Project Settings → API Keys) |
   | `ADMIN_EMAIL` | `rupeshkarn7@gmail.com` |

3. Click **Deploy**. You'll get a URL like `https://rupesh-kumar-website.vercel.app`.
4. **Supabase** → project *rupesh-kumar-website* → **Authentication → URL Configuration**:
   - *Site URL*: your Vercel URL (e.g. `https://rupesh-kumar-website.vercel.app`)
   - *Redirect URLs*: add `https://rupesh-kumar-website.vercel.app/**`
   (This is what makes the admin sign-in email link return to your site.)

Every push to the `main` branch redeploys automatically.

### Custom domain (later)
Vercel → Project → Settings → Domains → add your domain. Then set `NEXT_PUBLIC_SITE_URL` to it in Vercel, and add the domain to Supabase's Site URL / Redirect URLs.

---

## 2. Editing the site

### Admin dashboard — `/admin`
Go to `yoursite/admin`, enter your email, click the link that arrives. Only the email in `ADMIN_EMAIL` **and** in the database allow-list can sign in or change anything.

| Section | What you can do |
|---|---|
| **Enquiries** | Read consulting / mentoring / contact messages, mark read/replied/archived, reply by email |
| **Projects** | Add projects & case studies: problem, architecture, stack, screenshots, GitHub/demo links, impact, lessons |
| **Articles** | Write blog posts, tutorials, guides, cheat sheets, case studies (Markdown, code blocks, tables, images) |
| **Videos** | Paste a YouTube or LinkedIn video URL — it embeds automatically (no uploads) |
| **Resources** | Upload PDFs / Excel / Word files or link to external resources |

Tick **Published** to make an item public; **Featured** puts it on the homepage. Changes appear within seconds.

### Text that changes rarely — `content/` folder
Edit these files directly on GitHub (pencil icon → *Commit changes*). The site redeploys in ~1 minute.

| File | Contains |
|---|---|
| `content/profile.ts` | Bio, journey timeline, experience, education, certifications, skills, headline outcomes, **testimonials** |
| `content/services.ts` | Consulting services, engagement models, mentoring services & **packages / prices** |
| `content/taxonomy.ts` | Category lists used by filters and admin dropdowns |
| `lib/site.ts` | Name, email, social links, navigation |
| `public/resume/Rupesh_Kumar_Resume.pdf` | Downloadable resume (replace the file to update) |
| `public/images/` | Portrait photos |

- **Mentoring prices:** in `content/services.ts` set `price: "₹1,500"` (currently `null` → shows "Price to be configured").
- **Testimonials:** add real, permission-granted quotes to `testimonials` in `content/profile.ts`; the section appears automatically.
- **YouTube:** set `NEXT_PUBLIC_YOUTUBE_URL` in Vercel and the YouTube buttons appear everywhere.

---

## 3. Optional integrations (all via Vercel environment variables)

| Feature | Variables |
|---|---|
| Email notification for each enquiry | `RESEND_API_KEY`, `RESEND_FROM` ([resend.com](https://resend.com), free tier) |
| Google Analytics 4 | `NEXT_PUBLIC_GA_ID` |
| Plausible (privacy-friendly) | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` |
| Google Search Console | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` |
| Higher GitHub API limits | `GITHUB_TOKEN` (server-only) |

See `.env.example` for the full list.

---

## 4. Architecture

```
app/
  (site)/            public pages — home, about, projects, hub, blog, vlogs, case-studies,
                     consulting, mentoring, resources, resume, contact, privacy
  admin/             private dashboard (login + CRUD + enquiries)
  auth/              magic-link callback & sign-out
  sitemap.ts robots.ts opengraph-image.tsx
components/          UI building blocks (cards, forms, layout, admin, SEO)
content/             typed static content + seed data for the database
lib/
  data.ts            content repository — the only place pages read data from
  schemas.ts         Zod models (validation for forms and admin)
  admin/entities.ts  admin form definitions (add a field here to make it editable)
  actions/           server actions (enquiries, admin save/delete, auth)
  supabase/          database clients
supabase/migrations/ database schema & security policies
proxy.ts             session refresh + /admin protection
```

**Security:** row-level security means the public can only read *published* content and submit enquiries; only the allow-listed admin email can write. Forms are validated server-side (Zod), have a honeypot, a fill-time check, per-IP throttling and a per-email database rate limit. No secrets are stored in the repo; the Supabase publishable key is designed to be public.

**Swapping the backend later:** pages only call functions in `lib/data.ts`. Point those at a headless CMS or another database and nothing else changes. If Supabase is unreachable, the site falls back to the seed content in `content/seed/`.

**Future features** (newsletter, booking, payments, client portal, AI assistant…) slot in as new routes under `app/`, new tables + policies in Supabase, and new entries in `lib/admin/entities.ts`.

---

## 5. Local development

```bash
cp .env.example .env.local   # fill in the values
npm install
npm run dev                  # http://localhost:3000
```

Regenerate starter resources: `python3 scripts/build_resources.py`
Print seed SQL for a fresh database: `node scripts/seed-sql.ts > seed.sql`
