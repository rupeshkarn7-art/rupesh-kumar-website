import { siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui";

export function ContactBand({
  title = "Have a technology initiative, a project, or a career question?",
  intro = "Tell me a little about it. I read every message and usually reply within two working days.",
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <section className="border-t border-line bg-paper">
      <div className="container-x py-20 sm:py-24">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface px-7 py-12 sm:px-14 sm:py-16">
          <div className="grid-lines pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(to_left,black,transparent_70%)]" aria-hidden />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <p className="eyebrow mb-4 flex items-center gap-2"><span className="inline-block h-px w-6 bg-accent" />Let&apos;s talk</p>
              <h2 className="display text-[2rem] leading-[1.1] text-ink sm:text-[2.6rem]">{title}</h2>
              <p className="mt-4 max-w-xl text-[17px] text-muted">{intro}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <ButtonLink href="/contact" size="lg" arrow>Get in touch</ButtonLink>
              <ButtonLink href={`mailto:${siteConfig.email}`} size="lg" variant="secondary">
                {siteConfig.email}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
