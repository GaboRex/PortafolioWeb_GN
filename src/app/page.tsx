import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { NeuralNetwork } from "@/components/neutral-network";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <>
      <NeuralNetwork />
      <Header />
      <main id="top">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}