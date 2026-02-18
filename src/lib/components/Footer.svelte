<script>
  let currentYear = new Date().getFullYear();
</script>

<footer class="relative pt-24 pb-8 overflow-hidden bg-zinc-950 border-t border-zinc-900/50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <!-- Navigation & Socials -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24 md:mb-32">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-white">Navigation</h3>
        <nav class="flex flex-col space-y-2">
          <a href="#about" class="text-zinc-500 hover:text-white transition-colors">About</a>
          <a href="#experience" class="text-zinc-500 hover:text-white transition-colors">Experience</a>
          <a href="#projects" class="text-zinc-500 hover:text-white transition-colors">Projects</a>
          <a href="#contact" class="text-zinc-500 hover:text-white transition-colors">Contact</a>
        </nav>
      </div>

      <div class="space-y-4 md:text-right">
        <h3 class="text-lg font-semibold text-white">Connect</h3>
        <div class="flex flex-col space-y-2 md:items-end">
          <a href="https://github.com/rafitojuan" target="_blank" rel="noopener noreferrer" class="text-zinc-500 hover:text-white transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/rafitojuan/" target="_blank" rel="noopener noreferrer" class="text-zinc-500 hover:text-white transition-colors">LinkedIn</a>
          <a href="https://www.instagram.com/rafitojuan/" target="_blank" rel="noopener noreferrer" class="text-zinc-500 hover:text-white transition-colors">Instagram</a>
          <a href="mailto:rafitojuan@gmail.com" class="text-zinc-500 hover:text-white transition-colors">Email</a>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="flex flex-col md:flex-row justify-between items-center text-sm text-zinc-600 border-t border-zinc-900 pt-8 mb-16 gap-4">
      <div class="flex flex-col md:flex-row gap-4 items-center">
        <p>&copy; {currentYear} Rafito Juan. All rights reserved.</p>
        <span class="hidden md:inline text-zinc-800">•</span>
        <p>Built by a human.</p>
      </div>
      <p>
        Inspired by <a href="https://github.com/abdulrehmanwaseem" target="_blank" rel="noopener noreferrer" class="text-zinc-500 hover:text-white transition-colors">Abdul Rehman</a>, check him out.
      </p>
    </div>
  </div>

  <!-- Massive Footer Text -->
  <div class="w-full flex justify-center items-end leading-none select-none pointer-events-none">
    <h1 class="text-[15vw] font-bold text-zinc-900 tracking-tighter whitespace-nowrap -mb-[3vw]">
      rafitojuan
    </h1>
  </div>
</footer>