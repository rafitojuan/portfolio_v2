<script lang="ts">
  import DinoRun from './games/DinoRun.svelte';

  let activeGame: string | null = null;
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
      <!-- Kibo Run -->
      <button on:click={() => activeGame = 'dino'} class="group relative flex flex-col p-6 gap-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-cyan-500/50 hover:bg-zinc-800/50 transition-all text-left">
        <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
        <div class="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700 group-hover:border-cyan-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-400 group-hover:text-cyan-400"><path d="M18 8h1a2 2 0 0 1 0 4h-1"/><path d="M14 2h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2"/><path d="M16 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2"/><path d="M10 15v6"/><path d="M14 15v6"/></svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-zinc-200 group-hover:text-zinc-50 font-mono">Kibo Run</h3>
          <p class="text-sm text-zinc-500 mt-2 font-mono group-hover:text-zinc-400">The classic endless runner. Jump over obstacles and survive.</p>
        </div>
        <div class="mt-auto pt-4 flex items-center gap-2 text-xs font-mono text-cyan-500/70 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>> EXECUTE</span>
          <span class="animate-pulse">_</span>
        </div>
      </button>

      <!-- Terminal Typer (Disabled) -->
      <button disabled class="group relative flex flex-col p-6 gap-4 bg-zinc-900/30 border border-zinc-800/50 rounded-xl transition-all text-left opacity-50 cursor-not-allowed">
        <div class="h-12 w-12 rounded-lg bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-600"><rect width="20" height="16" x="2" y="4" rx="2" ry="2"/><path d="M6 8h.001"/><path d="M10 8h.001"/><path d="M14 8h.001"/><path d="M18 8h.001"/><path d="M8 12h.001"/><path d="M12 12h.001"/><path d="M16 12h.001"/><path d="M7 16h10"/></svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-zinc-500 font-mono flex items-center gap-2">
            Terminal Typer
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-600"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </h3>
          <p class="text-sm text-zinc-600 mt-2 font-mono">Type the commands before the timeout. Calculates your Words Per Minute.</p>
        </div>
        <div class="mt-auto pt-4 flex items-center gap-2 text-xs font-mono text-zinc-600">
          <span>> COMING SOON</span>
        </div>
      </button>

      <!-- DnD (Disabled) -->
      <button disabled class="group relative flex flex-col p-6 gap-4 bg-zinc-900/30 border border-zinc-800/50 rounded-xl transition-all text-left opacity-50 cursor-not-allowed">
        <div class="h-12 w-12 rounded-lg bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-600"><path d="m12 22-8-4.5v-11l8-4.5 8 4.5v11Z"/><path d="M12 22V11"/><path d="m12 11 8-4.5"/><path d="m4 6.5 8 4.5"/><path d="m12 11 0-9"/></svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-zinc-500 font-mono flex items-center gap-2">
            Dnd
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-600"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </h3>
          <p class="text-sm text-zinc-600 mt-2 font-mono">A classic Dungeons and Dragons inspired text adventure.</p>
        </div>
        <div class="mt-auto pt-4 flex items-center gap-2 text-xs font-mono text-zinc-600">
          <span>> COMING SOON</span>
        </div>
      </button>
    </div>
  </div>
</section>
{:else if activeGame === 'dino'}
  <DinoRun on:back={() => activeGame = null} />
{/if}
