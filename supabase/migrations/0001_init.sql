-- Schema for the personal website (applied to Supabase project "rupesh-kumar-website").
-- Kept here for reference / re-creating the database in a new project.

create schema if not exists private;
grant usage on schema private to anon, authenticated;

-- Admin allow-list (only these emails can write content or read enquiries)
create table public.site_admins (email text primary key);
alter table public.site_admins enable row level security;
create policy "no direct access" on public.site_admins for select to authenticated using (false);
-- insert into public.site_admins (email) values ('you@example.com');

create or replace function private.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.site_admins a
                 where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', '')));
$$;
revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated;

create or replace function private.set_updated_at() returns trigger
language plpgsql set search_path = '' as $$ begin new.updated_at = now(); return new; end; $$;

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 2 and 160),
  summary text not null default '', category text not null,
  project_type text not null default 'Professional', status text not null default 'Completed',
  year int, role text default '',
  technologies text[] not null default '{}', key_features text[] not null default '{}',
  cover_image text, screenshots text[] not null default '{}',
  github_url text, demo_url text, demo_video_url text,
  overview text default '', problem text default '', objectives text default '', solution text default '',
  architecture text default '', workflow text default '', implementation text default '', impact text default '',
  challenges text default '', lessons text default '', future text default '',
  is_case_study boolean not null default false, featured boolean not null default false,
  published boolean not null default false, sort_order int not null default 100,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 2 and 200),
  excerpt text not null default '', content text not null default '',
  category text not null, content_type text not null default 'Article',
  tags text[] not null default '{}', hero_image text, author text not null default 'Rupesh Kumar',
  published_at timestamptz not null default now(),
  featured boolean not null default false, published boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.videos (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null, description text not null default '',
  platform text not null default 'youtube' check (platform in ('youtube','linkedin','other')),
  video_url text not null, series text not null default 'Technology Explained',
  thumbnail text, duration text, published_at timestamptz not null default now(),
  featured boolean not null default false, published boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null, description text not null default '',
  category text not null, format text not null default 'PDF',
  file_url text, external_url text,
  featured boolean not null default false, published boolean not null default false,
  sort_order int not null default 100,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('contact','consulting','mentoring')),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 200 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  company text check (company is null or char_length(company) <= 160),
  purpose text not null check (char_length(purpose) <= 80),
  message text not null check (char_length(message) between 10 and 5000),
  details jsonb not null default '{}'::jsonb check (pg_column_size(details) < 4000),
  status text not null default 'new' check (status in ('new','read','replied','archived')),
  created_at timestamptz not null default now()
);
create index enquiries_created_idx on public.enquiries (created_at desc);
create index enquiries_email_idx on public.enquiries (lower(email), created_at desc);

create or replace function private.enquiry_rate_limit() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if (select count(*) from public.enquiries e where lower(e.email) = lower(new.email)
      and e.created_at > now() - interval '10 minutes') >= 3 then
    raise exception 'rate_limited';
  end if;
  new.status := 'new'; new.created_at := now(); return new;
end; $$;
revoke all on function private.enquiry_rate_limit() from public, anon, authenticated;
create trigger enquiries_rate_limit before insert on public.enquiries for each row execute function private.enquiry_rate_limit();

create trigger projects_updated before update on public.projects for each row execute function private.set_updated_at();
create trigger articles_updated before update on public.articles for each row execute function private.set_updated_at();
create trigger videos_updated before update on public.videos for each row execute function private.set_updated_at();
create trigger resources_updated before update on public.resources for each row execute function private.set_updated_at();

alter table public.projects enable row level security;
alter table public.articles enable row level security;
alter table public.videos enable row level security;
alter table public.resources enable row level security;
alter table public.enquiries enable row level security;

do $$ declare t text; begin
  foreach t in array array['projects','articles','videos','resources'] loop
    execute format('create policy "public reads published" on public.%I for select to anon, authenticated using (published = true or (select private.is_admin()))', t);
    execute format('create policy "admin inserts" on public.%I for insert to authenticated with check ((select private.is_admin()))', t);
    execute format('create policy "admin updates" on public.%I for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()))', t);
    execute format('create policy "admin deletes" on public.%I for delete to authenticated using ((select private.is_admin()))', t);
  end loop;
end $$;

create policy "anyone can submit enquiry" on public.enquiries for insert to anon, authenticated with check (status = 'new');
create policy "admin reads enquiries" on public.enquiries for select to authenticated using ((select private.is_admin()));
create policy "admin updates enquiries" on public.enquiries for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "admin deletes enquiries" on public.enquiries for delete to authenticated using ((select private.is_admin()));

insert into storage.buckets (id, name, public, file_size_limit) values ('media', 'media', true, 26214400) on conflict (id) do nothing;
create policy "admin uploads media" on storage.objects for insert to authenticated with check (bucket_id = 'media' and (select private.is_admin()));
create policy "admin updates media" on storage.objects for update to authenticated using (bucket_id = 'media' and (select private.is_admin()));
create policy "admin deletes media" on storage.objects for delete to authenticated using (bucket_id = 'media' and (select private.is_admin()));
