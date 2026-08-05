<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();
  let lines = [];
  let visible = true;
  let finalMessageShown = false;
  let progress = 0;
  let showAscii = false;
  
  let targetData = `
    ██████╗  █████╗ ███████╗██╗████████╗██████╗ 
    ██╔══██╗██╔══██╗██╔════╝██║╚══██╔══╝██╔══██╗
    ██████╔╝███████║█████╗  ██║   ██║   ██║  ██║
    ██╔══██╗██╔══██║██╔══╝  ██║   ██║   ██║  ██║
    ██║  ██║██║  ██║██║     ██║   ██║   ██████╔╝
    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝   ╚═╝   ╚═════╝ 
  `;

  const bootLogs = [
    { text: "INITIATING ctOS OVERRIDE...", delay: 100, color: "text-zinc-400" },
    { text: "BYPASSING SECURITY PROTOCOLS... [OK]", delay: 80, color: "text-cyan-400" },
    { text: "INJECTING PAYLOAD 0x8A7B9...", delay: 80, color: "text-zinc-400" },
    { text: "WARNING: UNAUTHORIZED ACCESS DETECTED", delay: 150, color: "text-red-500" },
    { text: "REROUTING TRACE... [SUCCESS]", delay: 80, color: "text-cyan-400" },
    { text: "DECRYPTING USER PROFILE: rafitojuan...", delay: 120, color: "text-zinc-400" },
    { text: "LOADING ASSETS...", delay: 80, color: "text-zinc-400" },
    { text: "SYSTEM COMPROMISED. FULL ACCESS GRANTED.", delay: 200, color: "text-fuchsia-500" }
  ];

  onMount(async () => {
    // Fetch target IP info for hacker aesthetic
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.ip) {
          targetData = `
    >>> TARGET ACQUIRED <<<
    IP  : ${data.ip}
    LOC : ${data.city || 'UNKNOWN'}, ${data.country_name || 'UNKNOWN'}
    ISP : ${data.org || 'UNKNOWN'}
    ASN : ${data.asn || 'UNKNOWN'}
          `;
        }
      })
      .catch(err => {
        // Fallback if adblocker or error blocks the request
        fetch('https://api.ipify.org?format=json')
          .then(res => res.json())
          .then(data => {
            if (data.ip) targetData = `\n    >>> TARGET ACQUIRED <<<\n    IP  : ${data.ip}\n          `;
          }).catch(() => {});
      });

    // Generate random hex lines for noise
    for (let i = 0; i < 15; i++) {
      const hexText = Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join(' ');
      lines = [...lines, { text: `[0x${Math.floor(Math.random()*9999).toString(16).padStart(4, '0')}] ${hexText} ...`, color: "text-zinc-700" }];
    }

    for (const log of bootLogs) {
      await new Promise(r => setTimeout(r, log.delay));
      lines = [...lines, log];
      
      const container = document.getElementById('boot-sequence');
      if (container) container.scrollTop = container.scrollHeight;
    }

    // Progress bar animation
    while (progress < 100) {
      await new Promise(r => setTimeout(r, 20));
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress > 100) progress = 100;
    }

    await new Promise(r => setTimeout(r, 300));
    finalMessageShown = true;
    showAscii = true;

    await new Promise(r => setTimeout(r, 2500));
    visible = false;
    setTimeout(() => {
      dispatch('complete');
    }, 500); 
  });
</script>

