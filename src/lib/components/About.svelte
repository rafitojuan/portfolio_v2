<script>
  import { onMount } from 'svelte';

  let contributionWeeks = [];
  let loading = true;
  let totalContributions = 0;
  
  function getColor(level) {
    switch(level) {
      case 0: return 'bg-[#161b22]';
      case 1: return 'bg-[#0e4429]';
      case 2: return 'bg-[#006d32]';
      case 3: return 'bg-[#26a641]';
      case 4: return 'bg-[#39d353]';
      default: return 'bg-[#161b22]';
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


</script>

<section id="about" class="pb-12 border-b border-zinc-900/50">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-900/50 h-full">
    <h2 class="text-xl font-bold text-white mb-6">About</h2>
    
    <div class="prose prose-invert prose-zinc max-w-none text-zinc-400 mb-8">
      <section>
  <p>
    As a Software Engineer, I focus on building digital solutions that balance technical precision with a strong understanding of user needs. I currently oversee data management and IT infrastructure at 
    <strong>PT Energi Pelabuhan Indonesia (State-Owned Enterprise)</strong>, ensuring mission-critical systems run efficiently and reliably.
  </p>

  <p>
    Beyond my full-time role, I actively work in remote environments and have delivered 17 projects across web platforms (PWA, Next.js, Livewire), mobile applications (Flutter), and technical tools including data scraping, penetration testing, and load testing. My core stack includes Laravel, React, and Next.js, with an emphasis on scalable and maintainable architecture.
  </p>

  <h3>Professional Highlights</h3>
  <ul>
    <li><strong>SATUASA Student Award</strong> – Best Innovation & 3rd Place IT Product</li>
    <li><strong>TOEIC Score: 895</strong> – Professional Proficiency level for international collaboration</li>
    <li>
      Bachelor’s candidate at <strong>Universitas Terbuka</strong>, where distance learning has strengthened my time management, discipline, and ability to balance full-time work with remote projects.
    </li>
  </ul>

  <p>
    Although my primary focus is software development, winning a national short film competition (FLS2N) shaped my visual perspective, which contributes to designing intuitive and user-centered interfaces.
  </p>

  <p>
    I’m experienced in asynchronous collaboration and independent project ownership. If you’re seeking a disciplined and communicative developer who delivers impact remotely, I’d welcome the opportunity to connect.
  </p>
</section>

    </div>

    <div class="bg-zinc-900/30 p-4 rounded-xl border border-zinc-800 overflow-x-auto">
      <div class="min-w-max">
        <div class="flex justify-between items-end mb-2">
           <div class="flex flex-col mb-2">
              <span class="text-xs text-zinc-500">Contributions in the last year</span>
              <span class="text-white font-bold text-sm">{loading ? '...' : totalContributions} total</span>
           </div>
        </div>
        
        {#if !loading}
        <div class="flex gap-[3px] mb-2 text-[10px] text-zinc-500 h-4">
             {#each contributionWeeks as week, i}
                {@const date = new Date(week[0].date)}
                {@const month = date.toLocaleString('default', { month: 'short' })}
                {@const prevDate = i > 0 ? new Date(contributionWeeks[i-1][0].date) : null}
                {@const prevMonth = prevDate ? prevDate.toLocaleString('default', { month: 'short' }) : null}
                <div class="flex-1 w-[10px] relative overflow-visible">
                     {#if i === 0 || month !== prevMonth}
                         <span class="absolute top-0 left-0">{month}</span>
                     {/if}
                </div>
             {/each}
        </div>
        {/if}

        {#if loading}
            <div class="flex gap-[3px] h-[84px] animate-pulse">
                {#each Array(52) as _}
                    <div class="flex flex-col gap-[3px]">
                        {#each Array(7) as _}
                            <div class="w-[10px] h-[10px] rounded-[2px] bg-zinc-800"></div>
                        {/each}
                    </div>
                {/each}
            </div>
        {:else}
            <div class="flex gap-[3px]">
              {#each contributionWeeks as week}
                <div class="flex flex-col gap-[3px]">
                  {#each week as day}
                    <div 
                        class="w-[10px] h-[10px] rounded-[2px] {getColor(day.level)}"
                        title="{day.count} contributions on {day.date}"
                    ></div>
                  {/each}
                </div>
              {/each}
            </div>
        {/if}

        <div class="flex justify-end items-center gap-2 mt-4 text-[10px] text-zinc-500">
          <span>Less</span>
          <div class="w-[10px] h-[10px] rounded-[2px] bg-[#161b22]"></div>
          <div class="w-[10px] h-[10px] rounded-[2px] bg-[#0e4429]"></div>
          <div class="w-[10px] h-[10px] rounded-[2px] bg-[#006d32]"></div>
          <div class="w-[10px] h-[10px] rounded-[2px] bg-[#26a641]"></div>
          <div class="w-[10px] h-[10px] rounded-[2px] bg-[#39d353]"></div>
          <span>More</span>
        </div>
      </div>
    </div>
  </div>
</section>
