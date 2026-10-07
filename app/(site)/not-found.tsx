import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-[3rem] leading-tight text-ink">This page took a different route.</h1>
      <p className="mt-4 max-w-lg text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/" arrow>Back to home</ButtonLink>
        <ButtonLink href="/hub" variant="secondary">Browse the Tech Hub</ButtonLink>
      </div>
    </div>
  );
}
