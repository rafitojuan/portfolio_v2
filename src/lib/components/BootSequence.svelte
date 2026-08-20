<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();
  let lines = [];
  let visible = true;
  let progress = 0;
  let isSkipped = false;

  const bootLogs = [
    { text: "INITIATING ctOS OVERRIDE...", delay: 100, color: "text-zinc-400" },
    { text: "BYPASSING SECURITY PROTOCOLS... [OK]", delay: 80, color: "text-cyan-400" },
    { text: "INJECTING PAYLOAD 0x8A7B9...", delay: 80, color: "text-zinc-400" },
    { text: "WARNING: UNAUTHORIZED ACCESS DETECTED", delay: 150, color: "text-red-500" },
    { text: "REROUTING TRACE... [SUCCESS]", delay: 80, color: "text-cyan-400" },
    { text: "DECRYPTING USER PROFILE: rafitojuan...", delay: 120, color: "text-zinc-400" },
    { text: "LOADING ASSETS...", delay: 80, color: "text-zinc-400" },
    { text: "SYSTEM COMPROMISED. INITIALIZING INTERFACE...", delay: 150, color: "text-cyan-400" }
  ];

  function finish() {
    if (isSkipped) return;
    isSkipped = true;
    visible = false;
    dispatch('complete');
  }

  function handleKeydown(e) {
    if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      finish();
    }
  }

  onMount(async () => {
    window.addEventListener('keydown', handleKeydown);

    // Generate random hex lines for noise
    for (let i = 0; i < 15; i++) {
      const hexText = Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join(' ');
      lines = [...lines, { text: `[0x${Math.floor(Math.random()*9999).toString(16).padStart(4, '0')}] ${hexText} ...`, color: "text-zinc-700" }];
    }

    for (const log of bootLogs) {
      if (isSkipped) return;
      await new Promise(r => setTimeout(r, log.delay));
      if (isSkipped) return;
      lines = [...lines, log];
      
      const container = document.getElementById('boot-sequence');
      if (container) container.scrollTop = container.scrollHeight;
    }

    // Progress bar animation
    while (progress < 100 && !isSkipped) {
      await new Promise(r => setTimeout(r, 20));
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress > 100) progress = 100;
    }

    if (isSkipped) return;
    await new Promise(r => setTimeout(r, 150));
    if (isSkipped) return;
    finish();
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
</script>

{#if visible}
  <div 
    class="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4 font-mono text-sm sm:text-base select-none overflow-hidden"
    out:fade={{ duration: 300 }}
    role="region"
    aria-label="System Boot Sequence"
  >
    <button
      type="button"
      on:click={finish}
      class="fixed top-4 right-4 z-30 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 text-xs font-mono transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
      aria-label="Skip boot sequence animation"
    >
      Skip [Esc]
    </button>

    <!-- CRT overlay lines -->
    <div class="pointer-events-none fixed inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
    
    <div id="boot-sequence" class="w-full max-w-3xl h-[70vh] overflow-hidden flex flex-col justify-end gap-1 pb-8">
      {#each lines as line}
        <div class="flex items-start gap-3 opacity-90">
          <span class="text-zinc-600 shrink-0">[{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 2 })}]</span>
          <span class={line.color}>{line.text}</span>
        </div>
      {/each}
      <div class="flex items-center gap-2 mt-4 text-cyan-400">
        <span>ROOTKIT_EXEC:</span>
        <div class="flex-1 border border-cyan-900 h-4 relative bg-zinc-950">
          <div class="absolute inset-y-0 left-0 bg-cyan-500 transition-all duration-75" style="width: {progress}%"></div>
        </div>
        <span class="w-12 text-right">{progress}%</span>
      </div>
    </div>
  </div>
{/if}
