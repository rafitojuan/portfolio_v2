<script lang="ts">
  import { createEventDispatcher, onMount, tick, onDestroy } from "svelte";

  const dispatch = createEventDispatcher();

  const API_KEY = "IRyiJwkH0FHzr9JAkq1kYdZf9CTgM3k1";
  const API_URL = "https://api.mistral.ai/v1/chat/completions";

  type GameState = "CHARACTER_CREATION" | "ADVENTURE" | "ERROR";
  let gameState: GameState = "CHARACTER_CREATION";
  let errorMessage = "";
  let isWaitingForAI = false;
  let isAnimating = false;

  let charName = "";
  let charRace = "Human";
  let charClass = "Fighter";

  let stats = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
  let originalStats: any = null;

  const races = [
    "Human",
    "Elf",
    "Dwarf",
    "Halfling",
    "Dragonborn",
    "Tiefling",
    "Orc",
  ];
  const classes = [
    "Fighter",
    "Wizard",
    "Rogue",
    "Cleric",
    "Ranger",
    "Paladin",
    "Bard",
    "Warlock",
  ];

  function rollStats() {
    const roll = () =>
      Math.floor(Math.random() * 6) +
      Math.floor(Math.random() * 6) +
      Math.floor(Math.random() * 6) +
      3;
    stats = {
      str: roll(),
      dex: roll(),
      con: roll(),
      int: roll(),
      wis: roll(),
      cha: roll(),
    };
  }

  onMount(() => {
    const saved = localStorage.getItem("dndGameSave");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        charName = data.charName;
        charRace = data.charRace;
        charClass = data.charClass;
        stats = data.stats;
        originalStats = data.originalStats;
        chatHistory = data.chatHistory || [];
        narrativeLog = data.narrativeLog || [];
        currentChoices = data.currentChoices || [];
        gameState = "ADVENTURE";
        setTimeout(scrollToBottom, 100);
      } catch (e) {
        rollStats();
      }
    } else {
      rollStats();
    }
  });

  onDestroy(() => {
    if (audioCtx && audioCtx.state !== "closed") {
      audioCtx.close();
    }
  });

  $: {
    if (typeof window !== "undefined" && gameState === "ADVENTURE") {
      const saveData = {
        charName,
        charRace,
        charClass,
        stats,
        originalStats,
        chatHistory,
        narrativeLog,
        currentChoices,
      };
      localStorage.setItem("dndGameSave", JSON.stringify(saveData));
    }
  }

  let chatHistory: any[] = [];
  let narrativeLog: string[] = [];
  let currentChoices: string[] = [];
  let freeInput = "";
  let logContainer: HTMLDivElement;

  let cheatBuffer: string[] = [];
  let isDungeonMaster = false;
  let showMobileSheet = false;

  async function scrollToBottom() {
    await tick();
    if (logContainer) {
      logContainer.scrollTop = logContainer.scrollHeight;
    }
  }

  async function callMistral(userMessage: string, systemPrompt?: string) {
    isWaitingForAI = true;
    scrollToBottom();
    try {
      const messages = [];
      if (systemPrompt) {
        messages.push({ role: "system", content: systemPrompt });
        chatHistory.push({ role: "system", content: systemPrompt });
      } else {
        // Send the last 10 messages for context efficiency
        const recentHistory = chatHistory.slice(-10);
        messages.push(...recentHistory);
      }

      messages.push({ role: "user", content: userMessage });

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "mistral-small-latest",
          messages: messages,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const dmResponse = data.choices[0].message.content;

      chatHistory.push({ role: "user", content: userMessage });
      chatHistory.push({ role: "assistant", content: dmResponse });

      isWaitingForAI = false;
      await parseDMResponse(dmResponse);
    } catch (err: any) {
      errorMessage = err.message;
      gameState = "ERROR";
      isWaitingForAI = false;
    }
  }

  async function parseDMResponse(text: string) {
    const choiceRegex = /\[CHOICE\s*\d+\]\s*(.*)/gi;
    const choices = [];
    let match;

    while ((match = choiceRegex.exec(text)) !== null) {
      choices.push(match[1].trim());
    }

    const strippedText = text.replace(/\[CHOICE\s*\d+\].*/gi, "").trim();

    let formattedText = strippedText.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="text-zinc-100 font-semibold">$1</strong>',
    );
    formattedText = formattedText.replace(
      /\*(.*?)\*/g,
      '<em class="text-emerald-400 font-normal">$1</em>',
    );
    formattedText = formattedText.replace(/\n/g, "<br/>");

    isAnimating = true;
    currentChoices = []; // Hide choices during animation

    let current = "";
    // Tokenize keeping HTML tags intact
    const tokens = formattedText.split(/(<[^>]+>)/g);
    narrativeLog = [...narrativeLog, ""];
    const lastIndex = narrativeLog.length - 1;

    for (const token of tokens) {
      if (token.startsWith("<")) {
        current += token;
        narrativeLog[lastIndex] = current;
      } else {
        const words = token.split(/(\s+)/);
        for (let i = 0; i < words.length; i++) {
          current += words[i];
          narrativeLog[lastIndex] = current;
          await new Promise((r) => setTimeout(r, 20));
          scrollToBottom();
        }
      }
    }

    isAnimating = false;
    currentChoices = choices.slice(0, 4);
    scrollToBottom();
  }

  function startGame() {
    if (!charName.trim()) charName = "Nameless Adventurer";
    originalStats = { ...stats };

    const systemPrompt = `You are an expert, descriptive Dungeon Master running a D&D 5e text adventure. 
The player is: ${charName}, a ${charRace} ${charClass}. 
Stats: STR ${stats.str}, DEX ${stats.dex}, CON ${stats.con}, INT ${stats.int}, WIS ${stats.wis}, CHA ${stats.cha}.

RULES:
1. Narrate the scene and outcome of actions vividly. Do NOT talk for the player or assume their actions.
2. If a stat check is needed, you roll it behind the scenes and describe the outcome. Be fair but brutal if needed.
3. AT THE VERY END of every response, you MUST provide exactly 4 distinct action choices for the player.
4. Format the choices EXACTLY like this on new lines:
[CHOICE 1] Attack the goblin
[CHOICE 2] Try to sneak past
[CHOICE 3] Cast a spell
[CHOICE 4] Look for an alternative route

Do NOT deviate from this format for choices. If you forget the choices, the game breaks.`;

    const initialPrompt =
      "The adventure begins. Describe the opening scene where my character starts, and give me my first 4 choices.";
    gameState = "ADVENTURE";
    callMistral(initialPrompt, systemPrompt);
  }

  function submitAction(action: string) {
    if (!action.trim() || isWaitingForAI || isAnimating) return;

    const actionHtml = `<div class="text-xs font-mono text-zinc-500 my-3 pb-1 border-b border-zinc-800/80">› Action chosen: <span class="text-emerald-400 font-medium">${action}</span></div>`;
    narrativeLog = [...narrativeLog, actionHtml];

    currentChoices = [];
    freeInput = "";
    callMistral(action);
  }

  function handleInputKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      submitAction(freeInput);
    }
  }

  function handleGlobalKeydown(e: KeyboardEvent) {
    if (gameState !== "ADVENTURE") return;
    if (document.activeElement?.tagName === "INPUT") return;

    if (e.key.length === 1) {
      cheatBuffer.push(e.key.toLowerCase());
      if (cheatBuffer.length > 20) cheatBuffer.shift();

      if (cheatBuffer.join("").includes("iamdungeonmaster")) {
        isDungeonMaster = true;
        cheatBuffer = [];
      }
    }
  }

  function godModeStats() {
    stats = { str: 99, dex: 99, con: 99, int: 99, wis: 99, cha: 99 };
    const actionHtml = `<div class="text-xs font-mono text-rose-400 font-bold my-2">› SYSTEM OVERRIDE: GOD MODE ACTIVATED (ALL STATS 99)</div>`;
    narrativeLog = [...narrativeLog, actionHtml];
  }

  function restoreStats() {
    if (originalStats) {
      stats = { ...originalStats };
      const actionHtml = `<div class="text-xs font-mono text-zinc-400 font-bold my-2">› SYSTEM OVERRIDE: ORIGINAL STATS RESTORED</div>`;
      narrativeLog = [...narrativeLog, actionHtml];
    }
  }

  function resetGame() {
    if (
      confirm(
        "Are you sure you want to restart your adventure? Current progress will be cleared.",
      )
    ) {
      localStorage.removeItem("dndGameSave");
      chatHistory = [];
      narrativeLog = [];
      currentChoices = [];
      originalStats = null;
      isDungeonMaster = false;
      cheatBuffer = [];
      rollStats();
      gameState = "CHARACTER_CREATION";
    }
  }

  let audioCtx: AudioContext | null = null;
  let isPlayingMusic = false;

  function toggleMusic() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.05;
      masterGain.connect(audioCtx.destination);

      // C Major 7 / 9 Ambient Pad
      const frequencies = [130.81, 164.81, 196.0, 246.94, 293.66];

      frequencies.forEach((freq, i) => {
        const osc = audioCtx!.createOscillator();
        const filter = audioCtx!.createBiquadFilter();
        const gain = audioCtx!.createGain();

        osc.type = "triangle";
        osc.frequency.value = freq;

        filter.type = "lowpass";
        filter.frequency.value = 350 + i * 40;

        const lfo = audioCtx!.createOscillator();
        lfo.type = "sine";
        lfo.frequency.value = 0.05 + Math.random() * 0.05;

        lfo.connect(gain.gain);
        gain.gain.value = 0.4;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start();
        lfo.start();
      });
      isPlayingMusic = true;
    } else {
      if (audioCtx.state === "running") {
        audioCtx.suspend();
        isPlayingMusic = false;
      } else {
        audioCtx.resume();
        isPlayingMusic = true;
      }
    }
  }
