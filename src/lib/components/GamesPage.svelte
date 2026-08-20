<script lang="ts">
  import DinoRun from './games/DinoRun.svelte';
  import TerminalTyper from './games/TerminalTyper.svelte';
  import DndGame from './games/DndGame.svelte';

  let activeGame: string | null = null;
</script>

{#if activeGame === null}
<section id="games-page" class="relative min-h-[80vh] flex flex-col items-center justify-center pt-24 pb-16 px-4">
  <div class="w-full max-w-4xl mx-auto flex flex-col gap-8">
    <div class="flex flex-col gap-4 text-center">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-950 dark:text-zinc-50">
        Terminal <span class="text-cyan-600 dark:text-cyan-400">Games</span>
      </h2>
      <p class="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-mono text-sm sm:text-base">
        Select a module to initiate. These environments are currently in development.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
      <!-- Kibo Run -->
      <button type="button" on:click={() => activeGame = 'dino'} class="group relative flex flex-col p-6 gap-4 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-cyan-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 shadow-xs dark:shadow-none transition-all text-left cursor-pointer">
        <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
        <div class="h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 group-hover:border-cyan-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-500 dark:text-zinc-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400"><path d="M18 8h1a2 2 0 0 1 0 4h-1"/><path d="M14 2h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2"/><path d="M16 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2"/><path d="M10 15v6"/><path d="M14 15v6"/></svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-zinc-50 font-mono">Kibo Run</h3>
          <p class="text-sm text-zinc-500 mt-2 font-mono group-hover:text-zinc-700 dark:group-hover:text-zinc-400">The classic endless runner. Jump over obstacles and survive.</p>
        </div>
        <div class="mt-auto pt-4 flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-500/70 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>&gt; EXECUTE</span>
          <span class="animate-pulse">_</span>
        </div>
      </button>

      <!-- Terminal Warriror -->
      <button type="button" on:click={() => activeGame = 'typer'} class="group relative flex flex-col p-6 gap-4 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-cyan-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 shadow-xs dark:shadow-none transition-all text-left cursor-pointer">
        <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
        <div class="h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 group-hover:border-cyan-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-500 dark:text-zinc-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400"><rect width="20" height="16" x="2" y="4" rx="2" ry="2"/><path d="M6 8h.001"/><path d="M10 8h.001"/><path d="M14 8h.001"/><path d="M18 8h.001"/><path d="M8 12h.001"/><path d="M12 12h.001"/><path d="M16 12h.001"/><path d="M7 16h10"/></svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-zinc-50 font-mono">Terminal Warrior</h3>
          <p class="text-sm text-zinc-500 mt-2 font-mono group-hover:text-zinc-700 dark:group-hover:text-zinc-400">Type the commands before the timeout. Calculates your Words Per Minute.</p>
        </div>
        <div class="mt-auto pt-4 flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-500/70 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>&gt; EXECUTE</span>
          <span class="animate-pulse">_</span>
        </div>
      </button>

      <!-- DnD -->
      <button type="button" on:click={() => activeGame = 'dnd'} class="group relative flex flex-col p-6 gap-4 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-cyan-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 shadow-xs dark:shadow-none transition-all text-left cursor-pointer">
        <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
        <div class="h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 group-hover:border-cyan-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-500 dark:text-zinc-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400"><path d="m12 22-8-4.5v-11l8-4.5 8 4.5v11Z"/><path d="M12 22V11"/><path d="m12 11 8-4.5"/><path d="m4 6.5 8 4.5"/><path d="m12 11 0-9"/></svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-zinc-50 font-mono">Terminal RPG</h3>
          <p class="text-sm text-zinc-500 mt-2 font-mono group-hover:text-zinc-700 dark:group-hover:text-zinc-400">A classic Dungeons and Dragons inspired text adventure.</p>
        </div>
        <div class="mt-auto pt-4 flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-500/70 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>&gt; EXECUTE</span>
          <span class="animate-pulse">_</span>
        </div>
      </button>
    </div>
  </div>
</section>
{:else if activeGame === 'dino'}
  <DinoRun on:back={() => activeGame = null} />
{:else if activeGame === 'typer'}
  <TerminalTyper on:back={() => activeGame = null} />
{:else if activeGame === 'dnd'}
  <DndGame on:back={() => activeGame = null} />
{/if}
