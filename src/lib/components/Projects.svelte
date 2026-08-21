<script>
  import { onMount } from 'svelte';
  import { lenis } from '../stores/lenis.js';

  let showAllProjects = false;
  let isStuck = false;
  let sentinel;
  let searchQuery = '';
  let selectedCategory = 'all';

  const flagshipProjects = [
    {
      title: 'MPSOnline',
      badge: 'Malaysia · EdTech',
      subtitle: 'Cloud School Management System',
      description: 'Comprehensive cloud-based School Management System streamlining administrative workflows, fee collections, and student data for Malaysian educational institutions.',
      tags: ['Laravel', 'RestAPI', 'Microservices', 'Toyyibpay', 'GCP', 'OpenAI'],
      link: 'https://mpsonline.cloud/',
      featured: true,
      role: 'Backend Architect & DevOps'
    },
    {
      title: 'Qarirhack',
      badge: 'Singapore · Career AI',
      subtitle: 'AI Career Acceleration Platform',
      description: 'AI-driven career acceleration engine delivering personalized roadmaps, automated CV diagnostic reviews, and international job-matching pipelines.',
      tags: ['ReactJS', 'Laravel', 'RestAPI', 'OpenAI', 'Github Actions'],
      link: 'https://qarirhack.gravix.my.id/',
      featured: true,
      role: 'Fullstack Engineer'
    },
    {
      title: 'AP2EPI Suite',
      badge: 'BUMN · SOE Infrastructure',
      subtitle: 'Integrated Enterprise Portal',
      description: 'Unified customer service and operational support system for PT Energi Pelabuhan Indonesia, centralizing enterprise ticketing, fleet logistics, and analytics.',
      tags: ['Laravel', 'Clean Architecture', 'Grafana', 'Sentry', 'Nginx', 'Cloudflare'],
      link: 'https://epionline.id/',
      featured: true,
      role: 'Lead Systems Engineer'
    },
    {
      title: 'Webapp Backoffice',
      badge: 'Enterprise Hub',
      subtitle: 'Multi-Tenant Product Dashboard',
      description: 'Centralized administrative backoffice managing ecosystem products including MPSOnline and RPHClick with real-time operational telemetry.',
      tags: ['Laravel', 'Microservices', 'GCP', 'Toyyibpay', 'Livewire'],
      link: 'https://bo.mpsonline.cloud/',
      featured: true,
      role: 'Fullstack Developer'
    },
  ];

  const archiveProjects = [
    {
      title: 'RPHClick',
      category: 'web',
      description: 'AI-driven Daily Lesson Plan generator for Malaysian educators with intelligent curriculum structuring.',
      tags: ['Laravel', 'OpenAI', 'GCP', 'RestAPI'],
      link: 'http://rphclick.cloud/',
      year: '2024'
    },
    {
      title: 'Glide PM',
      category: 'enterprise',
      description: 'Project management & task orchestration system for team collaboration and sprint planning.',
      tags: ['Laravel', 'Livewire', 'AlpineJS', 'Cloudflare'],
      link: 'https://glide.epionline.id/',
      year: '2024'
    },
    {
      title: 'EPI Docs',
      category: 'enterprise',
      description: 'Developer portal and comprehensive REST API reference documentation for internal port services.',
      tags: ['Laravel', 'Scramble Dedoc', 'Markdown'],
      link: 'https://epionline.id/api/v1.0/docs',
      year: '2024'
    },
    {
      title: 'EPILog',
      category: 'enterprise',
      description: 'Operational expense and administrative cost tracking PWA for PT Energi Pelabuhan Indonesia.',
      tags: ['ReactJS', 'Tailwind', 'PWA'],
      link: 'https://epilog.rafitojuan.my.id/data',
      year: '2024'
    },
    {
      title: 'PresenX',
      category: 'enterprise',
      description: 'Digital attendance management and daily activity reporting system designed for interns.',
      tags: ['ReactJS', 'NextJS', 'Tailwind', 'Cloudflare'],
      link: 'https://presenx.epionline.id/',
      year: '2024'
    },
    {
      title: 'EPI Electric Mobile',
      category: 'mobile',
      description: 'Utility management mobile app for electricity billing, meter telemetry, and account upgrades.',
      tags: ['Flutter', 'Dart', 'RestAPI'],
      link: '#',
      year: '2024'
    },
    {
      title: 'Clinico API',
      category: 'web',
      description: 'Healthcare management API platform powering clinical workflows for Malaysian clinics.',
      tags: ['Laravel', 'RestAPI', 'Clean Architecture'],
      link: '#',
      year: '2024'
    },
    {
      title: 'Wordpress Loadtesting',
      category: 'tools',
      description: 'Python benchmarking suite designed to stress-test high-concurrency WordPress installations.',
      tags: ['Python', 'Benchmarking', 'CLI'],
      link: 'https://github.com/rafitojuan/wordpress-loadtesting',
      year: '2024'
    },
    {
      title: 'CIV VI Cheat Menu Patch',
      category: 'tools',
      description: 'Community mod enhancement and debug menu expansion for Civilization VI game testing.',
      tags: ['Lua Script', 'Modding', 'GUI'],
      link: 'https://github.com/rafitojuan/civilization-vi-advanced-cheat-menu-fix',
      year: '2023'
    },
    {
      title: 'Simple NFC Utility',
      category: 'tools',
      description: 'Web & desktop utility for reading, writing, and debugging NFC tag payloads.',
      tags: ['ReactJS', 'Web NFC API', 'Tailwind'],
      link: 'https://nfc.rafitojuan.my.id/',
      year: '2024'
    },
    {
      title: 'Pomore',
      category: 'web',
      description: 'Flow-state productivity tool combining customizable Pomodoro intervals with audio streaming.',
      tags: ['ReactJS', 'Tailwind', 'Framer Motion'],
      link: 'https://pomore.rafitojuan.my.id/',
      year: '2023'
    },
    {
      title: 'Mutameda',
      category: 'web',
      description: 'Mental health and emotional pattern tracking application with trend analysis.',
      tags: ['Ruby on Rails', 'Tailwind', 'PostgreSQL'],
      link: 'https://mutameda.rafitojuan.my.id/',
      year: '2023'
    },
    {
      title: 'AI Portfolio Assistant V1',
      category: 'web',
      description: 'Conversational portfolio experiment featuring an integrated intelligent chat assistant.',
      tags: ['ReactJS', 'NextJS', 'OpenAI', 'Framer Motion'],
      link: 'https://rafitojuan.my.id/',
      year: '2024'
    }
  ];

  $: filteredArchive = archiveProjects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  function toggleArchive() {
    showAllProjects = !showAllProjects;
    if (!showAllProjects) {
      if ($lenis) {
        $lenis.scrollTo('#projects');
      } else {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isStuck = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      },
      { rootMargin: '-1px 0px 0px 0px', threshold: [1] }
    );
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  });
</script>

