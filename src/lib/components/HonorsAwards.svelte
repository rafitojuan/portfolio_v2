<script>
  import { slide } from 'svelte/transition';

  let awards = [
    {
      title: 'HydThon AI Hackathon 2026 (Trophy)',
      position: 'Winner',
      date: '02.2026',
      scope: 'Institutional',
      attachment: '#',
      description: [
        'Won 1st place at HydThon AI Hackathon 2026 in Hyderabad',
        'Organized by INTRAPRENEUR in collaboration with Net2Apps, aligned with the HISHA Vision',
        'Recognized for active participation, innovation, teamwork, and contribution towards building Hyderabad\'s AI ecosystem'
      ],
      isOpen: true
    },
    {
      title: 'SMIT Coding Night (Hackathon)',
      position: 'Top 5 Position',
      date: '11.2025',
      scope: 'Institutional',
      attachment: '#',
      description: [
        'Achieved Top 5 ranking among 50+ participating teams',
        'Developed a real-time collaboration tool using WebSocket technology',
        'Demonstrated rapid prototyping and full-stack development skills under time pressure'
      ],
      isOpen: false
    },
    {
      title: 'FG Public School Cantt (Exhibition)',
      position: '2nd Position',
      date: '09.2023',
      scope: 'College',
      attachment: '#',
      description: [
        'Participated in provincial coding project competition',
        'Developed 3D web-based airplane game',
        'Achieved 2nd position at FG Public School Cantt Exhibition for project showcase',
        'Demonstrated my game development skills using web technologies'
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

<section id="honors" class="py-12 border-b border-zinc-900/50">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-900/50 h-full">
    <div class="flex items-center gap-3 mb-8">
      <h2 class="text-xl font-bold text-white">Honors & Awards</h2>
      <span class="text-zinc-500 text-sm font-mono">({awards.length})</span>
    </div>
    
    <div class="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/20">
      <div class="divide-y divide-zinc-800">
        {#each awards as award, i}
          <div class="group">
            <div 
              class="p-4 flex gap-4 items-start cursor-pointer hover:bg-zinc-900/40 transition-colors"
              on:click={() => toggle(i)}
            >
              <div class="mt-1 w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 shrink-0 group-hover:border-zinc-700 group-hover:text-zinc-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-medal"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/></svg>
              </div>

              <div class="flex-1 min-w-0 pt-0.5">
                <h3 class="font-bold text-white truncate pr-2 group-hover:text-zinc-200 transition-colors text-base">{award.title}</h3>
                <div class="flex flex-wrap items-center gap-x-3 text-sm text-zinc-500 mt-1 font-mono text-xs sm:text-sm">
                  <span class="text-zinc-400">{award.position}</span>
                  <span class="w-px h-3 bg-zinc-800"></span>
                  <span>{award.date}</span>
                  <span class="w-px h-3 bg-zinc-800"></span>
                  <span>{award.scope}</span>
                </div>
              </div>

              <div class="flex items-center gap-1 sm:gap-2 shrink-0 pt-1">
                {#if award.attachment}
                  <a 
                    href={award.attachment} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="p-2 text-zinc-500 hover:text-white transition-colors rounded-md hover:bg-zinc-800"
                    on:click|stopPropagation
                    title="View Attachment"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                  </a>
                {/if}
                <button class="p-2 text-zinc-500 hover:text-white transition-colors rounded-md hover:bg-zinc-800">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    class="lucide lucide-chevron-down transition-transform duration-300 {award.isOpen ? 'rotate-180' : ''}"
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
              </div>
            </div>

            {#if award.isOpen}
              <div transition:slide={{ duration: 300 }} class="overflow-hidden">
                <div class="px-4 pb-6 pl-[4.5rem] pr-6 text-sm text-zinc-400 border-t border-zinc-800/50 bg-zinc-900/10 pt-4">
                  <ul class="space-y-3">
                    {#each award.description as desc}
                      <li class="flex items-start gap-3 leading-relaxed">
                        <span class="mt-2 w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0"></span>
                        <span>{desc}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
