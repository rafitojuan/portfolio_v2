<script lang="ts">
  import SocialGrid from "./SocialGrid.svelte";
  import { onMount, onDestroy } from "svelte";

  let time = "";
  let interval: ReturnType<typeof setInterval> | undefined;
  let isSlowed = false;
  let isPlaying = false;

  function playPronunciation() {
    if (isPlaying) return;

    const audioPath = isSlowed
      ? "/rafitojuan%20(slowed).aac"
      : "/rafitojuan.aac";
    const audio = new Audio(audioPath);

    isPlaying = true;
    audio.play().catch((e) => {
      console.error("Audio play failed", e);
      isPlaying = false;
    });

    audio.onended = () => {
      isPlaying = false;
      isSlowed = !isSlowed;
    };
  }

  function updateTime() {
    time = new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  onMount(() => {
    updateTime();
    interval = setInterval(updateTime, 1000);
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<section id="home" class="pt-6 sm:pt-10 pb-8 border-b border-zinc-200 dark:border-zinc-900/50 scroll-mt-14">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-200 dark:border-zinc-900/50 h-full">
    
    <!-- Top Editorial Header Grid -->
    <div class="space-y-6">
      
      <!-- Live Status & Node Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3 text-xs font-mono pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
        <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="font-medium text-[11px]">Available for select projects</span>
        </div>

        <div class="flex items-center gap-4 text-zinc-500 dark:text-zinc-400 text-xs">
          <span>Jakarta, ID <strong class="text-zinc-700 dark:text-zinc-200 font-normal">GMT+7</strong></span>
          <span>·</span>
          <span class="font-mono text-zinc-900 dark:text-zinc-100">{time || "00:00"}</span>
        </div>
      </div>

      <!-- Main Identity Masthead (Split Editorial Layout) -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
        
        <!-- Portrait Frame -->
        <div class="relative shrink-0">
          <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-sm">
            <img
              src="/pfp.png"
              alt="Rafito Juan"
              class="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
              loading="eager"
            />
          </div>
          <!-- Tactile craft corner badge -->
          <div class="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-zinc-900 dark:bg-zinc-100 text-[9px] font-mono text-white dark:text-zinc-950 font-bold shadow-xs">
            SE
          </div>
        </div>

        <!-- Name & Core Role -->
        <div class="flex-1 space-y-1.5">
          <div class="flex flex-wrap items-center gap-2.5">
            <h1 class="text-2xl sm:text-3xl font-bold font-display tracking-tight text-zinc-950 dark:text-white">
              Rafito Juan
            </h1>
            
            <svg class="w-5 h-5 text-blue-500 shrink-0 fill-current" viewBox="0 0 24 24" aria-label="Verified Engineer">
              <title>Verified Engineer</title>
              <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
            </svg>

            <!-- Tactile Pronunciation Pill -->
            <button
              type="button"
              on:click={playPronunciation}
              class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border transition-all cursor-pointer {isPlaying
                ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 animate-pulse'
                : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-200'}"
              aria-label="Listen to pronunciation"
              title="Click to hear pronunciation"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <span>{isPlaying ? (isSlowed ? 'playing 0.8x...' : 'playing 1x...') : 'rah-fee-toe'}</span>
            </button>
          </div>

          <p class="text-base sm:text-lg font-medium text-zinc-700 dark:text-zinc-300">
            Software Engineer & Fullstack Developer
          </p>
          <p class="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            PT Energi Pelabuhan Indonesia (SOE) · Open Source Contributor · he/him
          </p>
        </div>
      </div>

      <!-- Architectural Bio / Mission Statement -->
      <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
        Architecting resilient web platforms, distributed backends, and cloud-native systems. Managing data infrastructure at a state-owned enterprise while crafting high-performance applications for international clients.
      </p>

      <!-- Key Credential Chips -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-xs font-mono">
        <div class="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 flex items-center gap-2.5">
          <div>
            <div class="font-bold text-zinc-900 dark:text-zinc-100">17+ Projects</div>
            <div class="text-[11px] text-zinc-500 dark:text-zinc-400">Shipped to Production</div>
          </div>
        </div>

        <div class="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 flex items-center gap-2.5">
          <div>
            <div class="font-bold text-zinc-900 dark:text-zinc-100">TOEIC 895</div>
            <div class="text-[11px] text-zinc-500 dark:text-zinc-400">Professional English</div>
          </div>
        </div>

        <div class="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 flex items-center gap-2.5">
          <div>
            <div class="font-bold text-zinc-900 dark:text-zinc-100">SATUASA Award</div>
            <div class="text-[11px] text-zinc-500 dark:text-zinc-400">Best Innovation Winner</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Action / Social Grid Integration -->
    <div class="mt-4">
      <SocialGrid />
    </div>
  </div>
</section>
