import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