<section id="projects" class="py-12 border-b border-zinc-200 dark:border-zinc-900/50 scroll-mt-14">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-200 dark:border-zinc-900/50 h-full relative">
    <div bind:this={sentinel} class="absolute -top-14 h-1 w-full pointer-events-none opacity-0"></div>
    
    <!-- Sticky Section Header -->
    <div class={`flex items-baseline justify-between mb-8 sticky top-14 z-10 py-4 border-b border-zinc-200 dark:border-zinc-800/80 transition-colors duration-300 ${isStuck ? 'bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md' : ''}`}>
      <div class="flex items-center gap-3">
        <span class="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500">02 /</span>
        <h2 class="text-xl sm:text-2xl font-bold font-display tracking-tight text-zinc-950 dark:text-white">
          Selected Works & Systems
        </h2>
        <span class="text-xs font-mono text-zinc-500">({flagshipProjects.length + archiveProjects.length})</span>
      </div>

      <button
        type="button"
        on:click={toggleArchive}
        class="text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
      >
        {showAllProjects ? 'Close Archive ↑' : 'Explore Archive (' + archiveProjects.length + ') →'}
      </button>
    </div>

    <!-- Flagship Bento Showcase Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {#each flagshipProjects as project}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          class="group relative flex flex-col justify-between p-5 sm:p-6 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60 shadow-xs dark:shadow-none transition-all duration-200"
        >
          <div>
            <!-- Badge & External Link Arrow -->
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-zinc-100 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60">
                {project.badge}
              </span>
              <svg class="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>

            <!-- Title & Subtitle -->
            <h3 class="text-lg font-bold font-display text-zinc-900 dark:text-white group-hover:text-zinc-950 dark:group-hover:text-zinc-100 transition-colors">
              {project.title}
            </h3>
            <p class="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-3">
              {project.subtitle} · {project.role}
            </p>

            <!-- Description -->
            <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              {project.description}
            </p>
          </div>

          <!-- Architecture Tags -->
          <div class="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
            {#each project.tags as tag}
              <span class="px-2 py-0.5 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded">
                {tag}
              </span>
            {/each}
          </div>
        </a>
      {/each}
    </div>

    <!-- Expandable Tabular Archive Section -->
    {#if showAllProjects}
      <div class="pt-6 pb-2 border-t border-zinc-200 dark:border-zinc-800">
        
        <!-- Filter & Search Controls -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div class="flex flex-wrap gap-1.5 text-xs font-mono">
            <button
              type="button"
              on:click={() => selectedCategory = 'all'}
              class="px-2.5 py-1 rounded-md transition-colors cursor-pointer {selectedCategory === 'all'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'}"
            >
              All ({archiveProjects.length})
            </button>
            <button
              type="button"
              on:click={() => selectedCategory = 'enterprise'}
              class="px-2.5 py-1 rounded-md transition-colors cursor-pointer {selectedCategory === 'enterprise'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'}"
            >
              Enterprise / SOE
            </button>
            <button
              type="button"
              on:click={() => selectedCategory = 'web'}
              class="px-2.5 py-1 rounded-md transition-colors cursor-pointer {selectedCategory === 'web'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'}"
            >
              Web Platforms
            </button>
            <button
              type="button"
              on:click={() => selectedCategory = 'tools'}
              class="px-2.5 py-1 rounded-md transition-colors cursor-pointer {selectedCategory === 'tools'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'}"
            >
              Tools & Scripts
            </button>
          </div>

          <!-- Instant Search -->
          <div class="relative w-full sm:w-48">
            <input
              type="text"
              bind:value={searchQuery}
              placeholder="Search archive..."
              class="w-full px-3 py-1 text-xs font-mono rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
            />
          </div>
        </div>

        <!-- Tabular Spec Sheet Archive Items -->
        <div class="space-y-2">
          {#each filteredArchive as project}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              class="group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-white dark:bg-zinc-900/20 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors gap-3"
            >
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <h4 class="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white">
                    {project.title}
                  </h4>
                  <span class="text-[10px] font-mono text-zinc-400">{project.year}</span>
                </div>
                <p class="text-xs text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
              </div>

              <div class="flex items-center gap-2 self-start sm:self-center shrink-0">
                <div class="flex flex-wrap gap-1">
                  {#each project.tags.slice(0, 3) as tag}
                    <span class="px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded">
                      {tag}
                    </span>
                  {/each}
                </div>
                <svg class="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>
          {/each}

          {#if filteredArchive.length === 0}
            <div class="p-8 text-center text-xs font-mono text-zinc-500">
              No archive projects match "{searchQuery}".
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</section>
