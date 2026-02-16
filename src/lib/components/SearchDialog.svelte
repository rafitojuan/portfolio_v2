<script>
  import { isSearchOpen } from '../stores/search.js';
  import { fade, scale } from 'svelte/transition';
  import { tick } from 'svelte';
  
  let query = '';
  let inputElement;
  let selectedIndex = 0;

  const items = [
    { id: 'home', label: 'Home', href: '#home', type: 'Section', icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>` },
    { id: 'about', label: 'About', href: '#about', type: 'Section', icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>` },
    { id: 'experience', label: 'Experience', href: '#experience', type: 'Section', icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>` },
    { id: 'projects', label: 'Projects', href: '#projects', type: 'Section', icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>` },
    { id: 'techstack', label: 'Tech Stack', href: '#tech-stack', type: 'Section', icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>` },
    { id: 'contact', label: 'Contact', href: '#contact', type: 'Section', icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>` },
    { id: 'github', label: 'GitHub', href: 'https://github.com/rafitojuan', type: 'Link', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>` },
  ];

  $: filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase())
  );
  
  $: if (query !== null) selectedIndex = 0;

  $: groupedItems = {
    'Sections': filteredItems.filter(i => i.type === 'Section'),
    'Links': filteredItems.filter(i => i.type === 'Link')
  };

  $: selectedAction = filteredItems[selectedIndex]?.type === 'Link' ? 'Open Link' : 'Go to Page';

  function close() {
    $isSearchOpen = false;
    query = '';
    selectedIndex = 0;
  }

  async function scrollToSelected() {
    await tick();
    const el = document.getElementById(`search-item-${selectedIndex}`);
    if (el) {
      el.scrollIntoView({ block: 'nearest' });
    }
  }

  function handleKeydown(e) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      $isSearchOpen = !$isSearchOpen;
    }
    if (e.key === 'Escape' && $isSearchOpen) {
      e.preventDefault();
      close();
    }

    if (!$isSearchOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % filteredItems.length;
      scrollToSelected();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
      scrollToSelected();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  }

  // Focus input when opened
  $: if ($isSearchOpen && inputElement) {
    setTimeout(() => inputElement.focus(), 50);
  }

  function handleSelect(item) {
    close();
    if (item.href.startsWith('http')) {
        window.open(item.href, '_blank');
    } else {
        const el = document.querySelector(item.href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $isSearchOpen}
  <!-- Overlay -->
  <div 
    class="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm"
    transition:fade={{ duration: 150 }}
    on:click={close}
    role="presentation"
  ></div>

  <!-- Dialog -->
  <div 
    role="dialog" 
    id="search-dialog"
    aria-modal="true"
    class="fixed top-1/2 left-1/2 z-60 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl shadow-2xl ring-1 ring-zinc-800 duration-200 sm:max-w-lg overflow-hidden bg-zinc-950 p-0 max-sm:top-16 max-sm:translate-y-0"
    tabindex="-1" 
    style="pointer-events: auto;"
    transition:scale={{ duration: 150, start: 0.95 }}
  >
    <div tabindex="-1" data-slot="command" class="flex h-full w-full flex-col overflow-hidden text-zinc-50" data-cmdk-root="">
      
      <!-- Input -->
      <div data-slot="command-input-wrapper" class="flex h-12 items-center gap-2 border-b border-zinc-800 px-4">
        <svg class="size-4 shrink-0 opacity-50 text-zinc-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M10.278 11.514a5.824 5.824 0 1 1 1.235-1.235l3.209 3.208A.875.875 0 0 1 14.111 15a.875.875 0 0 1-.624-.278l-3.209-3.208Zm.623-4.69a4.077 4.077 0 1 1-8.154 0 4.077 4.077 0 0 1 8.154 0Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
        <input 
          bind:this={inputElement}
          bind:value={query}
          class="flex h-10 w-full rounded-lg bg-transparent py-3 font-mono text-sm outline-hidden placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 text-zinc-100 border-none focus:ring-0" 
          placeholder="Type a command or search..." 
          autocomplete="off" 
          autocorrect="off" 
          spellcheck="false" 
          aria-autocomplete="list" 
          role="combobox" 
          aria-expanded="true"
          aria-controls="search-results"
        >
        {#if query}
          <button 
            on:click={() => { query = ''; inputElement.focus(); }}
            class="p-1 rounded-sm hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        {/if}
      </div>

      <!-- List -->
      <div id="search-results" data-slot="command-list" class="max-h-80 scroll-py-0 overflow-x-hidden overflow-y-auto min-h-[300px]" role="listbox">
        
        {#if filteredItems.length === 0}
            <div class="py-6 text-center text-sm text-zinc-500">No results found.</div>
        {/if}

        {#each Object.entries(groupedItems) as [group, groupItems]}
            {#if groupItems.length > 0}
                <div data-slot="command-group" class="overflow-hidden p-1 text-zinc-50" role="presentation">
                    <div class="px-3 py-2 text-xs font-medium text-zinc-500">{group}</div>
                    <div role="group">
                        {#each groupItems as item}
                            {@const index = filteredItems.indexOf(item)}
                            <button
                                id={'search-item-' + index}
                                class="w-full relative flex cursor-default items-center gap-2 rounded-xl px-2 py-1.5 text-sm outline-hidden select-none transition-colors text-left {index === selectedIndex ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}"
                                on:click={() => handleSelect(item)}
                                on:mouseenter={() => selectedIndex = index}
                            >
                                <span class="[&>svg]:size-4 [&>svg]:shrink-0 {index === selectedIndex ? 'text-zinc-300' : 'text-zinc-500'}">
                                    {@html item.icon}
                                </span>
                                {item.label}
                            </button>
                        {/each}
                    </div>
                </div>
            {/if}
        {/each}

      </div>

      <!-- Footer -->
      <div class="border-t border-zinc-800 bg-zinc-900/50 p-2 px-4 flex items-center justify-between">
        <!-- Logo -->
        <div class="text-zinc-500 font-bold text-xs tracking-wider">
          RJ
        </div>
        
        <!-- Shortcuts -->
        <div class="flex items-center gap-4 text-[10px] font-medium text-zinc-500">
          <button 
            class="flex items-center gap-1 hover:text-zinc-300 transition-colors cursor-pointer"
            on:click={() => filteredItems[selectedIndex] && handleSelect(filteredItems[selectedIndex])}
          >
            <span>{selectedAction}</span>
            <kbd class="inline-flex items-center justify-center h-4 w-4 rounded bg-zinc-800 border border-zinc-700 text-zinc-400 font-sans">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 9l-5.364 5.364a1 1 0 000 1.414l5.364 5.364M19.636 4.636l5.364 5.364a1 1 0 010 1.414l-5.364 5.364" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 15h12a4 4 0 004-4v-6" />
              </svg>
            </kbd>
          </button>
          <div class="flex items-center gap-1">
            <span>Exit</span>
            <kbd class="inline-flex items-center justify-center h-4 px-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-400 font-sans">
              Esc
            </kbd>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
