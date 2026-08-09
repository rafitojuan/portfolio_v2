<script>
  import DinoRun from './games/DinoRun.svelte';

  let activeGame = null;
</script>

{#if activeGame === null}
<section id="games-page" class="relative min-h-[80vh] flex flex-col items-center justify-center pt-24 pb-16 px-4">
  <div class="w-full max-w-4xl mx-auto flex flex-col gap-8">
    <div class="flex flex-col gap-4 text-center">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-50">
        Terminal <span class="text-cyan-400">Games</span>
      </h2>
      <p class="text-zinc-400 max-w-2xl mx-auto font-mono text-sm sm:text-base">
        Select a module to initiate. These environments are currently in development.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
      <!-- Dino Run -->
      <button on:click={() => activeGame = 'dino'} class="group relative flex flex-col p-6 gap-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-cyan-500/50 hover:bg-zinc-800/50 transition-all text-left">
        <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
        <div class="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700 group-hover:border-cyan-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-400 group-hover:text-cyan-400"><path d="M18 8h1a2 2 0 0 1 0 4h-1"/><path d="M14 2h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2"/><path d="M16 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2"/><path d="M10 15v6"/><path d="M14 15v6"/></svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-zinc-200 group-hover:text-zinc-50 font-mono">Dino Run</h3>
          <p class="text-sm text-zinc-500 mt-2 font-mono group-hover:text-zinc-400">The classic endless runner. Jump over obstacles and survive.</p>
        </div>
        <div class="mt-auto pt-4 flex items-center gap-2 text-xs font-mono text-cyan-500/70 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>> EXECUTE</span>
          <span class="animate-pulse">_</span>
        </div>
      </button>

      <!-- Whack-a Bug -->
      <button class="group relative flex flex-col p-6 gap-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-fuchsia-500/50 hover:bg-zinc-800/50 transition-all text-left">
        <div class="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
        <div class="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700 group-hover:border-fuchsia-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-400 group-hover:text-fuchsia-400"><rect width="8" height="14" x="8" y="6" rx="4"/><path d="m19 7-3 2"/><path d="m5 7 3 2"/><path d="m19 19-3-2"/><path d="m5 19 3-2"/><path d="M20 13h-4"/><path d="M4 13h4"/><path d="m10 4 1 2"/><path d="m14 4-1 2"/></svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-zinc-200 group-hover:text-zinc-50 font-mono">Whack-a Bug</h3>
          <p class="text-sm text-zinc-500 mt-2 font-mono group-hover:text-zinc-400">Squash the software bugs before they break production.</p>
        </div>
        <div class="mt-auto pt-4 flex items-center gap-2 text-xs font-mono text-fuchsia-500/70 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>> EXECUTE</span>
          <span class="animate-pulse">_</span>
        </div>
      </button>

      <!-- DnD -->
      <button class="group relative flex flex-col p-6 gap-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-emerald-500/50 hover:bg-zinc-800/50 transition-all text-left">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
        <div class="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700 group-hover:border-emerald-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-400 group-hover:text-emerald-400"><path d="m12 22-8-4.5v-11l8-4.5 8 4.5v11Z"/><path d="M12 22V11"/><path d="m12 11 8-4.5"/><path d="m4 6.5 8 4.5"/><path d="m12 11 0-9"/></svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-zinc-200 group-hover:text-zinc-50 font-mono">Dnd</h3>
          <p class="text-sm text-zinc-500 mt-2 font-mono group-hover:text-zinc-400">A classic Dungeons and Dragons inspired text adventure.</p>
        </div>
        <div class="mt-auto pt-4 flex items-center gap-2 text-xs font-mono text-emerald-500/70 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>> EXECUTE</span>
          <span class="animate-pulse">_</span>
        </div>
      </button>
    </div>
  </div>
</section>
{:else if activeGame === 'dino'}
  <DinoRun on:back={() => activeGame = null} />
{/if}
