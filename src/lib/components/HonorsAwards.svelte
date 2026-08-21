<script>
  import { slide } from 'svelte/transition';

  let awards = [
    {
      title: 'Distinguished Graduate — 1st Position',
      position: 'Rank 1 / Valedictorian',
      date: '05.2024',
      scope: 'College / Vocational',
      attachment: 'https://drive.google.com/file/d/1zLCybuD4pkyuo4E5o0P0u5J_jnpQFOCW/view?usp=sharing',
      description: [
        'Graduated as the top student in Software Engineering with a score of 926/1000.',
        'Maintained first-place academic ranking across the entire curriculum.',
        'Recognized for exceptional software architecture and technical excellence.'
      ],
      isOpen: true
    },
    {
      title: 'Excellence IT Product Creation — SATUASA Award',
      position: '1st Place Winner',
      date: '10.2022',
      scope: 'National Student Competition',
      attachment: 'https://drive.google.com/file/d/16_nZ_WzzrrMIXb4wZjzjuty5O0q3la-J/view?usp=sharing',
      description: [
        'Developed an on-demand IT technician dispatch platform connecting end-users with verified hardware/software engineers.',
        'Secured first place at the prestigious SATUASA Student Award showcase.',
        'Delivered public technical presentation and live architecture demo.'
      ],
      isOpen: true
    },
    {
      title: 'Honorary Internship Performance Award',
      position: 'Grade A+ Distinction',
      date: '04.2023',
      scope: 'Institutional / Police Marine Corps',
      attachment: 'https://drive.google.com/file/d/1UhPsfWe5GxUdEKftbQPI9Z-cLhnEGWjU/view?usp=sharing',
      description: [
        'Engineered an automated face scanning attendance system with streamlined data management for Korpolairud.',
        'Maintained physical server clusters, IT assets, and secure network infrastructure.',
        'Provided rapid frontline technical diagnostic resolution.'
      ],
      isOpen: true
    },
    {
      title: 'Senior Non-Brass Ensemble Competition',
      position: '3rd Place',
      date: '10.2022',
      scope: 'Arts & Performance',
      attachment: 'https://drive.google.com/file/d/1jw6gb_dJ-WxsbTV9lmJoW_jRRgvalOej/view?usp=sharing',
      description: [
        'Demonstrated disciplined collaboration, precision timing, and artistic performance under high-pressure competitive environments.'
      ],
      isOpen: false
    }
  ];

  function toggle(index) {
    awards = awards.map((award, i) => {
      if (i === index) {
        return { ...award, isOpen: !award.isOpen };
      }
      return award;
    });
  }
</script>

<section id="honors" class="py-12 border-b border-zinc-200 dark:border-zinc-900/50 scroll-mt-14">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-200 dark:border-zinc-900/50 h-full">
    
    <!-- Section Header -->
    <div class="flex items-baseline justify-between mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800/80">
      <div class="flex items-center gap-3">
        <span class="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500">06 /</span>
        <h2 class="text-xl sm:text-2xl font-bold font-display tracking-tight text-zinc-950 dark:text-white">
          Honors & Recognition
        </h2>
      </div>
      <span class="text-xs font-mono text-zinc-500">({awards.length} Awards)</span>
    </div>
    
    <div class="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/20 shadow-xs dark:shadow-none divide-y divide-zinc-200 dark:divide-zinc-800">
      {#each awards as award, i}
        <div class="group transition-colors">
          <div class="flex items-start justify-between p-5 sm:p-6 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition-colors">
            <button 
              type="button"
              class="flex-1 flex gap-4 items-start text-left cursor-pointer focus:outline-none"
              on:click={() => toggle(i)}
              aria-expanded={award.isOpen}
              aria-controls={"award-desc-" + i}
            >
              <div class="mt-0.5 w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0 group-hover:border-zinc-300 dark:group-hover:border-zinc-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/>
                  <path d="M11 12 5.12 2.2"/>
                  <path d="m13 12 5.88-9.8"/>
                  <circle cx="12" cy="17" r="5"/>
                </svg>
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="font-bold font-display text-zinc-900 dark:text-white text-base">
                    {award.title}
                  </h3>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    {award.position}
                  </span>
                </div>
                <div class="text-xs text-zinc-500 font-mono mt-1">
                  {award.scope} · {award.date}
                </div>
              </div>
            </button>

            <div class="flex items-center gap-3 ml-2">
              {#if award.attachment}
                <a
                  href={award.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  title="View Certificate"
                >
                  <span>Doc</span>
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              {/if}

              <button
                type="button"
                on:click={() => toggle(i)}
                class={`p-1 text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-transform duration-200 cursor-pointer ${award.isOpen ? 'rotate-180' : ''}`}
                aria-label="Toggle award details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
            </div>
          </div>

          {#if award.isOpen}
            <div id={"award-desc-" + i} transition:slide={{ duration: 180, axis: 'y' }} class="px-5 sm:px-6 pb-5 pl-5 sm:pl-20">
              <ul class="space-y-1.5 mb-3">
                {#each award.description as desc}
                  <li class="flex items-start gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0"></span>
                    <span>{desc}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
