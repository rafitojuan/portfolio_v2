<script>
  import { isSearchOpen } from '../stores/search.js';
  import { theme } from '../stores/theme.js';
  
  let isOpen = false;
</script>

<header class="sticky top-0 z-50 w-full overflow-x-hidden bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
  <div class="mx-auto flex h-14 items-center justify-between gap-2 px-4 sm:px-6 md:max-w-3xl border-x border-zinc-200/80 dark:border-zinc-900/50">
    <a href="#home" class="shrink-0 transition-opacity hover:opacity-80 flex items-center min-h-[44px]" aria-label="Home">
      <img src="/Logo-White.png" alt="Rafito Juan logo" class="h-9 w-auto dark:invert-0 invert transition-all duration-200" />
    </a>

    <div class="flex-1"></div>

    <nav class="hidden sm:flex items-center gap-6" aria-label="Primary navigation">
      <a href="#about" class="font-mono text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">About</a>
      <a href="#experience" class="font-mono text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">Experience</a>
      <a href="#projects" class="font-mono text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">Projects</a>
      <a href="#games" class="font-mono text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">Games</a>
    </nav>

    <div class="flex items-center gap-1 sm:gap-2 ml-4">
      <button 
        type="button"
        class="inline-flex items-center justify-center min-h-[44px] sm:min-h-0 sm:h-8 gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-3 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-700 cursor-pointer"
        on:click={() => $isSearchOpen = true}
        aria-label="Open search dialog"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" class="w-4 h-4" aria-hidden="true">
          <path d="M10.278 11.514a5.824 5.824 0 1 1 1.235-1.235l3.209 3.208A.875.875 0 0 1 14.111 15a.875.875 0 0 1-.624-.278l-3.209-3.208Zm.623-4.69a4.077 4.077 0 1 1-8.154 0 4.077 4.077 0 0 1 8.154 0Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
        <span class="hidden sm:inline font-sans text-xs font-medium">Search</span>
        <kbd class="hidden sm:inline-flex items-center h-5 px-1.5 rounded bg-white dark:bg-zinc-800 text-[10px] font-sans text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">Ctrl K</kbd>
      </button>

      <!-- Theme Switcher Button -->
      <button
        type="button"
        class="inline-flex items-center justify-center min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 sm:w-8 sm:h-8 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors cursor-pointer"
        on:click={() => theme.toggle()}
        aria-label={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {#if $theme === 'dark'}
          <!-- Sun icon when in dark mode (click to switch to light) -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        {:else}
          <!-- Moon icon when in light mode (click to switch to dark) -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        {/if}
      </button>

      <a href="https://github.com/rafitojuan" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 sm:w-8 sm:h-8 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors" aria-label="GitHub Profile">
        <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor" aria-hidden="true">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
        </svg>
      </a>

      <button 
        type="button"
        class="sm:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors cursor-pointer"
        on:click={() => isOpen = !isOpen}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        aria-label="Toggle navigation menu"
      >
        <div class="flex flex-col gap-1.5" aria-hidden="true">
          <span class="block w-5 h-0.5 bg-current transform transition-transform {isOpen ? 'rotate-45 translate-y-2' : ''}"></span>
          <span class="block w-5 h-0.5 bg-current transition-opacity {isOpen ? 'opacity-0' : ''}"></span>
          <span class="block w-5 h-0.5 bg-current transform transition-transform {isOpen ? '-rotate-45 -translate-y-2' : ''}"></span>
        </div>
      </button>
    </div>
  </div>

  {#if isOpen}
    <div id="mobile-nav" class="sm:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md">
      <nav class="flex flex-col p-4 space-y-4" aria-label="Mobile navigation">
        <a href="#about" class="font-mono text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors py-2" on:click={() => isOpen = false}>About</a>
        <a href="#experience" class="font-mono text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors py-2" on:click={() => isOpen = false}>Experience</a>
        <a href="#projects" class="font-mono text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors py-2" on:click={() => isOpen = false}>Projects</a>
        <a href="#games" class="font-mono text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors py-2" on:click={() => isOpen = false}>Games</a>
        <a href="#contact" class="font-mono text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors py-2" on:click={() => isOpen = false}>Contact</a>
      </nav>
    </div>
  {/if}
</header>
