<script>
  import { isSearchOpen } from '../stores/search.js';
  import { fade, scale } from 'svelte/transition';
  import { tick } from 'svelte';
  
  let query = '';
  let inputElement;
  let selectedIndex = 0;
  let scrollContainer;
  let dialogElement;
  let scrollPosition = 0;

  const items = [
    { id: 'home', label: 'Home', href: '#home', type: 'Section', icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>` },
    { id: 'about', label: 'About', href: '#about', type: 'Section', icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>` },
    { id: 'techstack', label: 'Tech Stack', href: '#tech-stack', type: 'Section', icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>` },
    { id: 'experience', label: 'Experience', href: '#experience', type: 'Section', icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>` },
    { id: 'education', label: 'Education', href: '#education', type: 'Section', icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>` },
    { id: 'projects', label: 'Projects', href: '#projects', type: 'Section', icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>` },
    { id: 'honors', label: 'Honors & Awards', href: '#honors', type: 'Section', icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>` },
    { id: 'certifications', label: 'Certifications', href: '#certifications', type: 'Section', icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>` },
    { id: 'contact', label: 'Contact', href: '#contact', type: 'Section', icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>` },
    { id: 'github', label: 'GitHub', href: 'https://github.com/rafitojuan', type: 'Link', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>` },
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/rafitojuan', type: 'Link', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>` },
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
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  function open() {
    scrollPosition = window.scrollY;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
  }

  async function scrollToSelected() {
    await tick();
    if (!scrollContainer) return;
    
    const el = document.getElementById(`search-item-${selectedIndex}`);
    if (el) {
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
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

  $: if ($isSearchOpen && inputElement) {
    open();
    setTimeout(() => inputElement.focus(), 50);
  }

  function handleSelect(item) {
    close();
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
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
  <div 
    class="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm"
    transition:fade={{ duration: 150 }}
    on:click={close}
    role="presentation"
  ></div>

  <div 
    role="dialog" 
    id="search-dialog"
    aria-modal="true"
    class="fixed top-1/2 left-1/2 z-60 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl ring-1 ring-zinc-800 duration-200 sm:max-w-lg bg-zinc-950 p-0 max-sm:top-16 max-sm:translate-y-0"
    tabindex="-1" 
    bind:this={dialogElement}
    transition:scale={{ duration: 150, start: 0.95 }}
  >
    <div class="flex flex-col h-full max-h-[80vh]">
      
      <div class="flex items-center gap-2 h-12 px-4 border-b border-zinc-800 shrink-0">
        <svg class="size-4 shrink-0 opacity-50 text-zinc-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
          <path d="M10.278 11.514a5.824 5.824 0 1 1 1.235-1.235l3.209 3.208A.875.875 0 0 1 14.111 15a.875.875 0 0 1-.624-.278l-3.209-3.208Zm.623-4.69a4.077 4.077 0 1 1-8.154 0 4.077 4.077 0 0 1 8.154 0Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
        <input 
          bind:this={inputElement}
          bind:value={query}
          class="flex-1 h-10 bg-transparent py-3 font-mono text-sm outline-none placeholder:text-zinc-500 text-zinc-100 border-none" 
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

      <div 
        id="search-results"
        class="flex-1 overflow-y-auto overscroll-contain"
        role="listbox"
        bind:this={scrollContainer}
      >
        
        {#if filteredItems.length === 0}
            <div class="py-6 text-center text-sm text-zinc-500">No results found.</div>
        {/if}

        {#each Object.entries(groupedItems) as [group, groupItems]}
            {#if groupItems.length > 0}
                <div class="p-1">
                    <div class="px-3 py-2 text-xs font-medium text-zinc-500">{group}</div>
                    <div role="group">
                        {#each groupItems as item}
                            {@const index = filteredItems.indexOf(item)}
                            <button
                                id={'search-item-' + index}
                                class="w-full flex items-center gap-2 rounded-xl px-2 py-2 text-sm text-left transition-colors {index === selectedIndex ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}"
                                on:click={() => handleSelect(item)}
                                on:mouseenter={() => selectedIndex = index}
                            >
                                <span class="w-4 h-4 shrink-0 {index === selectedIndex ? 'text-zinc-300' : 'text-zinc-500'}">
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

      <div class="border-t border-zinc-800 bg-zinc-900/50 px-4 py-2 flex items-center justify-between shrink-0">
        <div class="text-zinc-500 font-bold text-xs tracking-wider">
          RJ
        </div>
        
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
