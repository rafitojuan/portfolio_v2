<script>
  const experiences = [
    {
      company: 'PT Energi Pelabuhan Indonesia (SOE)',
      role: 'Data Management & IT Infrastructure Engineer',
      period: '2024 - Present',
      badge: 'Current Role',
      description: 'Architect and ship scalable web apps, PWAs, mobile clients, and cloud-native APIs. Oversee full-stack system development, DevOps automation pipelines, and core cloud infrastructure while managing critical enterprise data workflows.',
      tags: ['Laravel', 'Clean Architecture', 'Grafana', 'Sentry', 'Docker', 'Cloudflare', 'MySQL'],
      logo: '/pt_energi_pelabuhan_indonesia_logo.jpg'
    },
    {
      company: 'Gravix (Remote / Contract)',
      role: 'Fullstack & DevOps Engineer',
      period: '2024 - 2025',
      badge: 'Client Work',
      description: 'Collaborated with international clients across Singapore and Malaysia to deliver production-ready web platforms and PWAs. Resolved complex frontend state challenges and engineered robust high-throughput backend APIs.',
      tags: ['ReactJS', 'NextJS', 'Laravel', 'REST API', 'GCP', 'GitHub Actions'],
      logo: '/idgravix_logo.jpg'
    },
    {
      company: 'SEMUDAH',
      role: 'Head Technician & Systems Lead',
      period: '2023 - 2024',
      badge: 'Team Lead',
      description: 'Led the technical team overseeing hardware, software, and network operations across vocational workshops. Architected internal automation tools and delivered web development services to external clients.',
      tags: ['Network Operations', 'Internal Tooling', 'System Administration'],
      logo: '/semudah.jpg'
    },
    {
      company: 'Korpolairud Baharkam Polri',
      role: 'IT Staff Intern',
      period: 'Jan 2023 - Apr 2023',
      badge: 'Internship',
      description: 'Contributed to internal application development, deployment workflow automations, network optimization, and software provisioning.',
      tags: ['Network Support', 'Application Maintenance', 'Hardware Diagnostics'],
      logo: '/korps_mariniers_logo.jpg'
    }
  ];
</script>

<section id="experience" class="py-12 border-b border-zinc-200 dark:border-zinc-900/50 scroll-mt-14">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-200 dark:border-zinc-900/50 h-full">
    
    <!-- Section Header -->
    <div class="flex items-baseline justify-between mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800/80">
      <div class="flex items-center gap-3">
        <span class="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500">04 /</span>
        <h2 class="text-xl sm:text-2xl font-bold font-display tracking-tight text-zinc-950 dark:text-white">
          Professional Experience
        </h2>
      </div>
      <span class="text-xs font-mono text-zinc-500">Track Record</span>
    </div>
    
    <div class="space-y-8">
      {#each experiences as exp}
        <div class="group relative flex gap-4 sm:gap-6 p-5 rounded-2xl bg-white dark:bg-zinc-900/20 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs dark:shadow-none transition-all">
          
          <!-- Logo Column -->
          <div class="relative shrink-0">
            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-xs">
              <img src={exp.logo} alt={exp.company} class="w-full h-full object-cover" />
            </div>
          </div>

          <!-- Content Column -->
          <div class="flex-1 space-y-2">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-bold font-display text-zinc-900 dark:text-white group-hover:text-zinc-950 dark:group-hover:text-zinc-100 transition-colors text-base sm:text-lg">
                    {exp.company}
                  </h3>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    {exp.badge}
                  </span>
                </div>
                <div class="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-0.5">{exp.role}</div>
              </div>
              <span class="text-xs font-mono text-zinc-500 shrink-0">{exp.period}</span>
            </div>
            
            <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {exp.description}
            </p>

            <!-- Role Technologies -->
            <div class="flex flex-wrap gap-1.5 pt-2">
              {#each exp.tags as tag}
                <span class="px-2 py-0.5 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded">
                  {tag}
                </span>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
