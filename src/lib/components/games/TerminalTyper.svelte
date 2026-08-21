<script lang="ts">
  import { onMount, createEventDispatcher, onDestroy } from 'svelte';

  const dispatch = createEventDispatcher();

  // Word Dictionary
  const COMMANDS = [
    "sudo rm -rf /",
    "git commit -m 'fix'",
    "npm run dev",
    "docker-compose up -d",
    "ssh root@192.168.1.1",
    "chmod +x script.sh",
    "grep -r 'TODO' .",
    "tail -f /var/log/syslog",
    "ping 8.8.8.8",
    "npx create-svelte@latest",
    "tar -czvf archive.tar.gz folder",
    "systemctl restart nginx",
    "curl -O https://example.com/file",
    "ps aux | grep node",
    "kill -9 1337",
    "apt-get update && apt-get upgrade",
    "chown -R user:group /var/www",
    "find . -type f -name '*.js'",
    "rsync -avz local/ remote:/",
    "ssh-keygen -t ed25519"
  ];

  let audioCtx: AudioContext | null = null;
  
  let gameStarted = false;
  let isGameOver = false;
  
  let currentWord = "";
  let currentTyped = "";
  let nextExpectedChar = "";
  
  let score = 0;
  let wpm = 0;
  let totalCharsTyped = 0;
  let startTime = 0;
  
  let timeLeft = 100; // Percentage 100 to 0
  let maxTimeMs = 5000;
  let currentTimeMs = 5000;
  let lastFrameTime = 0;
  let animationId: number;

  // Cheat Code State
  let cheatBuffer: string[] = [];
  const CHEAT_SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft'];
  let isAutoTyping = false;
  let autoTypeEndTime = 0;
  let lastAutoTypeTime = 0;

  function playKeySound() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400 + Math.random() * 200, audioCtx.currentTime); // Random pitch for mechanical switch feel
      
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, audioCtx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch(e) {}
  }

  function playErrorSound() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.2);
      
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.005, audioCtx.currentTime + 0.2);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } catch(e) {}
  }

  function playSuccessSound() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.setValueAtTime(1320, audioCtx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.005, audioCtx.currentTime + 0.25);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch(e) {}
  }

  function spawnWord() {
    currentWord = COMMANDS[Math.floor(Math.random() * COMMANDS.length)];
    currentTyped = "";
    nextExpectedChar = currentWord[0];
    
    // Gradual difficulty scaling
    maxTimeMs = Math.max(1600, 5000 - (score * 140)); 
    currentTimeMs = maxTimeMs;
    timeLeft = 100;
  }

  function startGame() {
    gameStarted = true;
    isGameOver = false;
    score = 0;
    wpm = 0;
    totalCharsTyped = 0;
    startTime = performance.now();
    lastFrameTime = performance.now();
    spawnWord();
    
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(gameLoop);
  }

  function playGameOverFanfare() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(300, audioCtx.currentTime);
      osc.frequency.setValueAtTime(400, audioCtx.currentTime + 0.12);
      osc.frequency.setValueAtTime(500, audioCtx.currentTime + 0.24);
      osc.frequency.setValueAtTime(600, audioCtx.currentTime + 0.36);
      osc.frequency.setValueAtTime(800, audioCtx.currentTime + 0.48);
      
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime + 0.55);
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.0);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 1.0);
    } catch(e) {}
  }

  function getRating(wpm: number) {
    if (wpm <= 25) return { title: "Novice Typist", badge: "bg-zinc-800 text-zinc-300" };
    if (wpm <= 45) return { title: "Touch Typist", badge: "bg-blue-900/60 text-blue-300" };
    if (wpm <= 65) return { title: "Proficient Developer", badge: "bg-emerald-900/60 text-emerald-300" };
    if (wpm <= 85) return { title: "Senior Systems Engineer", badge: "bg-purple-900/60 text-purple-300" };
    if (wpm <= 105) return { title: "10x Speed Demon", badge: "bg-amber-900/60 text-amber-300" };
    return { title: "Keyboard Virtuoso", badge: "bg-rose-900/60 text-rose-300" };
  }

  function gameOver() {
    isGameOver = true;
    playGameOverFanfare();
    if (animationId) cancelAnimationFrame(animationId);
  }

  function calculateWpm(now: number) {
    const elapsedMinutes = (now - startTime) / 60000;
    if (elapsedMinutes > 0) {
      wpm = Math.round((totalCharsTyped / 5) / elapsedMinutes);
    }
  }

  function gameLoop(timestamp: number) {
    if (isGameOver) return;
    
    const dt = timestamp - lastFrameTime;
    lastFrameTime = timestamp;
    
    if (gameStarted) {
      if (isAutoTyping) {
        if (timestamp < autoTypeEndTime) {
          if (timestamp - lastAutoTypeTime > 50) {
            lastAutoTypeTime = timestamp;
            if (nextExpectedChar) {
              currentTyped += nextExpectedChar;
              totalCharsTyped++;
              playKeySound();
              
              if (currentTyped === currentWord) {
                score++;
                playSuccessSound();
                spawnWord();
              } else {
                nextExpectedChar = currentWord[currentTyped.length];
              }
            }
          }
        } else {
          isAutoTyping = false;
        }
      }

      if (!isAutoTyping) {
        currentTimeMs -= dt;
      }
      
      timeLeft = (currentTimeMs / maxTimeMs) * 100;
      calculateWpm(timestamp);
      
      if (currentTimeMs <= 0) {
        gameOver();
        return;
      }
    }
    
    animationId = requestAnimationFrame(gameLoop);
  }

  function handleInput(e: KeyboardEvent) {
    if (e.key.startsWith('Arrow')) {
      cheatBuffer.push(e.key);
      if (cheatBuffer.length > CHEAT_SEQUENCE.length) {
        cheatBuffer.shift();
      }
      
      let isMatch = cheatBuffer.length === CHEAT_SEQUENCE.length;
      if (isMatch) {
        for (let i = 0; i < CHEAT_SEQUENCE.length; i++) {
          if (cheatBuffer[i] !== CHEAT_SEQUENCE[i]) {
            isMatch = false;
            break;
          }
        }
      }
      
      if (isMatch && gameStarted && !isGameOver && !isAutoTyping) {
        isAutoTyping = true;
        autoTypeEndTime = performance.now() + 20000;
        cheatBuffer = [];
      }
    }

    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      
      if (!gameStarted || isGameOver) {
        startGame();
        return;
      }
      
      const char = e.key;
      
      if (char === nextExpectedChar) {
        currentTyped += char;
        totalCharsTyped++;
        playKeySound();
        
        if (currentTyped === currentWord) {
          score++;
          playSuccessSound();
          spawnWord();
        } else {
          nextExpectedChar = currentWord[currentTyped.length];
        }
      } else {
        playErrorSound();
        currentTimeMs -= 200; // Time penalty for typos
      }
    } else if (e.code === 'Space') {
      e.preventDefault();
      if (!gameStarted || isGameOver) startGame();
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleInput);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleInput);
    if (animationId) cancelAnimationFrame(animationId);
  });
