<script>
  import { onMount } from 'svelte';
  import Lenis from 'lenis';
  import { lenis as lenisStore } from './lib/stores/lenis.js';
  import BootSequence from './lib/components/BootSequence.svelte';
  import Navbar from './lib/components/Navbar.svelte';
  import Hero from './lib/components/Hero.svelte';
  import About from './lib/components/About.svelte';
  import Experience from './lib/components/Experience.svelte';
  import Projects from './lib/components/Projects.svelte';
  import HonorsAwards from './lib/components/HonorsAwards.svelte';
  import Certifications from './lib/components/Certifications.svelte';
  import TechStack from './lib/components/TechStack.svelte';
  import Testimonials from './lib/components/Testimonials.svelte';
  import Contact from './lib/components/Contact.svelte';
  import Footer from './lib/components/Footer.svelte';
  import SearchDialog from './lib/components/SearchDialog.svelte';

  let isBooting = true;

  $: if ($lenisStore) {
    if (isBooting) {
      $lenisStore.stop();
      document.body.style.overflow = 'hidden';
    } else {
      $lenisStore.start();
      document.body.style.overflow = '';
    }
  }

  onMount(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenisStore.set(lenis);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisStore.set(null);
    };
  });
</script>

<main class="antialiased text-zinc-50 min-h-screen selection:bg-white selection:text-black">
  <BootSequence on:complete={() => isBooting = false} />
  
  <Navbar />
  <Hero />
  <About />
  <TechStack />
  <Experience />
  <Projects />
  <HonorsAwards />
  <Certifications />
  <Testimonials />
  <Contact />
  <Footer />
  <SearchDialog />
</main>
