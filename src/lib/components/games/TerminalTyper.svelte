
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
      osc.frequency.setValueAtTime(400 + Math.random() * 200, audioCtx.currentTime); // Random pitch for mechanical feel
      
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
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
      
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
      
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
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch(e) {}
  }

  function spawnWord() {
    currentWord = COMMANDS[Math.floor(Math.random() * COMMANDS.length)];
    currentTyped = "";
    nextExpectedChar = currentWord[0];
    
    // Make it harder as score goes up
    maxTimeMs = Math.max(1500, 5000 - (score * 150)); 
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
      osc.frequency.setValueAtTime(400, audioCtx.currentTime + 0.15);
      osc.frequency.setValueAtTime(500, audioCtx.currentTime + 0.3);
      osc.frequency.setValueAtTime(600, audioCtx.currentTime + 0.45);
      osc.frequency.setValueAtTime(800, audioCtx.currentTime + 0.6);
      
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime + 0.7);
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.2);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch(e) {}
  }

  function getRating(wpm: number) {
    if (wpm <= 20) return "Grandma Typist";
    if (wpm <= 40) return "Keyboard Pecker";
    if (wpm <= 60) return "Junior Developer";
    if (wpm <= 80) return "Senior Engineer";
    if (wpm <= 100) return "10x Hacker";
    return "CYBER GOD";
  }

  function gameOver() {
    isGameOver = true;
    playGameOverFanfare();
    if (animationId) cancelAnimationFrame(animationId);
  }

  function calculateWpm(now: number) {
    const elapsedMinutes = (now - startTime) / 60000;
    if (elapsedMinutes > 0) {
      // Standard WPM formula: (chars / 5) / minutes
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

    // Prevent default browser shortcuts except for essential ones
    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      
      if (!gameStarted) {
        startGame();
        return;
      }

      if (isGameOver) {
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
        // Wrong key
        playErrorSound();
        // Time penalty for typos
        currentTimeMs -= 200; 
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

<div class="w-full flex flex-col items-center justify-center pt-24 px-4 gap-6 min-h-[80vh]">
  <div class="w-full max-w-3xl flex justify-between items-center text-zinc-400 font-mono">
    <button on:click={() => dispatch('back')} class="hover:text-cyan-400 transition-colors flex items-center gap-2">
      <span class="text-cyan-500">&lt;</span> TERMINATE
    </button>
    <div class="text-sm">WARRIROR.exe</div>
  </div>

  <div class="w-full max-w-3xl bg-[#0a0a0c] border border-zinc-800 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.05)] h-[400px] flex flex-col relative font-mono">
    
    <!-- Top Bar -->
    <div class="w-full h-8 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 justify-between">
      <div class="flex gap-2">
        <div class="w-3 h-3 rounded-full bg-rose-500/50"></div>
        <div class="w-3 h-3 rounded-full bg-amber-500/50"></div>
        <div class="w-3 h-3 rounded-full bg-green-500/50"></div>
      </div>
      <div class="text-xs text-zinc-500">
        root@terminal:~
      </div>
    </div>

    <!-- Game Area -->
    <div class="flex-1 p-6 flex flex-col relative">
      
      <!-- Stats -->
      <div class="flex justify-between text-zinc-400 mb-8">
        <div>SCORE: <span class="text-cyan-400 font-bold">{score}</span></div>
        <div>WPM: <span class="text-emerald-400 font-bold">{wpm}</span></div>
      </div>

      <!-- Main Typing Area -->
      <div class="flex-1 flex flex-col items-center justify-center">
        {#if !gameStarted && !isGameOver}
          <div class="text-cyan-400 text-2xl font-bold mb-4 animate-pulse">SYSTEM READY</div>
          <div class="text-zinc-500">Start typing to initiate bypass...</div>
        {:else if isGameOver}
          <div class="text-rose-500 text-3xl font-bold mb-4">ACCESS DENIED</div>
          <div class="text-zinc-500 mb-2">TIMEOUT REACHED</div>
          
          <div class="mt-4 p-4 border border-zinc-800 bg-zinc-900/50 rounded-lg text-center min-w-[300px] shadow-[0_0_15px_rgba(34,211,238,0.05)]">
            <div class="text-xs text-zinc-500 mb-1">FINAL RATING</div>
            <div class="text-xl font-black text-cyan-400 uppercase tracking-widest">{getRating(wpm)}</div>
          </div>

          <div class="text-zinc-400 mt-6 font-bold text-lg">Final Score: <span class="text-cyan-400">{score}</span> | WPM: <span class="text-emerald-400">{wpm}</span></div>
          <div class="text-zinc-600 mt-8 text-sm animate-pulse">Press any key to retry</div>
        {:else}
          <!-- Timeout Bar -->
          <div class="w-full max-w-md h-3 bg-zinc-800 rounded-full mb-8 overflow-hidden relative border border-zinc-700">
            <div 
              class="h-full rounded-full {timeLeft > 30 ? 'bg-cyan-400' : 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'}"
              style="width: {Math.max(0, timeLeft)}%"
            ></div>
          </div>
          
          <!-- Word -->
          <div class="text-3xl tracking-widest flex items-center justify-center break-all text-center">
            <span class="text-emerald-400">
              {currentTyped}
            </span>
            <span class="text-zinc-100 bg-zinc-800 relative">
              {currentWord.substring(currentTyped.length, currentTyped.length + 1)}
              <!-- Cursor blink under expected char -->
              <span class="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 animate-pulse"></span>
            </span>
            <span class="text-zinc-600">
              {currentWord.substring(currentTyped.length + 1)}
            </span>
          </div>
        {/if}
      </div>

    </div>
  </div>
</div>
