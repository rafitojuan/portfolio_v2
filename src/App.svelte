<script>
  import Navbar from './lib/components/Navbar.svelte';
  import Hero from './lib/components/Hero.svelte';
  import About from './lib/components/About.svelte';
  import Experience from './lib/components/Experience.svelte';
  import Projects from './lib/components/Projects.svelte';
  import TechStack from './lib/components/TechStack.svelte';
  import Testimonials from './lib/components/Testimonials.svelte';
  import Contact from './lib/components/Contact.svelte';
  import Footer from './lib/components/Footer.svelte';
  import SearchDialog from './lib/components/SearchDialog.svelte';
</script>

<main class="antialiased text-zinc-50 min-h-screen selection:bg-zinc-800 selection:text-white">
  <Navbar />
  <Hero />
  <About />
  <Experience />
  <Projects />
  <TechStack />
  <Testimonials />
  <Contact />
  <Footer />
  <SearchDialog />
</main>
