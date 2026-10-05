import { Benefits } from "@/components/benefits";
import { Contact } from "@/components/contact";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";

export default function Home() {
  return (
    <>
      <Header />
      <main id="tresc" tabIndex={-1}>
        <Hero />
        <HowItWorks />
        <Benefits />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
