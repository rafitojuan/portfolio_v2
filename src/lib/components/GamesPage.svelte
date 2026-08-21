<script lang="ts">
  import DinoRun from './games/DinoRun.svelte';
  import TerminalTyper from './games/TerminalTyper.svelte';
  import DndGame from './games/DndGame.svelte';

  let activeGame: string | null = null;

  function goHome() {
    window.location.hash = '';
  }
</script>

{#if activeGame === null}
<section id="games-page" class="min-h-[85vh] flex flex-col justify-center pt-10 sm:pt-16 pb-20 px-4 sm:px-6">
  <div class="w-full max-w-4xl mx-auto flex flex-col gap-8">
    
    <!-- Top Navigation & Return Link -->
    <div class="flex items-center justify-between pb-6 border-b border-zinc-200 dark:border-zinc-800/80">
      <button
        type="button"
        on:click={goHome}
        class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
      >
        <span>← Back to Portfolio</span>
      </button>

      <span class="text-xs font-mono text-zinc-400 dark:text-zinc-500">
        3 Interactive Modules
      </span>
    </div>

    <!-- Header Section -->
    <div class="flex flex-col gap-3 text-center sm:text-left">
      <div class="inline-flex items-center gap-2 self-center sm:self-start px-2.5 py-0.5 rounded-full text-xs font-mono bg-zinc-100 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
        <span>09 / Interactive Playground</span>
      </div>

      <h1 class="text-3xl sm:text-4xl font-bold font-display tracking-tight text-zinc-950 dark:text-white">
        Browser Games & Experiments
      </h1>
      
      <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl font-sans leading-relaxed">
        Real-time interactive applications exploring HTML5 Canvas physics, Web Audio API sound synthesis, and stateful game loops built with Svelte.
      </p>
    </div>

    <!-- Game Modules Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4">
      
      <!-- Kibo Run -->
      <button
        type="button"
        on:click={() => activeGame = 'dino'}
        class="group relative flex flex-col justify-between p-6 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60 shadow-xs dark:shadow-none transition-all text-left cursor-pointer"
      >
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="h-11 w-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8h1a2 2 0 0 1 0 4h-1"/><path d="M14 2h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2"/><path d="M16 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2"/><path d="M10 15v6"/><path d="M14 15v6"/>
              </svg>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
              Canvas 2D
            </span>
          </div>

          <div>
            <h2 class="text-lg font-bold font-display text-zinc-900 dark:text-white group-hover:text-zinc-950 dark:group-hover:text-zinc-100 transition-colors">
              Kibo Run
            </h2>
            <p class="text-xs font-mono text-zinc-400 dark:text-zinc-500 mt-0.5">Endless Physics Runner</p>
            <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
              Classic retro arcade runner. Jump over dynamic obstacles, collect speed powerups, and survive increasing game velocity.
            </p>
          </div>
        </div>

        <div class="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
          <span>Launch Runner</span>
          <span class="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </button>

      <!-- Terminal Warrior -->
      <button
        type="button"
        on:click={() => activeGame = 'typer'}
        class="group relative flex flex-col justify-between p-6 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60 shadow-xs dark:shadow-none transition-all text-left cursor-pointer"
      >
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="h-11 w-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" ry="2"/><path d="M6 8h.001"/><path d="M10 8h.001"/><path d="M14 8h.001"/><path d="M18 8h.001"/><path d="M8 12h.001"/><path d="M12 12h.001"/><path d="M16 12h.001"/><path d="M7 16h10"/>
              </svg>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
              WPM Typer
            </span>
          </div>

          <div>
            <h2 class="text-lg font-bold font-display text-zinc-900 dark:text-white group-hover:text-zinc-950 dark:group-hover:text-zinc-100 transition-colors">
              Terminal Warrior
            </h2>
            <p class="text-xs font-mono text-zinc-400 dark:text-zinc-500 mt-0.5">Typing Speed Benchmark</p>
            <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
              Type real-world Bash, Docker, and Git terminal commands before the timeout countdown expires. Calculates WPM and accuracy.
            </p>
          </div>
        </div>

        <div class="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
          <span>Start Challenge</span>
          <span class="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </button>

      <!-- Terminal RPG / DnD -->
      <button
        type="button"
        on:click={() => activeGame = 'dnd'}
        class="group relative flex flex-col justify-between p-6 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60 shadow-xs dark:shadow-none transition-all text-left cursor-pointer"
      >
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="h-11 w-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m12 22-8-4.5v-11l8-4.5 8 4.5v11Z"/><path d="M12 22V11"/><path d="m12 11 8-4.5"/><path d="m4 6.5 8 4.5"/><path d="m12 11 0-9"/>
              </svg>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
              AI Dungeon
            </span>
          </div>

          <div>
            <h2 class="text-lg font-bold font-display text-zinc-900 dark:text-white group-hover:text-zinc-950 dark:group-hover:text-zinc-100 transition-colors">
              Terminal RPG
            </h2>
            <p class="text-xs font-mono text-zinc-400 dark:text-zinc-500 mt-0.5">Text-Based D&D Adventure</p>
            <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
              Dungeons & Dragons inspired interactive fiction powered by dynamic AI responses, character stat rolling, and turn-based choices.
            </p>
          </div>
        </div>

        <div class="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
          <span>Enter Dungeon</span>
          <span class="group-hover:translate-x-1 transition-transform">→</span>
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
