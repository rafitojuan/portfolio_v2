<script>
  import { slide } from 'svelte/transition';

  let educations = [
    {
      institution: 'Open University',
      period: '2026 - Present',
      degree: "Bachelor's Degree in System Information",
      description: [
        'Currently pursuing a Bachelor\'s degree in System Information.',
        'Active in remote work and balancing full-time employment with academic responsibilities.',
        'Developing strong time management and self-discipline skills through distance learning.'
      ],
      tags: ['Software Engineering', 'Data Management', 'System Analysis'],
      isOpen: true
    },
    {
      institution: 'Jakarta 12 Vocational High School',
      period: '2021 - 2024',
      degree: 'Vocational High School - Software Engineering Concentration',
      description: [
        'Specialized in Software Engineering, with a focus on web development, mobile applications and hardware maintenance.',
        'Winner of SATUASA Stundent Award, for the best idea and project realisation.',
        'Winner of FLS2N (National Short Film Competition), demonstrating creative and visual storytelling skills.',
        'Active participant in webdev communities, japanese club, drumband and student organizations.'
      ],
      tags: ['Laravel', 'Flutter', 'PHP','Javascript','Java','MySQL','IT Business'],
      isOpen: true
    }
  ];

  function toggle(index) {
    educations[index].isOpen = !educations[index].isOpen;
    educations = educations;
  }
</script>

<section id="education" class="py-12 border-b border-zinc-900/50">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-900/50 h-full">
   <h2 class="text-xl font-bold text-white mb-8">Education</h2>
    
    <div class="space-y-4">
      {#each educations as edu, i}
        <div class="group relative border border-zinc-800/50 bg-zinc-900/20 rounded-2xl overflow-hidden hover:border-zinc-700/50 transition-all duration-300">
          <button 
            class="w-full flex items-start justify-between p-6 text-left cursor-pointer"
            on:click={() => toggle(i)}
          >
            <div class="flex gap-4">
              <div class="mt-1 p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-zinc-200 transition-colors h-fit">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              
              <div>
                <h3 class="font-bold text-zinc-100 group-hover:text-white transition-colors text-lg">
                  {edu.institution}
                </h3>
                <div class="text-sm text-zinc-500 font-mono mt-1">{edu.period}</div>
              </div>
            </div>

            <div class={`p-2 rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-all duration-300 ${edu.isOpen ? 'rotate-180' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </button>

          {#if edu.isOpen}
            <div transition:slide={{ duration: 300, axis: 'y' }} class="px-6 pb-6 pl-[5.5rem]">
              <div class="text-zinc-300 text-sm mb-4 font-medium border-l-2 border-zinc-700 pl-3">
                {edu.degree}
              </div>
              
              <ul class="space-y-2 mb-6">
                {#each edu.description as desc}
                  <li class="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                    <span class="mt-2 w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0 group-hover:bg-zinc-500 transition-colors"></span>
                    <span>{desc}</span>
                  </li>
                {/each}
              </ul>

              <div class="flex flex-wrap gap-2">
                {#each edu.tags as tag}
                  <span class="px-2.5 py-1 text-xs font-medium text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-md group-hover:border-zinc-700 transition-colors">
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
