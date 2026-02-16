<script>
  import { isSearchOpen } from '../stores/search.js';
  
  let isOpen = false;
  let isDark = true;

  function toggleTheme() {
    isDark = !isDark;
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
</script>

<header class="sticky top-0 z-50 w-full overflow-x-hidden bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 transition-shadow duration-300">
  <div class="mx-auto flex h-14 items-center justify-between gap-2 px-4 sm:px-6 md:max-w-3xl border-x border-zinc-900/50">
    <!-- Logo -->
    <a href="#home" class="shrink-0 transition-opacity hover:opacity-80" aria-label="Home">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 512 256" class="h-8 w-auto text-zinc-50">
        <path fill="currentColor" d="M48 0h96v64H48V0Z M0 64h64v64H0V64Z M128 64h64v64h-64V64Z M0 128h192v64H0v-64Z M0 192h64v64H0v-64Z M128 192h64v64h-64v-64Z M256 0h64v256h-64V0Z M320 0h128v64H320V0Z M448 64h64v64h-64V64Z M320 128h128v64H320v-64Z M448 192h64v64h-64v-64Z"></path>
      </svg>
    </a>

    <div class="flex-1"></div>

    <!-- Desktop Navigation -->
    <nav class="hidden sm:flex items-center gap-6">
      <a href="#about" class="font-mono text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">About</a>
      <a href="#experience" class="font-mono text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">Experience</a>
      <a href="#projects" class="font-mono text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">Projects</a>
    </nav>

    <!-- Actions -->
    <div class="flex items-center gap-2 ml-4">
      <!-- Search Button -->
      <button 
        class="inline-flex items-center justify-center h-8 gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-700"
        on:click={() => $isSearchOpen = true}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" class="w-4 h-4">
          <path d="M10.278 11.514a5.824 5.824 0 1 1 1.235-1.235l3.209 3.208A.875.875 0 0 1 14.111 15a.875.875 0 0 1-.624-.278l-3.209-3.208Zm.623-4.69a4.077 4.077 0 1 1-8.154 0 4.077 4.077 0 0 1 8.154 0Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
        <span class="hidden sm:inline font-sans text-xs font-medium">Search</span>
        <kbd class="hidden sm:inline-flex items-center h-5 px-1.5 rounded bg-zinc-800 text-[10px] font-sans text-zinc-500 border border-zinc-700">Ctrl K</kbd>
      </button>

      <!-- GitHub Link -->
      <a href="https://github.com/rafitojuan" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 transition-colors" aria-label="GitHub Profile">
        <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
        </svg>
      </a>

    
      <!-- Mobile Menu Trigger -->
      <button 
        class="sm:hidden inline-flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 transition-colors"
        on:click={() => isOpen = !isOpen}
      >
        <span class="sr-only">Toggle Menu</span>
        <div class="flex flex-col gap-1.5">
          <span class="block w-5 h-0.5 bg-current transform transition-transform {isOpen ? 'rotate-45 translate-y-2' : ''}"></span>
          <span class="block w-5 h-0.5 bg-current transition-opacity {isOpen ? 'opacity-0' : ''}"></span>
          <span class="block w-5 h-0.5 bg-current transform transition-transform {isOpen ? '-rotate-45 -translate-y-2' : ''}"></span>
        </div>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if isOpen}
    <div class="sm:hidden border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md">
      <nav class="flex flex-col p-4 space-y-4">
        <a href="#about" class="font-mono text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors" on:click={() => isOpen = false}>About</a>
        <a href="#experience" class="font-mono text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors" on:click={() => isOpen = false}>Experience</a>
        <a href="#projects" class="font-mono text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors" on:click={() => isOpen = false}>Projects</a>
        <a href="#contact" class="font-mono text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors" on:click={() => isOpen = false}>Contact</a>
      </nav>
    </div>
  {/if}
</header>
