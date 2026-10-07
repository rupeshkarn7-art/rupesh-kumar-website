import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import NotFoundContent from "./(site)/not-found";

export default function GlobalNotFound() {
  return (
    <>
      <Header />
      <main id="main"><NotFoundContent /></main>
      <Footer />
    </>
  );
}
