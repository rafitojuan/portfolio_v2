<script>
  let currentYear = new Date().getFullYear();
</script>

<footer class="relative pt-16 pb-8 overflow-hidden bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900/50 transition-colors duration-200">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-200 dark:border-zinc-900/50 relative z-10">
    
    <div class="flex flex-col sm:flex-row justify-between items-start gap-8 mb-16 pb-12 border-b border-zinc-200 dark:border-zinc-800/80">
      
      <!-- Identity & Statement -->
      <div class="space-y-3 max-w-xs">
        <h3 class="text-base font-bold font-display text-zinc-900 dark:text-white">
          Rafito Juan
        </h3>
        <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
          Software & Systems Engineer focused on resilient backend architecture, distributed systems, and craft-driven web interfaces.
        </p>
      </div>

      <!-- Quick Links -->
      <div class="flex gap-12 text-xs font-mono">
        <div class="space-y-2.5">
          <h4 class="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">
            Navigation
          </h4>
          <nav class="flex flex-col space-y-1.5 text-zinc-600 dark:text-zinc-400">
            <a href="#about" class="hover:text-zinc-950 dark:hover:text-white transition-colors">03 / About</a>
            <a href="#tech-stack" class="hover:text-zinc-950 dark:hover:text-white transition-colors">01 / Stack</a>
            <a href="#projects" class="hover:text-zinc-950 dark:hover:text-white transition-colors">02 / Projects</a>
            <a href="#experience" class="hover:text-zinc-950 dark:hover:text-white transition-colors">04 / Experience</a>
            <a href="#games" class="hover:text-zinc-950 dark:hover:text-white transition-colors">Games</a>
          </nav>
        </div>

        <div class="space-y-2.5">
          <h4 class="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">
            Connect
          </h4>
          <div class="flex flex-col space-y-1.5 text-zinc-600 dark:text-zinc-400">
            <a href="https://github.com/rafitojuan" target="_blank" rel="noopener noreferrer" class="hover:text-zinc-950 dark:hover:text-white transition-colors">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/rafitojuan/" target="_blank" rel="noopener noreferrer" class="hover:text-zinc-950 dark:hover:text-white transition-colors">LinkedIn ↗</a>
            <a href="https://www.instagram.com/rafitojuan/" target="_blank" rel="noopener noreferrer" class="hover:text-zinc-950 dark:hover:text-white transition-colors">Instagram ↗</a>
            <a href="mailto:rafitosch@gmail.com" class="hover:text-zinc-950 dark:hover:text-white transition-colors">Email ↗</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright & Colophon -->
    <div class="flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-zinc-500 dark:text-zinc-400 pb-8 gap-3">
      <div class="flex items-center gap-3">
        <p>&copy; {currentYear} Rafito Juan</p>
        <span>·</span>
        <p>Built with Svelte</p>
      </div>
      <p class="text-zinc-400 dark:text-zinc-600">
        Jakarta, Indonesia (GMT+7)
      </p>
    </div>
  </div>

  <!-- Safe Viewport Clipped Signature Watermark -->
  <div class="w-full overflow-hidden flex justify-center items-end leading-none select-none pointer-events-none opacity-40 dark:opacity-30">
    <p class="text-[13vw] font-bold font-display text-zinc-300 dark:text-zinc-800 tracking-tighter whitespace-nowrap -mb-[2.5vw] transition-colors" aria-hidden="true">
      rafitojuan
    </p>
  </div>
</footer>
