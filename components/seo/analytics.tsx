import Script from "next/script";

/**
 * Analytics are opt-in via environment variables — nothing loads unless configured.
 *  - NEXT_PUBLIC_GA_ID               → Google Analytics 4 (e.g. G-XXXXXXX)
 *  - NEXT_PUBLIC_PLAUSIBLE_DOMAIN    → Plausible (privacy-friendly), e.g. yourdomain.com
 * Google Search Console verification is set via NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION (see app/layout.tsx).
 */
export function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const safeGa = ga && /^G-[A-Z0-9]+$/.test(ga) ? ga : null;
  return (
    <>
      {safeGa && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${safeGa}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${safeGa}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {plausible && (
        <Script defer data-domain={plausible} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
      )}
    </>
  );
}
