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
    if (audioCtx && audioCtx.state !== 'closed') {
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
        // Only send the last 10 messages to save context limit and cost
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
      '<strong class="text-cyan-400">$1</strong>',
    );
    formattedText = formattedText.replace(
      /\*(.*?)\*/g,
      '<em class="text-emerald-400">$1</em>',
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
        const words = token.split(/(\s+)/); // split by spaces, preserving spaces
        for (let i = 0; i < words.length; i++) {
          current += words[i];
          narrativeLog[lastIndex] = current;
          await new Promise((r) => setTimeout(r, 20)); // Delay per word/space
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

    const actionHtml = `<div class="text-zinc-500 italic mt-4 mb-2">> You chose: <span class="text-emerald-400">${action}</span></div>`;
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
    const actionHtml = `<div class="text-rose-500 font-bold italic mt-4 mb-2">> SYSTEM OVERRIDE: GOD MODE ACTIVATED</div>`;
    narrativeLog = [...narrativeLog, actionHtml];
  }

  function restoreStats() {
    if (originalStats) {
      stats = { ...originalStats };
      const actionHtml = `<div class="text-cyan-500 font-bold italic mt-4 mb-2">> SYSTEM OVERRIDE: STATS RESTORED</div>`;
      narrativeLog = [...narrativeLog, actionHtml];
    }
  }

  function resetGame() {
    if (confirm("Are you sure you want to delete this character and start over?")) {
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
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.08; 
      masterGain.connect(audioCtx.destination);
      
      // C Major 7 / 9
      const frequencies = [130.81, 164.81, 196.00, 246.94, 293.66];
      
      frequencies.forEach((freq, i) => {
        const osc = audioCtx!.createOscillator();
        const filter = audioCtx!.createBiquadFilter();
        const gain = audioCtx!.createGain();

        osc.type = 'triangle';
        osc.frequency.value = freq;
        
        filter.type = 'lowpass';
        filter.frequency.value = 400 + i * 50;

        const lfo = audioCtx!.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.05 + Math.random() * 0.05;
        
        lfo.connect(gain.gain);
        gain.gain.value = 0.5;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        
        osc.start();
        lfo.start();
      });
      isPlayingMusic = true;
    } else {
      if (audioCtx.state === 'running') {
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
  class="w-full flex flex-col items-center justify-center pt-24 px-4 gap-6 min-h-[80vh]"
>
  <!-- Header -->
  <div
    class="w-full max-w-4xl flex justify-between items-center text-zinc-400 font-mono"
  >
    <button
      on:click={() => dispatch("back")}
      class="hover:text-cyan-400 transition-colors flex items-center gap-2"
    >
      <span class="text-cyan-500">&lt;</span> RETREAT
    </button>
    <div class="flex items-center gap-4">
      <button on:click={toggleMusic} class="text-xs text-zinc-500 hover:text-cyan-400 transition-colors flex items-center gap-2">
        {isPlayingMusic ? '🔊 BGM ON' : '🔈 BGM OFF'}
      </button>
      <div class="text-sm">RPG_SYSTEM.exe</div>
    </div>
  </div>

  <div
    class="w-full max-w-4xl bg-[#0a0a0c] border border-zinc-800 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.05)] h-[600px] flex flex-col relative font-mono"
  >
    <!-- Top Bar -->
    <div
      class="w-full h-8 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 justify-between shrink-0"
    >
      <div class="flex gap-2">
        <div class="w-3 h-3 rounded-full bg-rose-500/50"></div>
        <div class="w-3 h-3 rounded-full bg-amber-500/50"></div>
        <div class="w-3 h-3 rounded-full bg-green-500/50"></div>
      </div>
      <div class="text-xs text-zinc-500 uppercase tracking-widest">
        Dungeons & Dragons AI Module
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 flex overflow-hidden">
      {#if gameState === "CHARACTER_CREATION"}
        <div
          class="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto"
        >
          <h2 class="text-2xl font-black text-cyan-400 mb-8 tracking-widest">
            CHARACTER CREATION
          </h2>

          <div class="w-full max-w-md flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-zinc-500 text-sm">CHARACTER NAME</label>
              <input
                type="text"
                bind:value={charName}
                placeholder="Enter name..."
                class="bg-zinc-900 border border-zinc-700 rounded px-4 py-2 text-zinc-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-2">
                <label class="text-zinc-500 text-sm">RACE</label>
                <select
                  bind:value={charRace}
                  class="bg-zinc-900 border border-zinc-700 rounded px-4 py-2 text-zinc-200 focus:outline-none focus:border-cyan-500"
                >
                  {#each races as r}
                    <option value={r}>{r}</option>
                  {/each}
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-zinc-500 text-sm">CLASS</label>
                <select
                  bind:value={charClass}
                  class="bg-zinc-900 border border-zinc-700 rounded px-4 py-2 text-zinc-200 focus:outline-none focus:border-cyan-500"
                >
                  {#each classes as c}
                    <option value={c}>{c}</option>
                  {/each}
                </select>
              </div>
            </div>

            <div
              class="flex flex-col gap-2 mt-4 p-4 border border-zinc-800 bg-zinc-900/30 rounded-lg"
            >
              <div class="flex justify-between items-center mb-2">
                <label class="text-zinc-500 text-sm">ATTRIBUTES</label>
                <button
                  on:click={rollStats}
                  class="text-xs text-cyan-500 hover:text-cyan-400 border border-cyan-900 hover:border-cyan-500 rounded px-2 py-1 transition-colors"
                >
                  REROLL (3d6)
                </button>
              </div>
              <div class="grid grid-cols-3 gap-2 text-center text-sm">
                <div class="bg-zinc-900 p-2 rounded border border-zinc-800">
                  <span class="text-zinc-500">STR</span> <br /><span
                    class="text-zinc-200 font-bold">{stats.str}</span
                  >
                </div>
                <div class="bg-zinc-900 p-2 rounded border border-zinc-800">
                  <span class="text-zinc-500">DEX</span> <br /><span
                    class="text-zinc-200 font-bold">{stats.dex}</span
                  >
                </div>
                <div class="bg-zinc-900 p-2 rounded border border-zinc-800">
                  <span class="text-zinc-500">CON</span> <br /><span
                    class="text-zinc-200 font-bold">{stats.con}</span
                  >
                </div>
                <div class="bg-zinc-900 p-2 rounded border border-zinc-800">
                  <span class="text-zinc-500">INT</span> <br /><span
                    class="text-zinc-200 font-bold">{stats.int}</span
                  >
                </div>
                <div class="bg-zinc-900 p-2 rounded border border-zinc-800">
                  <span class="text-zinc-500">WIS</span> <br /><span
                    class="text-zinc-200 font-bold">{stats.wis}</span
                  >
                </div>
                <div class="bg-zinc-900 p-2 rounded border border-zinc-800">
                  <span class="text-zinc-500">CHA</span> <br /><span
                    class="text-zinc-200 font-bold">{stats.cha}</span
                  >
                </div>
              </div>
            </div>

            <button
              on:click={startGame}
              class="mt-4 w-full bg-cyan-500/10 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 font-bold py-3 rounded transition-all"
            >
              BEGIN ADVENTURE
            </button>
          </div>
        </div>
      {:else if gameState === "ERROR"}
        <div class="flex-1 flex flex-col items-center justify-center p-8 gap-4">
          <div class="text-rose-500 text-xl font-bold">API ERROR</div>
          <div class="text-zinc-400 text-sm max-w-md text-center">
            {errorMessage}
          </div>
          <button
            on:click={() => (gameState = "CHARACTER_CREATION")}
            class="mt-4 px-4 py-2 border border-zinc-700 text-zinc-300 hover:text-white rounded"
            >Retry</button
          >
        </div>
      {:else if gameState === "ADVENTURE"}
        <!-- Left Sidebar: Character Sheet -->
        <div
          class="w-64 bg-zinc-900/50 border-r border-zinc-800 p-4 flex flex-col shrink-0 overflow-y-auto hidden md:flex overscroll-none"
        >
          <h3 class="text-cyan-400 font-bold uppercase truncate">{charName}</h3>
          <div class="text-xs text-zinc-500 mb-6">{charRace} {charClass}</div>

          <div class="text-xs text-zinc-600 mb-2 font-bold">ATTRIBUTES</div>
          <div class="grid grid-cols-2 gap-2 text-xs mb-6">
            <div class="flex justify-between border-b border-zinc-800 pb-1">
              <span class="text-zinc-500">STR</span>
              <span class="text-zinc-300">{stats.str}</span>
            </div>
            <div class="flex justify-between border-b border-zinc-800 pb-1">
              <span class="text-zinc-500">DEX</span>
              <span class="text-zinc-300">{stats.dex}</span>
            </div>
            <div class="flex justify-between border-b border-zinc-800 pb-1">
              <span class="text-zinc-500">CON</span>
              <span class="text-zinc-300">{stats.con}</span>
            </div>
            <div class="flex justify-between border-b border-zinc-800 pb-1">
              <span class="text-zinc-500">INT</span>
              <span class="text-zinc-300">{stats.int}</span>
            </div>
            <div class="flex justify-between border-b border-zinc-800 pb-1">
              <span class="text-zinc-500">WIS</span>
              <span class="text-zinc-300">{stats.wis}</span>
            </div>
            <div class="flex justify-between border-b border-zinc-800 pb-1">
              <span class="text-zinc-500">CHA</span>
              <span class="text-zinc-300">{stats.cha}</span>
            </div>
          </div>

          {#if isDungeonMaster}
            <div class="mt-4 pt-4 border-t border-rose-900/50 mb-6">
              <div class="text-[10px] text-rose-500 font-bold mb-3 animate-pulse tracking-widest">DM_TOOLS.exe</div>
              <div class="flex flex-col gap-2">
                <button on:click={godModeStats} class="text-xs bg-rose-900/20 text-rose-400 border border-rose-900/50 hover:bg-rose-900/50 p-2 rounded transition-colors text-left font-mono">
                  > SET_ALL_STATS(99)
                </button>
                <button on:click={restoreStats} class="text-xs bg-cyan-900/20 text-cyan-400 border border-cyan-900/50 hover:bg-cyan-900/50 p-2 rounded transition-colors text-left font-mono">
                  > RESTORE_STATS()
                </button>
              </div>
            </div>
          {/if}

          <button on:click={resetGame} class="mt-auto text-[10px] text-rose-500/70 hover:text-rose-500 transition-colors border border-rose-900/30 hover:border-rose-900/80 p-1.5 rounded w-full mb-3 font-bold">
            [ RESET PROGRESS ]
          </button>

          <div
            class="pt-4 border-t border-zinc-800 text-[10px] text-zinc-600"
          >
            Powered by Juan Dungeon Master
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col relative overflow-hidden bg-[#050505]">
          <!-- Narrative Log -->
          <div
            bind:this={logContainer}
            class="flex-1 overflow-y-auto p-6 scroll-smooth overscroll-none"
          >
            {#each narrativeLog as log}
              <div
                class="text-zinc-300 leading-relaxed mb-4 whitespace-pre-wrap font-serif text-lg"
              >
                {@html log}
              </div>
            {/each}

            {#if isWaitingForAI}
              <div
                class="flex items-center gap-2 text-zinc-500 mt-4 bg-zinc-900/50 self-start p-3 rounded-2xl rounded-tl-sm w-fit border border-zinc-800"
              >
                <div class="flex gap-1.5">
                  <div
                    class="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"
                    style="animation-delay: 0ms"
                  ></div>
                  <div
                    class="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"
                    style="animation-delay: 150ms"
                  ></div>
                  <div
                    class="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"
                    style="animation-delay: 300ms"
                  ></div>
                </div>
              </div>
            {/if}
          </div>

          <!-- Bottom Action Area -->
          <div class="shrink-0 border-t border-zinc-800 bg-zinc-900/80 p-4">
            <!-- Dynamic Buttons -->
            {#if currentChoices.length > 0}
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {#each currentChoices as choice}
                  <button
                    on:click={() => submitAction(choice)}
                    class="text-left text-sm p-3 bg-zinc-800 hover:bg-cyan-900/30 border border-zinc-700 hover:border-cyan-500/50 text-zinc-300 hover:text-cyan-100 rounded transition-colors"
                  >
                    {choice}
                  </button>
                {/each}
              </div>
            {/if}

            <!-- Free Typing Input -->
            <div class="flex gap-2">
              <span class="text-emerald-500 pt-2">></span>
              <input
                bind:value={freeInput}
                on:keydown={handleInputKeydown}
                type="text"
                placeholder="Or type any action you want to do..."
                disabled={isWaitingForAI || isAnimating}
                class="flex-1 bg-transparent border-b border-zinc-700 hover:border-zinc-500 focus:border-cyan-500 text-zinc-200 py-2 outline-none transition-colors disabled:opacity-50"
              />
              <button
                on:click={() => submitAction(freeInput)}
                disabled={isWaitingForAI || isAnimating}
                class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded text-zinc-300 text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ROLL
              </button>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