{#if visible}
  <div 
    class="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4 font-mono text-sm sm:text-base select-none cursor-wait overflow-hidden"
    out:fade={{ duration: 400 }}
  >
    <!-- CRT overlay lines -->
    <div class="pointer-events-none fixed inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
    
    {#if !finalMessageShown}
      <div id="boot-sequence" class="w-full max-w-3xl h-[70vh] overflow-hidden flex flex-col justify-end gap-1 pb-8">
        {#each lines as line}
          <div class="flex items-start gap-3 opacity-90">
            <span class="text-zinc-600 shrink-0">[{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 2 })}]</span>
            <span class={line.color}>{line.text}</span>
          </div>
        {/each}
        <div class="flex items-center gap-2 mt-4 text-cyan-400">
          <span>ROOTKIT_EXEC:</span>
          <div class="flex-1 border border-cyan-900 h-4 relative bg-zinc-950">
            <div class="absolute inset-y-0 left-0 bg-cyan-500 transition-all duration-75" style="width: {progress}%"></div>
          </div>
          <span class="w-12 text-right">{progress}%</span>
        </div>
      </div>
    {:else}
      <div class="flex flex-col items-center gap-6 z-20 w-full max-w-3xl">
        <pre class="font-mono text-xs sm:text-sm md:text-base text-cyan-400 leading-relaxed whitespace-pre glitch animate-pulse" data-text={targetData}>{targetData}</pre>
        
        <div class="flex flex-col items-center gap-3 w-full">
          <h1 class="text-3xl md:text-5xl font-black text-white tracking-[0.2em] uppercase glitch" data-text="ACCESS GRANTED">
            ACCESS GRANTED
          </h1>
          <div class="text-fuchsia-500 text-sm tracking-widest uppercase animate-pulse flex gap-4">
            <span>[ CONNECTING TO NETWORK ]</span>
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .glitch {
    position: relative;
    display: inline-block;
  }
  
  .glitch::before, .glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
  }
  
  .glitch::before {
    left: 2px;
    text-shadow: -2px 0 #ff00c1;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 5s infinite linear alternate-reverse;
  }
  
  .glitch::after {
    left: -2px;
    text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
    animation: glitch-anim2 1s infinite linear alternate-reverse;
  }

  @keyframes glitch-anim {
    0% { clip: rect(22px, 9999px, 83px, 0); transform: skew(0.5deg); }
    5% { clip: rect(62px, 9999px, 5px, 0); transform: skew(0.5deg); }
    10% { clip: rect(35px, 9999px, 36px, 0); transform: skew(0.5deg); }
    15% { clip: rect(24px, 9999px, 82px, 0); transform: skew(0.5deg); }
    20% { clip: rect(98px, 9999px, 26px, 0); transform: skew(0.5deg); }
    25% { clip: rect(12px, 9999px, 85px, 0); transform: skew(0.5deg); }
    30% { clip: rect(65px, 9999px, 36px, 0); transform: skew(0.5deg); }
    35% { clip: rect(24px, 9999px, 12px, 0); transform: skew(0.5deg); }
    40% { clip: rect(98px, 9999px, 76px, 0); transform: skew(0.5deg); }
    45% { clip: rect(42px, 9999px, 14px, 0); transform: skew(0.5deg); }
    50% { clip: rect(12px, 9999px, 35px, 0); transform: skew(0.5deg); }
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
    0% { clip: rect(65px, 9999px, 86px, 0); transform: skew(0.5deg); }
    5% { clip: rect(12px, 9999px, 5px, 0); transform: skew(0.5deg); }
    10% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.5deg); }
    15% { clip: rect(98px, 9999px, 86px, 0); transform: skew(0.5deg); }
    20% { clip: rect(24px, 9999px, 12px, 0); transform: skew(0.5deg); }
    25% { clip: rect(65px, 9999px, 86px, 0); transform: skew(0.5deg); }
    30% { clip: rect(12px, 9999px, 5px, 0); transform: skew(0.5deg); }
    35% { clip: rect(98px, 9999px, 86px, 0); transform: skew(0.5deg); }
    40% { clip: rect(24px, 9999px, 12px, 0); transform: skew(0.5deg); }
    45% { clip: rect(65px, 9999px, 86px, 0); transform: skew(0.5deg); }
    50% { clip: rect(12px, 9999px, 5px, 0); transform: skew(0.5deg); }
    55% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.5deg); }
    60% { clip: rect(98px, 9999px, 86px, 0); transform: skew(0.5deg); }
    65% { clip: rect(24px, 9999px, 12px, 0); transform: skew(0.5deg); }
    70% { clip: rect(65px, 9999px, 86px, 0); transform: skew(0.5deg); }
    75% { clip: rect(12px, 9999px, 5px, 0); transform: skew(0.5deg); }
    80% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.5deg); }
    85% { clip: rect(98px, 9999px, 86px, 0); transform: skew(0.5deg); }
    90% { clip: rect(24px, 9999px, 12px, 0); transform: skew(0.5deg); }
    95% { clip: rect(65px, 9999px, 86px, 0); transform: skew(0.5deg); }
    100% { clip: rect(12px, 9999px, 5px, 0); transform: skew(0.5deg); }
  }
</style>
