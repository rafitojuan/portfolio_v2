<script lang="ts">
  import { onMount, createEventDispatcher, onDestroy } from "svelte";

  const dispatch = createEventDispatcher();

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let animationId: number;

  // Game constants
  const GRAVITY = 0.6;
  const JUMP_POWER = -11.5;
  let GAME_SPEED = 5;
  let OBSTACLE_SPAWN_RATE = 1500; // ms

  let audioCtx: AudioContext | null = null;
  let gameStarted = false;
  let isGameOver = false;
  let score = 0;
  let highScore = 0;
  let level = 1;
  let lastLevel = 1;
  let lastTime = 0;
  let obstacleTimer = 0;
  let powerupSpawnTimer = 0;
  const POWERUP_SPAWN_RATE = 5000;
  
  let cheatBuffer = "";
  let touchStartY = 0;

  // BGM variables
  let bgmTimer = 0;
  let currentNoteIndex = 0;
  const bgmNotes = [110.0, 110.0, 220.0, 110.0, 164.81, 110.0, 196.0, 110.0];
  const BGM_INTERVAL = 160;

  // Entities
  let dino = {
    x: 50,
    y: 150,
    width: 20,
    height: 40,
    vy: 0,
    isJumping: false,
    activePowerUp: null as string | null,
    powerUpTimer: 0,
    isCrouching: false,
  };

  let obstacles: any[] = [];
  let powerups: any[] = [];

  function playJumpSound() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        600,
        audioCtx.currentTime + 0.1,
      );

      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.currentTime + 0.1,
      );

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      // Ignore audio errors
    }
  }

  function playBgmNote() {
    try {
      if (!audioCtx || audioCtx.state !== "running") return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(
        bgmNotes[currentNoteIndex],
        audioCtx.currentTime,
      );

      gain.gain.setValueAtTime(0.015, audioCtx.currentTime); // Low volume
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);

      currentNoteIndex = (currentNoteIndex + 1) % bgmNotes.length;
    } catch (e) {}
  }

  function playStartSound() {
    try {
      if (!audioCtx)
        audioCtx = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();

      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        800,
        audioCtx.currentTime + 0.3,
      );

      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {}
  }

  function playGameOverSound() {
    try {
      if (!audioCtx)
        audioCtx = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();

      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        50,
        audioCtx.currentTime + 0.5,
      );

      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {}
  }
  
  function playGunshotSound() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
      
      const bufferSize = audioCtx.sampleRate * 0.5; 
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
      }
      
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1000;
      
      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      
      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      noise.start();
    } catch(e) {}
  }

  function playScoreSound() {
    try {
      if (!audioCtx)
        audioCtx = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();

      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
      oscillator.frequency.setValueAtTime(1760, audioCtx.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.2);
    } catch (e) {}
  }

  function playPowerUpSound() {
    try {
      if (!audioCtx)
        audioCtx = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();

      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
      oscillator.frequency.setValueAtTime(600, audioCtx.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime + 0.2);

      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {}
  }

  function jump() {
    if (!gameStarted) {
      gameStarted = true;
      resetGame();
      playStartSound();
      return;
    }
    if (!dino.isJumping && !isGameOver) {
      dino.vy = JUMP_POWER;
      dino.isJumping = true;
      playJumpSound();
    } else if (isGameOver) {
      resetGame();
    }
  }

  function handleInput(e: KeyboardEvent) {
    if (gameStarted && !isGameOver && e.key.length === 1) {
      cheatBuffer += e.key.toLowerCase();
      if (cheatBuffer.length > 20) cheatBuffer = cheatBuffer.slice(-20);
      
      if (cheatBuffer.endsWith("juantampan")) {
        dino.activePowerUp = "JUAN";
        dino.powerUpTimer = 20000;
        playPowerUpSound();
        cheatBuffer = "";
      } else if (cheatBuffer.endsWith("embege")) {
        score += 100;
        playScoreSound();
        cheatBuffer = "";
      } else if (cheatBuffer.endsWith("emo")) {
        isGameOver = true;
        playGunshotSound();
        if (score > highScore) {
          highScore = score;
          localStorage.setItem("dinoHighScore", Math.floor(highScore).toString());
        }
        cheatBuffer = "";
      }
    }

    if (e.code === "Space" || e.code === "ArrowUp") {
      e.preventDefault();
      if (dino.isCrouching) dino.isCrouching = false;
      jump();
    } else if (e.code === "ArrowDown" && gameStarted) {
      e.preventDefault(); // Prevent page scrolling
      if (!dino.isJumping) {
        dino.isCrouching = true;
      } else {
        dino.vy += 5; // Fast fall
      }
    }
  }

  function handleKeyUp(e: KeyboardEvent) {
    if (e.code === "ArrowDown") {
      dino.isCrouching = false;
    } else if (e.code === "Space" || e.code === "ArrowUp") {
      if (dino.isJumping && dino.vy < 0) {
        dino.vy /= 2; // Cut upward momentum early for variable jump height
      }
    }
  }

  function initGame() {
    dino.y = canvas.height - dino.height;
    dino.vy = 0;
    dino.isJumping = false;
    dino.activePowerUp = null;
    dino.powerUpTimer = 0;
    obstacles = [];
    powerups = [];
    score = 0;
    level = 1;
    lastLevel = 1;
    GAME_SPEED = 5; // Reset speed
    OBSTACLE_SPAWN_RATE = 1500;
    isGameOver = false;
    lastTime = performance.now();
    obstacleTimer = 0;
    powerupSpawnTimer = 0;
    bgmTimer = 0;
    currentNoteIndex = 0;
  }

  function resetGame() {
    initGame();
    gameStarted = true;
    gameLoop(performance.now());
  }

  function drawDino() {
    if (dino.activePowerUp === "SPEED") ctx.fillStyle = "#facc15";
    else if (dino.activePowerUp === "GHOST") ctx.fillStyle = "#c084fc";
    else if (dino.activePowerUp === "FLY") ctx.fillStyle = "#38bdf8";
    else if (dino.activePowerUp === "JUAN") ctx.fillStyle = "#ec4899";
    else ctx.fillStyle = "#10b981"; // emerald-500

    if (dino.activePowerUp === "GHOST") {
      ctx.globalAlpha = 0.5; // Ghostly effect
    }

    // Dino body
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    // Head / hair detail
    ctx.fillStyle = "#18181b";
    ctx.beginPath();
    ctx.arc(dino.x + 4, dino.y, 4, 0, Math.PI * 2);
    ctx.arc(dino.x + 10, dino.y - 2, 5, 0, Math.PI * 2);
    ctx.arc(dino.x + 16, dino.y, 4, 0, Math.PI * 2);
    ctx.fill();

    // Eye
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(dino.x + 12, dino.y + 6, 4, 4);

    ctx.globalAlpha = 1.0; // Reset alpha

    // PowerUp Timer Bar if active
    if (dino.activePowerUp) {
      ctx.fillStyle =
        dino.activePowerUp === "SPEED"
          ? "#facc15"
          : dino.activePowerUp === "GHOST"
            ? "#c084fc"
            : dino.activePowerUp === "FLY"
              ? "#38bdf8"
              : "#ec4899";
      let barWidth = (dino.powerUpTimer / 5000) * dino.width;
      ctx.fillRect(dino.x, dino.y - 8, barWidth, 4);
    }
  }

  function drawObstacles() {
    for (let obs of obstacles) {
      if (obs.isFlying) {
        ctx.fillStyle = "#f43f5e"; // rose-500 for drones
      } else {
        ctx.fillStyle = "#71717a"; // zinc-500
      }
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

      // Eye for flying drone
      if (obs.isFlying) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(obs.x + 4, obs.y + 4, 4, 4);
      }
    }
  }

  function drawPowerups() {
    for (let pu of powerups) {
      if (pu.type === "SPEED") ctx.fillStyle = "#facc15"; // yellow-400
      else if (pu.type === "GHOST") ctx.fillStyle = "#c084fc"; // purple-400
      else if (pu.type === "FLY") ctx.fillStyle = "#38bdf8"; // sky-400

      ctx.fillRect(pu.x, pu.y, pu.width, pu.height);

      // Glowing center
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(pu.x + 4, pu.y + 4, pu.width - 8, pu.height - 8);
    }
  }

  function checkCollision(obs: any) {
    return (
      dino.x < obs.x + obs.width &&
      dino.x + dino.width > obs.x &&
      dino.y < obs.y + obs.height &&
      dino.y + dino.height > obs.y
    );
  }

  function update(dt: number) {
    if (!gameStarted || isGameOver) return;

    // Handle crouching dimensions
    if (dino.isCrouching && !dino.isJumping) {
      dino.height = 20;
      dino.width = 40;
    } else {
      dino.height = 40;
      dino.width = 20;
    }

    // Play BGM
    bgmTimer += dt;
    if (bgmTimer > BGM_INTERVAL) {
      bgmTimer -= BGM_INTERVAL;
      playBgmNote();
    }

    // PowerUp timer
    if (dino.activePowerUp) {
      dino.powerUpTimer -= dt;
      if (dino.powerUpTimer <= 0) {
        dino.activePowerUp = null;
        dino.powerUpTimer = 0;
      }
    }

    // Physics
    if (dino.activePowerUp === "FLY") {
      dino.vy = 0;
      dino.y = 50; // Lock in the air
      dino.isJumping = true; // prevent normal jumping
    } else {
      dino.vy += GRAVITY;
      dino.y += dino.vy;

      // Floor collision
      if (dino.y + dino.height > canvas.height) {
        dino.y = canvas.height - dino.height;
        dino.vy = 0;
        dino.isJumping = false;
      }
    }

    // Leveling mechanics
    level = Math.floor(score / 200) + 1;
    if (level > lastLevel) {
      playScoreSound(); // Play level up chime
      lastLevel = level;
    }

    // Scale difficulty
    GAME_SPEED = 5 + level * 0.8;
    OBSTACLE_SPAWN_RATE = Math.max(600, 1500 - level * 150);

    let speedMultiplier =
      dino.activePowerUp === "SPEED"
        ? 2
        : dino.activePowerUp === "FLY"
          ? 1.5
          : dino.activePowerUp === "JUAN"
            ? 15
            : 1;
    let currentSpeed = GAME_SPEED * speedMultiplier;

    // Obstacles
    obstacleTimer += dt;
    if (obstacleTimer > OBSTACLE_SPAWN_RATE) {
      let spawnCount = 1;

      // Level 4+ allows clusters (double spawn)
      if (level >= 4 && Math.random() > 0.6) {
        spawnCount = 2;
      }

      for (let s = 0; s < spawnCount; s++) {
        let isWide = false;
        let isDoubleTall = false;
        let isFlying = false;

        let r = Math.random();
        if (level >= 3 && r > 0.7) {
          isFlying = true;
        } else if (level >= 2 && r > 0.4 && r <= 0.7) {
          isDoubleTall = true;
        } else if (r > 0.2) {
          isWide = true;
        }

        const width = isWide ? 40 : 20;
        let height = isWide ? 20 : 40;
        if (isDoubleTall) height = 65; // Very tall
        if (isFlying) height = 15;

        // Flying obstacles sit at head height
        let yPos = canvas.height - height;
        if (isFlying) yPos = canvas.height - 65;

        let spawnX = canvas.width + s * (width + 60);

        obstacles.push({
          x: spawnX,
          y: yPos,
          width: width,
          height: height,
          isFlying: isFlying,
        });
      }

      obstacleTimer = Math.random() * -400;
    }

    // Powerups spawn
    powerupSpawnTimer += dt;
    if (powerupSpawnTimer > POWERUP_SPAWN_RATE) {
      const types = ["SPEED", "GHOST", "FLY"];
      const type = types[Math.floor(Math.random() * types.length)];
      powerups.push({
        x: canvas.width,
        y: canvas.height - 40 - Math.random() * 60,
        width: 15,
        height: 15,
        type: type,
      });
      powerupSpawnTimer = Math.random() * -5000;
    }

    for (let i = powerups.length - 1; i >= 0; i--) {
      let pu = powerups[i];
      pu.x -= currentSpeed;

      if (checkCollision(pu)) {
        dino.activePowerUp = pu.type;
        dino.powerUpTimer = 5000;
        playPowerUpSound();
        powerups.splice(i, 1);
        continue;
      }

      if (pu.x + pu.width < 0) {
        powerups.splice(i, 1);
      }
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      let obs = obstacles[i];
      obs.x -= currentSpeed;

      if (dino.activePowerUp !== "GHOST" && dino.activePowerUp !== "FLY" && dino.activePowerUp !== "JUAN") {
        if (checkCollision(obs)) {
          if (!isGameOver) {
            isGameOver = true;
            playGameOverSound();
            if (score > highScore) {
              highScore = score;
              localStorage.setItem("dinoHighScore", Math.floor(highScore).toString());
            }
          }
        }
      }

      if (obs.x + obs.width < 0) {
        obstacles.splice(i, 1);
        score += 10 * speedMultiplier;
      }
    }

    score += dt * 0.01 * speedMultiplier; // Passive score
  }

  function draw() {
    // Clear canvas
    ctx.fillStyle = "#09090b"; // dark zinc-950
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground line
    ctx.strokeStyle = "#27272a"; // zinc-800
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 1);
    ctx.lineTo(canvas.width, canvas.height - 1);
    ctx.stroke();

    drawDino();
    drawPowerups();
    drawObstacles();

    // In-Canvas Score display
    ctx.fillStyle = "#a1a1aa"; // zinc-400
    ctx.font = "14px 'GeistMono-Variable', monospace";
    ctx.textAlign = "right";
    let scoreText = `SCORE: ${Math.floor(score).toString().padStart(5, "0")}`;
    if (highScore > 0) {
      scoreText = `HI: ${Math.floor(highScore).toString().padStart(5, "0")}  ` + scoreText;
    }
    ctx.fillText(scoreText, canvas.width - 20, 26);
    ctx.textAlign = "left"; // reset

    if (!gameStarted) {
      ctx.fillStyle = "#10b981"; // emerald-500
      ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        "KIBO RUNNER",
        canvas.width / 2,
        canvas.height / 2 - 12,
      );

      ctx.fillStyle = "#71717a"; // zinc-500
      ctx.font = "13px 'GeistMono-Variable', monospace";
      ctx.fillText(
        "Press SPACE or Tap to Start",
        canvas.width / 2,
        canvas.height / 2 + 20,
      );
      ctx.textAlign = "left"; // reset
    } else if (isGameOver) {
      ctx.fillStyle = "#f43f5e"; // rose-500
      ctx.font = "bold 22px 'Plus Jakarta Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        "GAME OVER",
        canvas.width / 2,
        canvas.height / 2 - 12,
      );

      ctx.fillStyle = "#a1a1aa";
      ctx.font = "13px 'GeistMono-Variable', monospace";
      ctx.fillText(
        "Press SPACE or Tap to Retry",
        canvas.width / 2,
        canvas.height / 2 + 20,
      );
      ctx.textAlign = "left"; // reset
    }
  }

  function gameLoop(time: number) {
    const dt = time - lastTime;
    lastTime = time;

    if (dt > 100) {
      update(16);
    } else {
      update(dt);
    }

    draw();

    if (!isGameOver) {
      animationId = requestAnimationFrame(gameLoop);
    } else {
      draw();
    }
  }

  onMount(() => {
    const savedScore = localStorage.getItem("dinoHighScore");
    if (savedScore) highScore = parseInt(savedScore, 10);
    
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = 600;
    canvas.height = 200;

    initGame();
    draw();

    window.addEventListener("keydown", handleInput);
    window.addEventListener("keyup", handleKeyUp);
  });

  function handleTouchStart(e: TouchEvent) {
    touchStartY = e.touches[0].clientY;
  }

  function handleTouchEnd(e: TouchEvent) {
    const touchEndY = e.changedTouches[0].clientY;
    const diffY = touchEndY - touchStartY;

    if (diffY > 40) {
      // Swipe down → crouch or fast fall
      if (gameStarted && !isGameOver) {
        if (!dino.isJumping) {
          dino.isCrouching = true;
          setTimeout(() => { dino.isCrouching = false; }, 500);
        } else {
          dino.vy += 5;
        }
      }
    } else {
      // Tap → jump
      jump();
    }
  }

  onDestroy(() => {
    window.removeEventListener("keydown", handleInput);
    window.removeEventListener("keyup", handleKeyUp);
    if (animationId) cancelAnimationFrame(animationId);
  });
