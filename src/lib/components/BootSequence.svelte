<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  interface BootLog {
    text: string;
    delay?: number;
    color: string;
  }

  const dispatch = createEventDispatcher();
  let lines: BootLog[] = [];
  let visible = true;
  let progress = 0;
  let isSkipped = false;

  const bootLogs: BootLog[] = [
    { text: "[SYS_INIT] Bootstrapping Svelte 5 runtime kernel...", delay: 60, color: "text-zinc-400" },
    { text: "[NET_GATE] Resolving primary node: Jakarta, ID (GMT+7)... [OK]", delay: 70, color: "text-emerald-400" },
    { text: "[CACHE_HYDRATE] Loading portfolio modules & asset manifests...", delay: 60, color: "text-zinc-400" },
    { text: "[AUDIO_SYNTH] Initializing Web Audio procedural oscillators... [READY]", delay: 80, color: "text-emerald-400" },
    { text: "[PHYSICS_ENGINE] Calibrating Lenis smooth-scroll & Canvas 2D pipelines...", delay: 70, color: "text-zinc-400" },
    { text: "[PROFILE] Mounting workspace: rafitojuan (Software & Systems Engineer)...", delay: 90, color: "text-zinc-200" },
    { text: "[READY] All systems operational. Launching user interface...", delay: 100, color: "text-emerald-400" }
  ];

  function finish() {
    if (isSkipped) return;
    isSkipped = true;
    visible = false;
    try {
      sessionStorage.setItem('hasBooted', 'true');
    } catch (e) {}
    dispatch('complete');
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      finish();
    }
  }

  onMount(async () => {
    window.addEventListener('keydown', handleKeydown);

    // If already booted in this session, complete instantly without blocking
    try {
      if (sessionStorage.getItem('hasBooted') === 'true') {
        finish();
        return;
      }
    } catch (e) {}

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
      await new Promise(r => setTimeout(r, 16));
      progress += Math.floor(Math.random() * 12) + 8;
      if (progress > 100) progress = 100;
    }

    if (isSkipped) return;
    await new Promise(r => setTimeout(r, 120));
    if (isSkipped) return;
    finish();
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
</script>

{#if visible}
  <div 
    class="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center p-4 font-mono text-xs sm:text-sm select-none overflow-hidden"
    out:fade={{ duration: 250 }}
    role="region"
    aria-label="System Initialization Sequence"
  >
    <!-- Skip Pill -->
    <button
      type="button"
      on:click={finish}
      class="fixed top-4 right-4 z-30 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 text-xs font-mono transition-colors focus:outline-none cursor-pointer shadow-sm"
      aria-label="Skip initialization animation"
    >
      Skip [Esc] ↗
    </button>

    <!-- Terminal Box Container -->
    <div class="w-full max-w-2xl bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4">
      
      <!-- Terminal Header -->
      <div class="flex items-center justify-between pb-3 border-b border-zinc-800/80 text-[11px] text-zinc-500">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="font-bold text-zinc-400">KERNEL_BOOT · RAFITO JUAN</span>
        </div>
        <span>v2.1.0</span>
      </div>

      <!-- Logs Stream -->
      <div id="boot-sequence" class="h-44 sm:h-52 overflow-hidden flex flex-col justify-end gap-1.5">
        {#each lines as line}
          <div class="flex items-start gap-2.5">
            <span class="text-zinc-600 shrink-0 text-[11px]">
              [{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]
            </span>
            <span class="{line.color} leading-relaxed">{line.text}</span>
          </div>
        {/each}
      </div>

      <!-- Progress Bar -->
      <div class="flex items-center gap-3 pt-3 border-t border-zinc-800/80 text-xs text-zinc-400">
        <span class="text-zinc-500 text-[11px]">SYSTEM_INITIALIZING:</span>
        <div class="flex-1 border border-zinc-800 h-2 rounded-full relative bg-zinc-950 overflow-hidden">
          <div 
            class="absolute inset-y-0 left-0 bg-emerald-500 rounded-full transition-all duration-75" 
            style="width: {progress}%"
          ></div>
        </div>
        <span class="w-10 text-right font-bold text-zinc-300">{progress}%</span>
      </div>
    </div>
  </div>
{/if}