</script>

<div class="w-full max-w-4xl mx-auto flex flex-col items-center justify-center pt-8 sm:pt-14 pb-16 px-4 gap-4 min-h-[85vh]">
  
  <!-- Top Navigation & Return Link -->
  <div class="w-full flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800/80">
    <button
      type="button"
      on:click={() => dispatch('back')}
      class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
    >
      <span>← Back to Games</span>
    </button>

    <div class="flex items-center gap-3 text-xs font-mono">
      <span class="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
        WPM ENGINE
      </span>
      <span class="text-zinc-500">Terminal Warrior</span>
    </div>
  </div>

  <!-- Tactile Terminal Console Frame -->
  <div class="w-full p-3 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-xs dark:shadow-none space-y-3">
    
    <!-- Functional Terminal Header -->
    <div class="flex items-center justify-between px-2 text-xs font-mono text-zinc-500">
      <div class="flex items-center gap-2.5">
        <span class="inline-block w-2 h-2 rounded-full {gameStarted && !isGameOver ? 'bg-emerald-500 animate-pulse' : isGameOver ? 'bg-rose-500' : 'bg-zinc-400'}"></span>
        <span class="font-bold text-zinc-700 dark:text-zinc-300">
          {isGameOver ? 'SESSION EXPIRED' : gameStarted ? 'BENCHMARK RUNNING' : 'INPUT READY'}
        </span>
      </div>

      <div class="flex items-center gap-4">
        <span>SCORE: <strong class="text-zinc-950 dark:text-white font-bold">{score}</strong></span>
        <span>WPM: <strong class="text-emerald-600 dark:text-emerald-400 font-bold">{wpm}</strong></span>
      </div>
    </div>

    <!-- Terminal Screen -->
    <div class="w-full bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden min-h-[300px] sm:min-h-[360px] flex flex-col relative font-mono shadow-inner">
      
      <!-- Terminal Subheader -->
      <div class="w-full h-8 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center px-4 justify-between text-xs text-zinc-400">
        <span class="text-zinc-400 font-mono text-[11px]">rafitojuan@terminal:~ (bash)</span>
        <span class="text-[11px] text-zinc-400">Keystroke Synth: Active</span>
      </div>

      <!-- Main Interactive Display Area -->
      <div class="flex-1 p-4 sm:p-8 flex flex-col items-center justify-center relative">
        {#if !gameStarted && !isGameOver}
          <div class="flex flex-col items-center text-center space-y-3">
            <div class="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-bold tracking-wider">
              READY TO BENCHMARK
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-white font-display">
              Terminal Speed Typer
            </h2>
            <p class="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              Type real-world Linux, Docker, and Git shell commands against the countdown timer.
            </p>
            <div class="pt-3">
              <kbd class="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs font-mono inline-flex items-center gap-1.5 shadow-sm">
                Press ANY KEY or SPACE to Begin
              </kbd>
            </div>
          </div>
        {:else if isGameOver}
          <!-- Professional Speedcard Summary -->
          <div class="flex flex-col items-center text-center space-y-4 w-full max-w-md animate-fade-in">
            <div class="px-3 py-0.5 rounded-full bg-rose-950/60 border border-rose-800/60 text-rose-400 text-[11px] font-bold tracking-wider">
              TIMEOUT REACHED
            </div>
            
            <div class="space-y-1">
              <div class="text-xs text-zinc-500 uppercase tracking-widest font-mono">Typing Speed Benchmark</div>
              <div class="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                {wpm} <span class="text-base text-zinc-500 font-normal">WPM</span>
              </div>
            </div>

            <!-- Tier Rating Badge -->
            <div class="px-3 py-1 rounded-lg border border-zinc-700 text-xs font-bold uppercase tracking-wider {getRating(wpm).badge}">
              {getRating(wpm).title}
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-3 w-full pt-2">
              <div class="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-left">
                <div class="text-[10px] text-zinc-400 uppercase">Commands Solved</div>
                <div class="text-lg font-bold text-zinc-100 font-mono">{score}</div>
              </div>
              <div class="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-left">
                <div class="text-[10px] text-zinc-400 uppercase">Total Characters</div>
                <div class="text-lg font-bold text-emerald-400 font-mono">{totalCharsTyped}</div>
              </div>
            </div>

            <div class="pt-2 text-xs text-zinc-400 font-mono animate-pulse">
              Press any key or Space to retry
            </div>
          </div>
        {:else}
          <!-- Active Typing Game Loop -->
          <div class="w-full flex flex-col items-center space-y-6 sm:space-y-8">
            
            <!-- Dynamic Countdown Progress Bar -->
            <div class="w-full max-w-md h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 relative">
              <div 
                class="h-full rounded-full transition-all duration-75 {timeLeft > 30 ? 'bg-emerald-500' : 'bg-rose-500'}"
                style="width: {Math.max(0, timeLeft)}%"
              ></div>
            </div>
            
            <!-- Word Display with Character Highlighting -->
            <div class="text-xl sm:text-3xl tracking-wider font-mono flex items-center justify-center flex-wrap gap-y-2 text-center select-none">
              <!-- Successfully Typed Characters -->
              <span class="text-emerald-400 font-bold">
                {currentTyped}
              </span>
              
              <!-- Next Expected Character (Cursor Box) -->
              <span class="text-zinc-950 bg-emerald-400 px-1 py-0.5 rounded-xs font-bold relative mx-0.5 animate-pulse">
                {currentWord.substring(currentTyped.length, currentTyped.length + 1) === ' ' ? '␣' : currentWord.substring(currentTyped.length, currentTyped.length + 1)}
              </span>
              
              <!-- Remaining Untyped Characters -->
              <span class="text-zinc-600">
                {currentWord.substring(currentTyped.length + 1)}
              </span>
            </div>

            <!-- Typing Instructions Micro-hint -->
            <div class="text-xs text-zinc-600 font-mono">
              -200ms penalty for typo mistakes
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Control Hints & Info -->
  <div class="w-full flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-500 pt-2">
    <div class="inline-flex items-center gap-1.5">
      <span>Audio: Procedural Mechanical Key Switch Synthesis</span>
    </div>
    <span class="text-zinc-300 dark:text-zinc-700">•</span>
    <div class="inline-flex items-center gap-1.5">
      <span>Standard WPM: <code class="text-zinc-700 dark:text-zinc-300">(chars ÷ 5) ÷ min</code></span>
    </div>
  </div>
</div>
