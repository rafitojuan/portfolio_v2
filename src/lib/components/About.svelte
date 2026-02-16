<script>
  import { onMount } from 'svelte';

  let contributionWeeks = [];
  let loading = true;
  let totalContributions = 0;
  
  function getColor(level) {
    switch(level) {
      case 0: return 'bg-zinc-900';
      case 1: return 'bg-green-900';
      case 2: return 'bg-green-700';
      case 3: return 'bg-green-500';
      case 4: return 'bg-green-400';
      default: return 'bg-zinc-900';
    }
  }

  onMount(async () => {
    try {
      const response = await fetch('https://github-contributions-api.jogruber.de/v4/rafitojuan?y=last');
      const data = await response.json();
      
      if (data && data.contributions) {
        const allDays = data.contributions;
        const daysToShow = 52 * 7;
        const recentDays = allDays.slice(-daysToShow);
        
        const weeks = [];
        for (let i = 0; i < recentDays.length; i += 7) {
          weeks.push(recentDays.slice(i, i + 7));
        }
        contributionWeeks = weeks;
        
        if (data.total && data.total.lastYear) {
            totalContributions = data.total.lastYear;
        } else {
            totalContributions = recentDays.reduce((acc, day) => acc + day.count, 0);
        }
      }
    } catch (error) {
      console.error('Failed to fetch GitHub contributions:', error);
    } finally {
      loading = false;
    }
  });

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
</script>

<section id="about" class="pb-12 border-b border-zinc-900/50">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-900/50 h-full">
    <h2 class="text-xl font-bold text-white mb-6">About</h2>
    
    <div class="prose prose-invert prose-zinc max-w-none text-zinc-400 mb-8">
      <p>
        Fullstack Developer with 4+ years of experience. Started coding at age 14; known for clean architecture and attention to detail.
      </p>
      <p>
        Expertise in MERN stack, Next.js, NestJS, React Native, Electron, and 3D technologies; building scalable web, mobile, desktop, and immersive 3D applications.
      </p>
      <p>
        Now at 18 years old, what some view as a limitation, I see as my greatest advantage—starting early gave me the freedom to learn, experiment and build a strong foundation.
      </p>
      <p>
        Creator of ShopFlow: modern SaaS shop management system. Passionate about exploring new technologies and turning ideas into reality through polished, production-ready projects.
      </p>
    </div>

    <div class="bg-zinc-900/30 p-4 rounded-xl border border-zinc-800 overflow-x-auto">
      <div class="min-w-[600px]">
        <div class="flex justify-between items-end mb-4">
           <div class="flex flex-col">
              <span class="text-xs text-zinc-500">Contributions in the last year</span>
              <span class="text-white font-bold">{loading ? '...' : totalContributions} total</span>
           </div>
           <div class="flex gap-8 text-xs text-zinc-500 font-mono">
              {#each months as month}
                <span>{month}</span>
              {/each}
           </div>
        </div>
        
        {#if loading}
            <div class="flex gap-1 h-[100px] animate-pulse">
                {#each Array(52) as _}
                    <div class="flex flex-col gap-1 flex-1">
                        {#each Array(7) as _}
                            <div class="w-full aspect-square rounded-sm bg-zinc-800"></div>
                        {/each}
                    </div>
                {/each}
            </div>
        {:else}
            <div class="flex gap-1 h-[100px]">
              {#each contributionWeeks as week}
                <div class="flex flex-col gap-1 flex-1">
                  {#each week as day}
                    <div 
                        class="w-full aspect-square rounded-sm {getColor(day.level)}"
                        title="{day.count} contributions on {day.date}"
                    ></div>
                  {/each}
                </div>
              {/each}
            </div>
        {/if}

        <div class="flex justify-end items-center gap-2 mt-4 text-xs text-zinc-500">
          <span>Less</span>
          <div class="w-3 h-3 bg-zinc-900 rounded-sm"></div>
          <div class="w-3 h-3 bg-green-900 rounded-sm"></div>
          <div class="w-3 h-3 bg-green-700 rounded-sm"></div>
          <div class="w-3 h-3 bg-green-500 rounded-sm"></div>
          <div class="w-3 h-3 bg-green-400 rounded-sm"></div>
          <span>More</span>
        </div>
      </div>
    </div>
  </div>
</section>