</script>

<div class="w-full max-w-4xl mx-auto flex flex-col items-center justify-center pt-8 sm:pt-14 pb-16 px-4 gap-4 min-h-[85vh]">
  
  <!-- Top Navigation & Return Link -->
  <div class="w-full flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800/80">
    <button
      type="button"
      on:click={() => dispatch("back")}
      class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
    >
      <span>← Back to Games</span>
    </button>

    <div class="flex items-center gap-3 text-xs font-mono">
      <span class="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
        LEVEL {level}
      </span>
      <span class="text-zinc-500">Kibo Run</span>
    </div>
  </div>

  <!-- Tactile Arcade Console Frame -->
  <div class="w-full p-3 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-xs dark:shadow-none space-y-3">
    
    <!-- Header HUD stats -->
    <div class="flex items-center justify-between px-2 text-xs font-mono text-zinc-500">
      <div class="flex items-center gap-3">
        <span>STATUS: <strong class="{isGameOver ? 'text-rose-500 font-bold' : gameStarted ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-zinc-400'}">{isGameOver ? 'GAME OVER' : gameStarted ? 'RUNNING' : 'STANDBY'}</strong></span>
        {#if dino.activePowerUp}
          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
            PWR: {dino.activePowerUp} ({Math.ceil(dino.powerUpTimer / 1000)}s)
          </span>
        {/if}
      </div>

      <div class="flex items-center gap-3">
        <span>HI: <strong class="text-zinc-900 dark:text-zinc-200">{Math.floor(highScore)}</strong></span>
        <span>SCORE: <strong class="text-zinc-950 dark:text-white font-bold">{Math.floor(score)}</strong></span>
      </div>
    </div>

    <!-- Canvas Screen -->
    <div
      class="relative w-full border border-zinc-300 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 shadow-inner cursor-pointer focus:outline-none select-none touch-none"
      on:click={jump}
      on:touchstart={handleTouchStart}
      on:touchend={handleTouchEnd}
      on:contextmenu|preventDefault
      on:keydown={(e) => e.key === "Enter" && jump()}
      role="button"
      tabindex="0"
      aria-label="Kibo Run Game Area. Press Space or Tap to Jump, Down Arrow to Crouch"
    >
      <canvas
        bind:this={canvas}
        class="w-full h-full bg-zinc-950 block"
        style="aspect-ratio: 3/1;"
      ></canvas>
    </div>
  </div>

  <!-- Control Hints / Keycaps -->
  <div class="w-full flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-500 pt-2">
    <div class="inline-flex items-center gap-1.5">
      <kbd class="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-[11px]">SPACE</kbd>
      <span>or</span>
      <kbd class="px-1.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-[11px]">▲</kbd>
      <span>Jump</span>
    </div>

    <span class="text-zinc-300 dark:text-zinc-700">•</span>

    <div class="inline-flex items-center gap-1.5">
      <kbd class="px-1.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-[11px]">▼</kbd>
      <span>Crouch</span>
    </div>

    <span class="text-zinc-300 dark:text-zinc-700 hidden sm:inline">•</span>

    <div class="hidden sm:inline-flex items-center gap-1">
      <span>Mobile: Tap to Jump · Swipe Down to Crouch</span>
    </div>
  </div>
</div>
