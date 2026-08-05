<script>
  import { fade, scale } from 'svelte/transition';
  import { onDestroy } from 'svelte';
  import { lenis } from '../stores/lenis.js';

  let isModalOpen = false;
  let scrollPosition = 0;
  let activeTab = 'email';
  let copied = false;
  let copyTimeout;

  const defaultTemplates = {
    email: `Hi Rafito,\n\nI came across your portfolio and would love to discuss a potential project or collaboration with you.\n\nProject Details:\n- Timeline:\n- Budget:\n- Description:\n\nBest regards,\n[Your Name]`,
    linkedin: `Hello Rafito, I saw your portfolio and really admire your work! I would love to connect and discuss potential opportunities or collaboration.`,
    instagram: `Hey Rafito! 👋 Loved checking out your portfolio. I have a project/idea I'd love to chat with you about!`
  };

  let templates = { ...defaultTemplates };

  const options = [
    {
      id: 'email',
      name: 'Email',
      handle: 'rafitosch@gmail.com',
      actionText: 'Open Email Client',
      iconColor: 'text-blue-400',
      icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: '@rafitojuan',
      actionText: 'Copy & Open LinkedIn',
      iconColor: 'text-sky-400',
      icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@rafitojuan',
      actionText: 'Copy & Open Instagram',
      iconColor: 'text-pink-400',
      icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
    }
  ];

  $: activeOption = options.find(o => o.id === activeTab) || options[0];

  function openModal() {
    isModalOpen = true;
    scrollPosition = window.scrollY;
    if ($lenis) $lenis.stop();
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
  }

  function closeModal() {
    isModalOpen = false;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
    if ($lenis) $lenis.start();
  }

  onDestroy(() => {
    if (isModalOpen) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if ($lenis) $lenis.start();
    }
  });

  function handleKeydown(e) {
    if (e.key === 'Escape' && isModalOpen) {
      e.preventDefault();
      closeModal();
    }
  }

  function selectTab(id) {
    activeTab = id;
    copied = false;
    clearTimeout(copyTimeout);
  }

  function resetTemplate(id) {
    templates[id] = defaultTemplates[id];
    templates = { ...templates };
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(err => {
        fallbackCopyTextToClipboard(text);
      });
    } else {
      fallbackCopyTextToClipboard(text);
    }
    copied = true;
    clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => copied = false, 3000);
  }

  function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  }

  function handleCopyOnly() {
    copyToClipboard(templates[activeTab]);
  }

  function handlePrimaryAction() {
    const text = templates[activeTab];
    if (activeTab === 'email') {
      const subject = encodeURIComponent("Project Inquiry / Partnership");
      const body = encodeURIComponent(text);
      window.location.href = `mailto:rafitosch@gmail.com?subject=${subject}&body=${body}`;
    } else if (activeTab === 'linkedin') {
      copyToClipboard(text);
      window.open('https://www.linkedin.com/in/rafitojuan/', '_blank');
    } else if (activeTab === 'instagram') {
      copyToClipboard(text);
      window.open('https://www.instagram.com/rafitojuan/', '_blank');
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<section id="contact" class="py-16 md:py-24 border-t border-zinc-900/50 scroll-mt-14">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-x border-zinc-900/50 h-full">
    <h2 class="text-3xl font-bold text-zinc-50 mb-6">Let's work together</h2>
    <p class="text-zinc-400 mb-8 max-w-2xl mx-auto">
      I'm always open to discussing product design work or partnership opportunities.
    </p>
    <button
      type="button"
      on:click={openModal}
      class="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-zinc-950 bg-zinc-50 hover:bg-zinc-200 transition-colors cursor-pointer"
    >
      Say Hello
    </button>
  </div>
</section>

{#if isModalOpen}
  <!-- Backdrop -->
  <div
    class="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm"
    transition:fade={{ duration: 150 }}
    on:click={closeModal}
    role="presentation"
  ></div>

  <!-- Dialog -->
  <div
    role="dialog"
    aria-modal="true"
    data-lenis-prevent="true"
    on:wheel|stopPropagation
    class="fixed top-1/2 left-1/2 z-60 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl ring-1 ring-zinc-800 duration-200 sm:max-w-xl bg-zinc-950 overflow-y-auto max-h-[90vh] overscroll-contain"
    transition:scale={{ duration: 150, start: 0.95 }}
  >
    <!-- Modal Header -->
    <div class="flex items-center justify-between px-6 py-5 border-b border-zinc-800/80 bg-zinc-900/30">
      <div class="text-left">
        <h3 class="text-lg font-semibold text-zinc-100">Get in Touch</h3>
        <p class="text-xs text-zinc-400 mt-0.5">Select your preferred platform and customize the message template.</p>
      </div>
      <button
        type="button"
        on:click={closeModal}
        class="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors cursor-pointer"
        aria-label="Close dialog"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Modal Body -->
    <div class="p-6 space-y-6">
      <!-- Platform Choice -->
      <div>
        <label class="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3 text-left">
          1. Choose Platform
        </label>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {#each options as option}
            <button
              type="button"
              on:click={() => selectTab(option.id)}
              class="flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-3 sm:gap-0 p-3 sm:p-4 rounded-xl border transition-all text-left sm:text-center relative overflow-hidden cursor-pointer {activeTab === option.id ? 'bg-zinc-900/95 border-zinc-500 shadow-md ring-1 ring-zinc-500/50' : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60 text-zinc-400'}"
            >
              <div class="sm:mb-2 transition-colors shrink-0 {activeTab === option.id ? option.iconColor : 'text-zinc-400'}">
                {@html option.icon}
              </div>
              <div class="flex-1 sm:flex-none min-w-0">
                <span class="block text-sm font-medium {activeTab === option.id ? 'text-zinc-100' : 'text-zinc-300'}">{option.name}</span>
                <span class="block text-[11px] text-zinc-500 truncate mt-0.5">{option.handle}</span>
              </div>
              {#if activeTab === option.id}
                <div class="absolute top-2.5 right-2.5 flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-zinc-300"></span>
                </div>
              {/if}
            </button>
          {/each}
        </div>
      </div>

      <!-- Message Template -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="block text-xs font-medium uppercase tracking-wider text-zinc-400 text-left">
            2. Message Template ({activeOption.name})
          </label>
          <button
            type="button"
            on:click={() => resetTemplate(activeTab)}
            class="text-xs text-zinc-400 hover:text-zinc-200 underline underline-offset-2 cursor-pointer transition-colors"
          >
            Reset Template
          </button>
        </div>
        <textarea
          bind:value={templates[activeTab]}
          rows="5"
          data-lenis-prevent="true"
          on:wheel|stopPropagation
          class="w-full rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/50 transition-all font-sans resize-y leading-relaxed overscroll-contain max-h-60 min-h-[8rem]"
          placeholder="Type your message here..."
        ></textarea>
      </div>

      <!-- Footer Buttons -->
      <div class="flex flex-col sm:flex-row gap-3 pt-2 border-t border-zinc-800/80">
        <button
          type="button"
          on:click={handleCopyOnly}
          class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/60 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-colors cursor-pointer order-2 sm:order-1"
        >
          {#if copied}
            <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-emerald-400 font-semibold">Copied to Clipboard!</span>
          {:else}
            <svg class="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Copy Template Only</span>
          {/if}
        </button>

        <button
          type="button"
          on:click={handlePrimaryAction}
          class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-sm font-semibold shadow-lg hover:shadow-zinc-100/10 transition-all cursor-pointer order-1 sm:order-2"
        >
          <div class="shrink-0">
            {@html activeOption.icon}
          </div>
          <span>{activeOption.actionText}</span>
        </button>
      </div>
    </div>
  </div>
{/if}