</script>

<svelte:window on:keydown={handleGlobalKeydown} />

<div
  class="w-full max-w-4xl mx-auto flex flex-col items-center justify-center pt-8 sm:pt-14 pb-16 px-4 gap-4 min-h-[85vh]"
>
  <!-- Top Navigation & Controls Bar -->
  <div
    class="w-full flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800/80"
  >
    <button
      type="button"
      on:click={() => dispatch("back")}
      class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
    >
      <span>← Back to Games</span>
    </button>

    <div class="flex items-center gap-3">
      <button
        type="button"
        on:click={toggleMusic}
        class="px-2.5 py-1 rounded-lg text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer"
      >
        <span>{isPlayingMusic ? "🔊 Music: ON" : "🔈 Music: OFF"}</span>
      </button>

      <span class="text-xs font-mono text-zinc-500 hidden sm:inline">
        Terminal RPG
      </span>
    </div>
  </div>

  <!-- Tactile Adventure Console Frame -->
  <div
    class="w-full p-3 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-xs dark:shadow-none space-y-3"
  >
    <!-- Functional Module Subheader -->
    <div
      class="flex items-center justify-between px-2 text-xs font-mono text-zinc-500"
    >
      <div class="flex items-center gap-2">
        <span
          class="inline-block w-2 h-2 rounded-full {gameState === 'ADVENTURE'
            ? 'bg-emerald-500 animate-pulse'
            : 'bg-zinc-400'}"
        ></span>
        <span class="font-bold text-zinc-700 dark:text-zinc-300">
          {gameState === "CHARACTER_CREATION"
            ? "CHARACTER CREATION"
            : gameState === "ERROR"
              ? "SYSTEM NOTICE"
              : "DUNGEON MASTER SESSION"}
        </span>
      </div>

      {#if gameState === "ADVENTURE"}
        <button
          type="button"
          on:click={() => (showMobileSheet = !showMobileSheet)}
          class="md:hidden px-2 py-0.5 rounded text-[11px] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
        >
          {showMobileSheet ? "✕ Close Stats" : "⚔ Character Stats"}
        </button>
      {/if}
    </div>

    <!-- Main Game Window -->
    <div
      class="w-full bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden h-[540px] sm:h-[580px] flex flex-col relative font-mono shadow-inner"
    >
      {#if gameState === "CHARACTER_CREATION"}
        <!-- Character Creation Grimoire Form -->
        <div
          class="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto"
        >
          <div class="w-full max-w-md flex flex-col gap-5">
            <div class="text-center space-y-1">
              <h2 class="text-xl font-bold font-display text-white">
                Create Your Adventurer
              </h2>
              <p class="text-xs text-zinc-400 font-sans">
                Set up your character identity and roll starting D&D 5e
                attributes.
              </p>
            </div>

            <!-- Name Input -->
            <div class="flex flex-col gap-1.5">
              <label
                for="char-name"
                class="text-xs font-mono text-zinc-400 uppercase"
                >Character Name</label
              >
              <input
                id="char-name"
                type="text"
                bind:value={charName}
                placeholder="e.g. Eldrin Shadowbane"
                class="bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 font-sans transition-colors"
              />
            </div>

            <!-- Race & Class Select -->
            <div class="grid grid-cols-2 gap-3">
              <div class="flex flex-col gap-1.5">
                <label
                  for="char-race"
                  class="text-xs font-mono text-zinc-400 uppercase">Race</label
                >
                <select
                  id="char-race"
                  bind:value={charRace}
                  class="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 font-sans transition-colors cursor-pointer"
                >
                  {#each races as r}
                    <option value={r}>{r}</option>
                  {/each}
                </select>
              </div>

              <div class="flex flex-col gap-1.5">
                <label
                  for="char-class"
                  class="text-xs font-mono text-zinc-400 uppercase">Class</label
                >
                <select
                  id="char-class"
                  bind:value={charClass}
                  class="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 font-sans transition-colors cursor-pointer"
                >
                  {#each classes as c}
                    <option value={c}>{c}</option>
                  {/each}
                </select>
              </div>
            </div>

            <!-- Attributes & Dice Roller -->
            <div
              class="p-3.5 border border-zinc-800/90 bg-zinc-900/60 rounded-xl space-y-3"
            >
              <div class="flex justify-between items-center">
                <span
                  class="text-xs font-mono text-zinc-400 uppercase font-bold"
                  >Attributes (3d6)</span
                >
                <button
                  type="button"
                  on:click={rollStats}
                  class="text-xs font-mono text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>🎲 Reroll Stats</span>
                </button>
              </div>

              <div class="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div
                  class="bg-zinc-900/90 p-2 rounded-lg border border-zinc-800"
                >
                  <span class="text-zinc-500 text-[10px]">STR</span>
                  <div class="text-zinc-100 font-bold text-sm">{stats.str}</div>
                </div>
                <div
                  class="bg-zinc-900/90 p-2 rounded-lg border border-zinc-800"
                >
                  <span class="text-zinc-500 text-[10px]">DEX</span>
                  <div class="text-zinc-100 font-bold text-sm">{stats.dex}</div>
                </div>
                <div
                  class="bg-zinc-900/90 p-2 rounded-lg border border-zinc-800"
                >
                  <span class="text-zinc-500 text-[10px]">CON</span>
                  <div class="text-zinc-100 font-bold text-sm">{stats.con}</div>
                </div>
                <div
                  class="bg-zinc-900/90 p-2 rounded-lg border border-zinc-800"
                >
                  <span class="text-zinc-500 text-[10px]">INT</span>
                  <div class="text-zinc-100 font-bold text-sm">{stats.int}</div>
                </div>
                <div
                  class="bg-zinc-900/90 p-2 rounded-lg border border-zinc-800"
                >
                  <span class="text-zinc-500 text-[10px]">WIS</span>
                  <div class="text-zinc-100 font-bold text-sm">{stats.wis}</div>
                </div>
                <div
                  class="bg-zinc-900/90 p-2 rounded-lg border border-zinc-800"
                >
                  <span class="text-zinc-500 text-[10px]">CHA</span>
                  <div class="text-zinc-100 font-bold text-sm">{stats.cha}</div>
                </div>
              </div>
            </div>

            <!-- Start Button -->
            <button
              type="button"
              on:click={startGame}
              class="w-full bg-zinc-100 hover:bg-white text-zinc-950 font-bold py-2.5 rounded-xl transition-colors text-sm font-sans cursor-pointer shadow-sm"
            >
              Begin Adventure →
            </button>
          </div>
        </div>
      {:else if gameState === "ERROR"}
        <!-- Error Screen -->
        <div
          class="flex-1 flex flex-col items-center justify-center p-8 gap-3 text-center"
        >
          <div
            class="px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800 text-rose-400 text-xs font-bold font-mono"
          >
            API CONNECTION ISSUE
          </div>
          <div class="text-zinc-400 text-xs max-w-sm font-mono leading-relaxed">
            {errorMessage ||
              "Unable to establish connection with AI Dungeon Master."}
          </div>
          <button
            type="button"
            on:click={() => (gameState = "CHARACTER_CREATION")}
            class="mt-2 px-4 py-2 bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-white rounded-xl text-xs font-mono transition-colors cursor-pointer"
          >
            ← Return to Character Screen
          </button>
        </div>
      {:else if gameState === "ADVENTURE"}
        <!-- Adventure Live View -->
        <div class="flex-1 flex overflow-hidden">
          <!-- Character Sheet Sidebar -->
          <div
            class="{showMobileSheet
              ? 'flex absolute inset-0 z-20 w-full'
              : 'hidden'} md:flex md:relative md:w-60 bg-zinc-900/95 md:bg-zinc-900/60 border-r border-zinc-800/80 p-4 flex-col shrink-0 overflow-y-auto"
          >
            <div class="space-y-1 pb-4 border-b border-zinc-800">
              <h3 class="text-sm font-bold font-display text-white truncate">
                {charName}
              </h3>
              <p class="text-xs text-zinc-400 font-mono">
                {charRace} · {charClass}
              </p>
            </div>

            <div
              class="text-[10px] text-zinc-500 font-mono font-bold uppercase mt-4 mb-2"
            >
              Attributes
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs font-mono mb-6">
              <div
                class="flex justify-between p-1.5 rounded bg-zinc-900 border border-zinc-800/60"
              >
                <span class="text-zinc-500">STR</span>
                <span class="text-zinc-200 font-bold">{stats.str}</span>
              </div>
              <div
                class="flex justify-between p-1.5 rounded bg-zinc-900 border border-zinc-800/60"
              >
                <span class="text-zinc-500">DEX</span>
                <span class="text-zinc-200 font-bold">{stats.dex}</span>
              </div>
              <div
                class="flex justify-between p-1.5 rounded bg-zinc-900 border border-zinc-800/60"
              >
                <span class="text-zinc-500">CON</span>
                <span class="text-zinc-200 font-bold">{stats.con}</span>
              </div>
              <div
                class="flex justify-between p-1.5 rounded bg-zinc-900 border border-zinc-800/60"
              >
                <span class="text-zinc-500">INT</span>
                <span class="text-zinc-200 font-bold">{stats.int}</span>
              </div>
              <div
                class="flex justify-between p-1.5 rounded bg-zinc-900 border border-zinc-800/60"
              >
                <span class="text-zinc-500">WIS</span>
                <span class="text-zinc-200 font-bold">{stats.wis}</span>
              </div>
              <div
                class="flex justify-between p-1.5 rounded bg-zinc-900 border border-zinc-800/60"
              >
                <span class="text-zinc-500">CHA</span>
                <span class="text-zinc-200 font-bold">{stats.cha}</span>
              </div>
            </div>

            {#if isDungeonMaster}
              <div
                class="p-2.5 rounded-lg border border-rose-900/60 bg-rose-950/20 mb-4 space-y-2"
              >
                <div
                  class="text-[10px] text-rose-400 font-bold font-mono uppercase"
                >
                  DM God Tools
                </div>
                <button
                  on:click={godModeStats}
                  class="w-full text-left text-[11px] font-mono text-rose-300 hover:text-rose-100 p-1 rounded hover:bg-rose-900/40 transition-colors"
                >
                  › God Mode (99 All)
                </button>
                <button
                  on:click={restoreStats}
                  class="w-full text-left text-[11px] font-mono text-zinc-300 hover:text-white p-1 rounded hover:bg-zinc-800 transition-colors"
                >
                  › Restore Stats
                </button>
              </div>
            {/if}

            <div class="mt-auto space-y-2 pt-4 border-t border-zinc-800/80">
              <button
                type="button"
                on:click={resetGame}
                class="w-full text-[11px] font-mono text-zinc-400 hover:text-rose-400 py-1.5 rounded border border-zinc-800 hover:border-rose-900/60 transition-colors cursor-pointer"
              >
                Restart Campaign
              </button>
              <div class="text-[10px] text-zinc-600 font-mono text-center">
                Autosaved
              </div>
            </div>
          </div>

          <!-- Main Narrative Log View -->
          <div
            class="flex-1 flex flex-col relative overflow-hidden bg-zinc-950 min-w-0"
          >
            <!-- Story Scrolling Container -->
            <div
              bind:this={logContainer}
              class="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth overscroll-none"
            >
              {#each narrativeLog as log}
                <div
                  class="text-zinc-300 leading-relaxed mb-4 whitespace-pre-wrap font-serif text-sm sm:text-base selection:bg-emerald-950 selection:text-emerald-200"
                >
                  {@html log}
                </div>
              {/each}

              {#if isWaitingForAI}
                <div
                  class="flex items-center gap-2 text-zinc-400 mt-3 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 w-fit"
                >
                  <span class="text-xs font-mono text-zinc-400"
                    >Dungeon Master is composing</span
                  >
                  <div class="flex gap-1">
                    <span
                      class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"
                    ></span>
                    <span
                      class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"
                      style="animation-delay: 150ms"
                    ></span>
                    <span
                      class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"
                      style="animation-delay: 300ms"
                    ></span>
                  </div>
                </div>
              {/if}
            </div>

            <!-- Bottom Actions & Input Area -->
            <div
              class="shrink-0 border-t border-zinc-800/90 bg-zinc-900/90 p-3 sm:p-4 space-y-3"
            >
              <!-- Choice Action Buttons -->
              {#if currentChoices.length > 0}
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {#each currentChoices as choice}
                    <button
                      type="button"
                      on:click={() => submitAction(choice)}
                      class="text-left text-xs font-mono p-2.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700/80 border border-zinc-700/80 hover:border-zinc-500 text-zinc-200 hover:text-white transition-colors active:scale-[0.99] cursor-pointer"
                    >
                      {choice}
                    </button>
                  {/each}
                </div>
              {/if}

              <!-- Custom Text Input -->
              <div class="flex items-center gap-2 pt-1">
                <span class="text-zinc-500 font-mono text-sm pl-1">›</span>
                <input
                  bind:value={freeInput}
                  on:keydown={handleInputKeydown}
                  type="text"
                  placeholder="Or enter custom action..."
                  disabled={isWaitingForAI || isAnimating}
                  class="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs font-mono text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  on:click={() => submitAction(freeInput)}
                  disabled={isWaitingForAI || isAnimating || !freeInput.trim()}
                  class="px-3 py-1.5 bg-zinc-100 hover:bg-white text-zinc-950 rounded-lg text-xs font-mono font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Act ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <!-- Bottom Details -->
  <div
    class="w-full flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-500 pt-2"
  >
    <div class="inline-flex items-center gap-1.5">
      <span>D&D 5th Edition Ruleset</span>
    </div>
  </div>
</div>
