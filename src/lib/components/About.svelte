<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let contributionWeeks = [];
  let loading = true;
  let totalContributions = 0;
  let hoveredDay = null;
  let tooltipPosition = { x: 0, y: 0 };
  
  function getColor(level) {
    switch(level) {
      case 0: return 'bg-zinc-200/80 dark:bg-zinc-800/80';
      case 1: return 'bg-emerald-300 dark:bg-emerald-900';
      case 2: return 'bg-emerald-400 dark:bg-emerald-700';
      case 3: return 'bg-emerald-500 dark:bg-emerald-600';
      case 4: return 'bg-emerald-600 dark:bg-emerald-500';
      default: return 'bg-zinc-200/80 dark:bg-zinc-800/80';
    }
  }

  function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  }

  function handleMouseEnter(event, day) {
    const rect = event.target.getBoundingClientRect();
    tooltipPosition = {
      x: rect.left + rect.width / 2,
      y: rect.top - 8
    };
    hoveredDay = day;
  }

  function handleMouseLeave() {
    hoveredDay = null;
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

<section id="about" class="py-12 border-b border-zinc-200 dark:border-zinc-900/50 scroll-mt-14">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-200 dark:border-zinc-900/50 h-full">
    
    <!-- Section Header with Explicit Hallmark Indexing -->
    <div class="flex items-baseline justify-between mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800/80">
      <div class="flex items-center gap-3">
        <span class="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500">03 /</span>
        <h2 class="text-xl sm:text-2xl font-bold font-display tracking-tight text-zinc-950 dark:text-white">
          Background & Activity
        </h2>
      </div>
      <span class="text-xs font-mono text-zinc-500">Engineering Focus</span>
    </div>
    
    <!-- Narrative Prose -->
    <div class="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
      <p>
        As a Software Engineer, I focus on building digital solutions that balance technical precision with deep empathy for user workflows. I oversee data management and IT infrastructure at 
        <strong class="text-zinc-950 dark:text-white font-semibold">PT Energi Pelabuhan Indonesia (State-Owned Enterprise)</strong>, keeping mission-critical systems and port operations reliable.
      </p>

      <p>
        Across my engineering work, I have delivered over 17 projects spanning high-concurrency Laravel architectures, modern React/Next.js/Svelte client interfaces, Flutter mobile apps, and developer automation suites (data scraping, penetration testing, load testing).
      </p>

      <!-- Key Professional Highlights Bento Card -->
      <div class="p-4 sm:p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800 text-xs sm:text-sm my-6 space-y-2">
        <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Core Highlights
        </h3>
        <ul class="space-y-2 pl-1">
          <li class="flex items-start gap-2">
            <span class="text-emerald-600 dark:text-emerald-400 shrink-0 font-bold">✓</span>
            <span><strong class="text-zinc-900 dark:text-zinc-100 font-semibold">SATUASA Student Award:</strong> Best Innovation & 3rd Place IT Product.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-emerald-600 dark:text-emerald-400 shrink-0 font-bold">✓</span>
            <span><strong class="text-zinc-900 dark:text-zinc-100 font-semibold">TOEIC Score 895:</strong> Professional working proficiency for international teams.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-emerald-600 dark:text-emerald-400 shrink-0 font-bold">✓</span>
            <span><strong class="text-zinc-900 dark:text-zinc-100 font-semibold">Universitas Terbuka Candidate:</strong> Demonstrating rigorous independent discipline, self-direction, and remote productivity.</span>
          </li>
        </ul>
      </div>

      <p>
        My background also includes winning a national short film competition (FLS2N), which sharpens my eye for visual rhythm, spatial layout, and intuitive human-centered design.
      </p>
    </div>

    <!-- GitHub Contribution Activity Heatmap -->
    <div class="bg-white dark:bg-zinc-900/30 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-x-auto shadow-xs dark:shadow-none transition-colors">
      <div class="min-w-max">
        <div class="flex justify-between items-end mb-4">
          <div class="flex flex-col">
            <span class="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400">GitHub Contributions (Past Year)</span>
            <span class="text-zinc-950 dark:text-white font-bold font-display text-base">{loading ? 'Loading activity...' : `${totalContributions} Total Commits & Contributions`}</span>
          </div>
          <a href="https://github.com/rafitojuan" target="_blank" rel="noopener noreferrer" class="text-xs font-mono text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors">
            @rafitojuan ↗
          </a>
        </div>
        
        {#if !loading}
        <div class="flex gap-[3px] mb-2 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 h-4">
          {#each contributionWeeks as week, i}
            {@const date = new Date(week[0].date)}
            {@const month = date.toLocaleString('default', { month: 'short' })}
            {@const prevDate = i > 0 ? new Date(contributionWeeks[i-1][0].date) : null}
            {@const prevMonth = prevDate ? prevDate.toLocaleString('default', { month: 'short' }) : null}
            <div class="flex-1 w-2.5 relative overflow-visible">
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
                  <div class="w-2.5 h-2.5 rounded-[2px] bg-zinc-200 dark:bg-zinc-800"></div>
                {/each}
              </div>
            {/each}
          </div>
        {:else}
          <div class="flex gap-[3px]" role="region" aria-label="GitHub contribution graph">
            {#each contributionWeeks as week}
              <div class="flex flex-col gap-[3px]">
                {#each week as day}
                  <div 
                    role="img"
                    class="w-2.5 h-2.5 rounded-[2px] {getColor(day.level)} transition-colors cursor-pointer hover:ring-1 hover:ring-zinc-400 dark:hover:ring-zinc-500"
                    aria-label="{day.count} contributions on {day.date}"
                    on:mouseenter={(e) => handleMouseEnter(e, day)}
                    on:mouseleave={handleMouseLeave}
                  ></div>
                {/each}
              </div>
            {/each}
          </div>
        {/if}

        <div class="flex justify-end items-center gap-2 mt-4 text-[10px] font-mono text-zinc-500">
          <span>Less</span>
          <div class="w-2.5 h-2.5 rounded-[2px] bg-zinc-200/80 dark:bg-zinc-800/80" aria-hidden="true"></div>
          <div class="w-2.5 h-2.5 rounded-[2px] bg-emerald-300 dark:bg-emerald-900" aria-hidden="true"></div>
          <div class="w-2.5 h-2.5 rounded-[2px] bg-emerald-400 dark:bg-emerald-700" aria-hidden="true"></div>
          <div class="w-2.5 h-2.5 rounded-[2px] bg-emerald-500 dark:bg-emerald-600" aria-hidden="true"></div>
          <div class="w-2.5 h-2.5 rounded-[2px] bg-emerald-600 dark:bg-emerald-500" aria-hidden="true"></div>
          <span>More</span>
        </div>
      </div>
    </div>
  </div>

  {#if hoveredDay}
    <div 
      class="fixed z-50 bg-zinc-900 dark:bg-zinc-800 text-[11px] font-mono text-white px-2.5 py-1.5 rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full border border-zinc-700"
      style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px;"
      transition:fade={{ duration: 100 }}
    >
      <div class="whitespace-nowrap font-medium text-zinc-200">
        <strong class="text-white font-bold">{hoveredDay.count} commits</strong> on {formatDate(hoveredDay.date)}
      </div>
      <div 
        class="absolute left-1/2 bottom-0 w-2 h-2 bg-zinc-900 dark:bg-zinc-800 transform -translate-x-1/2 translate-y-1/2 rotate-45 border-r border-b border-zinc-700"
      ></div>
    </div>
  {/if}
</section>
