<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  const dispatch = createEventDispatcher();
  let lines = [];
  let visible = true;
  let finalMessageShown = false;
  let faceFrame = 0;
  
  const faces = [
    "( ^_^ )",
    "( >_^ )"
  ];

  const bootLogs = [
    { text: "Initializing kernel...", delay: 200 },
    { text: "Loading modules: [ OK ]", delay: 150 },
    { text: "Mounting filesystems: [ OK ]", delay: 150 },
    { text: "Checking memory integrity... 32GB OK", delay: 300 },
    { text: "Starting network interfaces... eth0 up", delay: 200 },
    { text: "Establishing secure connection...", delay: 250 },
    { text: "Loading user profile: rafitojuan", delay: 200 },
    { text: "Fetching project data...", delay: 250 },
    { text: "Compiling assets...", delay: 150 },
    { text: "System ready.", delay: 300 }
  ];

  onMount(async () => {
    for (const log of bootLogs) {
      await new Promise(r => setTimeout(r, log.delay));
      lines = [...lines, log];
      
      const container = document.getElementById('boot-sequence');
      if (container) container.scrollTop = container.scrollHeight;
    }

    await new Promise(r => setTimeout(r, 500));
    finalMessageShown = true;
    
    const interval = setInterval(() => {
      faceFrame = (faceFrame + 1) % faces.length;
    }, 1000);

    await new Promise(r => setTimeout(r, 2500));
    clearInterval(interval);
    visible = false;
    setTimeout(() => {
      dispatch('complete');
    }, 500); 
  });
</script>

{#if visible}
  <div 
    class="fixed inset-0 z-100 bg-zinc-950 flex flex-col items-center justify-center p-4 font-mono text-sm sm:text-base select-none cursor-wait"
    out:fade={{ duration: 500 }}
  >
    {#if !finalMessageShown}
      <div id="boot-sequence" class="w-full max-w-2xl h-64 overflow-hidden flex flex-col justify-end text-zinc-500 gap-1">
        {#each lines as line, i}
          <div class="flex items-center gap-2">
            <span class="text-zinc-700">[{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
            <span>> {line.text}</span>
          </div>
        {/each}
        <div class="animate-pulse text-zinc-500">_</div>
      </div>
    {:else}
      <div class="flex flex-col items-center gap-8" in:fly={{ y: 20, duration: 500 }}>
        <pre class="font-mono text-4xl text-white leading-none whitespace-pre glitch" data-text={faces[faceFrame]}>{faces[faceFrame]}</pre>
        <div class="flex flex-col items-center gap-2">
          <h1 class="text-2xl font-bold text-white tracking-widest uppercase glitch" data-text="Beta portfolio now online">
            Beta portfolio now online
          </h1>
          <div class="text-zinc-500 text-xs animate-pulse">
            Pressing any key to continue... (auto)
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .glitch {
    position: relative;
    color: white;
  }
  
  .glitch::before,
  .glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .glitch::before {
    left: 2px;
    text-shadow: -1px 0 #ff00c1;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 5s infinite linear alternate-reverse;
  }
  
  .glitch::after {
    left: -2px;
    text-shadow: -1px 0 #00fff9;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim2 5s infinite linear alternate-reverse;
  }
  
  @keyframes glitch-anim {
    0% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.5deg); }
    5% { clip: rect(12px, 9999px, 5px, 0); transform: skew(0.5deg); }
    10% { clip: rect(65px, 9999px, 86px, 0); transform: skew(0.5deg); }
    15% { clip: rect(24px, 9999px, 12px, 0); transform: skew(0.5deg); }
    20% { clip: rect(98px, 9999px, 86px, 0); transform: skew(0.5deg); }
    25% { clip: rect(12px, 9999px, 5px, 0); transform: skew(0.5deg); }
    30% { clip: rect(65px, 9999px, 86px, 0); transform: skew(0.5deg); }
    35% { clip: rect(24px, 9999px, 12px, 0); transform: skew(0.5deg); }
    40% { clip: rect(98px, 9999px, 86px, 0); transform: skew(0.5deg); }
    45% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.5deg); }
    50% { clip: rect(12px, 9999px, 5px, 0); transform: skew(0.5deg); }
    55% { clip: rect(65px, 9999px, 86px, 0); transform: skew(0.5deg); }
    60% { clip: rect(24px, 9999px, 12px, 0); transform: skew(0.5deg); }
    65% { clip: rect(98px, 9999px, 86px, 0); transform: skew(0.5deg); }
    70% { clip: rect(12px, 9999px, 5px, 0); transform: skew(0.5deg); }
    75% { clip: rect(65px, 9999px, 86px, 0); transform: skew(0.5deg); }
    80% { clip: rect(24px, 9999px, 12px, 0); transform: skew(0.5deg); }
    85% { clip: rect(98px, 9999px, 86px, 0); transform: skew(0.5deg); }
    90% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.5deg); }
    95% { clip: rect(12px, 9999px, 5px, 0); transform: skew(0.5deg); }
    100% { clip: rect(65px, 9999px, 86px, 0); transform: skew(0.5deg); }
  }
  
  @keyframes glitch-anim2 {
    0% { clip: rect(12px, 9999px, 5px, 0); transform: skew(0.5deg); }
    5% { clip: rect(65px, 9999px, 86px, 0); transform: skew(0.5deg); }
    10% { clip: rect(24px, 9999px, 12px, 0); transform: skew(0.5deg); }
    15% { clip: rect(98px, 9999px, 86px, 0); transform: skew(0.5deg); }
    20% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.5deg); }
    25% { clip: rect(12px, 9999px, 5px, 0); transform: skew(0.5deg); }
    30% { clip: rect(65px, 9999px, 86px, 0); transform: skew(0.5deg); }
    35% { clip: rect(24px, 9999px, 12px, 0); transform: skew(0.5deg); }
    40% { clip: rect(98px, 9999px, 86px, 0); transform: skew(0.5deg); }
    45% { clip: rect(12px, 9999px, 5px, 0); transform: skew(0.5deg); }
    50% { clip: rect(65px, 9999px, 86px, 0); transform: skew(0.5deg); }
    55% { clip: rect(24px, 9999px, 12px, 0); transform: skew(0.5deg); }
    60% { clip: rect(98px, 9999px, 86px, 0); transform: skew(0.5deg); }
    65% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.5deg); }
    70% { clip: rect(12px, 9999px, 5px, 0); transform: skew(0.5deg); }
    75% { clip: rect(65px, 9999px, 86px, 0); transform: skew(0.5deg); }
    80% { clip: rect(24px, 9999px, 12px, 0); transform: skew(0.5deg); }
    85% { clip: rect(98px, 9999px, 86px, 0); transform: skew(0.5deg); }
    90% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.5deg); }
    95% { clip: rect(12px, 9999px, 5px, 0); transform: skew(0.5deg); }
    100% { clip: rect(65px, 9999px, 86px, 0); transform: skew(0.5deg); }
  }
</style>
