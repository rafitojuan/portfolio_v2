<script>
  import { slide } from 'svelte/transition';

  let educations = [
    {
      institution: 'Universitas Terbuka (State University)',
      period: '2025 - Present',
      degree: "Bachelor's Degree in Information Systems",
      badge: 'Active Candidate',
      description: [
        'Current Academic Standing: 3.65 SGPA',
        'Demonstrating rigorous time management, independent study, and balancing remote engineering contracts with academic commitments.',
        'Focus areas: Distributed System Analysis, Database Management, and Enterprise Software Engineering.'
      ],
      tags: ['Software Engineering', 'System Analysis', 'Database Architecture'],
      isOpen: true
    },
    {
      institution: 'SMKN 12 Jakarta (Vocational High School)',
      period: '2021 - 2024',
      degree: 'Vocational Diploma — Software Engineering Concentration',
      badge: 'Graduate',
      description: [
        'Specialized in Software Engineering with an emphasis on fullstack web development, mobile apps, and network maintenance.',
        'Winner of SATUASA Student Award for Best Project Innovation & Realization.',
        'National Winner of FLS2N (Short Film Competition), cultivating visual narrative and interface design intuition.'
      ],
      tags: ['Laravel', 'Flutter', 'PHP', 'JavaScript', 'MySQL', 'Hardware & Networks'],
      isOpen: true
    }
  ];

  function toggle(index) {
    educations[index].isOpen = !educations[index].isOpen;
    educations = educations;
  }
</script>

<section id="education" class="py-12 border-b border-zinc-200 dark:border-zinc-900/50 scroll-mt-14">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-200 dark:border-zinc-900/50 h-full">
    
    <!-- Section Header -->
    <div class="flex items-baseline justify-between mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800/80">
      <div class="flex items-center gap-3">
        <span class="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500">05 /</span>
        <h2 class="text-xl sm:text-2xl font-bold font-display tracking-tight text-zinc-950 dark:text-white">
          Academic Background
        </h2>
      </div>
      <span class="text-xs font-mono text-zinc-500">Education</span>
    </div>
    
    <div class="space-y-4">
      {#each educations as edu, i}
        <div class="group relative border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs dark:shadow-none transition-all">
          <button 
            type="button"
            class="w-full flex items-start justify-between p-5 sm:p-6 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600"
            on:click={() => toggle(i)}
            aria-expanded={edu.isOpen}
            aria-controls={"edu-content-" + i}
          >
            <div class="flex gap-4">
              <div class="mt-0.5 p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-zinc-200 transition-colors shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-bold font-display text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors text-base sm:text-lg">
                    {edu.institution}
                  </h3>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    {edu.badge}
                  </span>
                </div>
                <div class="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-1">{edu.degree}</div>
                <div class="text-xs text-zinc-500 font-mono mt-0.5">{edu.period}</div>
              </div>
            </div>

            <div class={`p-1.5 rounded-lg text-zinc-400 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-300 transition-transform duration-200 ${edu.isOpen ? 'rotate-180' : ''}`} aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </button>

          {#if edu.isOpen}
            <div id={"edu-content-" + i} transition:slide={{ duration: 200, axis: 'y' }} class="px-5 sm:px-6 pb-6 pl-5 sm:pl-16">
              <ul class="space-y-2 mb-4">
                {#each edu.description as desc}
                  <li class="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0"></span>
                    <span>{desc}</span>
                  </li>
                {/each}
              </ul>

              <div class="flex flex-wrap gap-1.5">
                {#each edu.tags as tag}
                  <span class="px-2 py-0.5 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded">
                    {tag}
                  </span>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
