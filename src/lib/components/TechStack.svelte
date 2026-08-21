<script>
  const categories = [
    {
      name: "Backend & Systems",
      badge: "Core Stack",
      description: "Mission-critical architectures, RESTful APIs, and distributed data pipelines.",
      skills: [
        { name: "Laravel", role: "Primary Framework", level: "Advanced", url: "https://laravel.com/" },
        { name: "PHP", role: "Backend Runtime", level: "Advanced", url: "https://www.php.net/" },
        { name: "Node.js", role: "Services & Tooling", level: "Proficient", url: "https://nodejs.org/" },
        { name: "PostgreSQL", role: "Relational DB", level: "Proficient", url: "https://www.postgresql.org/" },
        { name: "MySQL", role: "Enterprise DB", level: "Advanced", url: "https://www.mysql.com/" },
        { name: "Python", role: "Load & Data Scripts", level: "Proficient", url: "https://www.python.org/" },
        { name: "Go", role: "Microservices", level: "Familiar", url: "https://go.dev/" }
      ]
    },
    {
      name: "Frontend & Interfaces",
      badge: "User Experience",
      description: "Interactive reactive SPAs, progressive web apps, and modern design systems.",
      skills: [
        { name: "Svelte / SvelteKit", role: "High-Performance UI", level: "Advanced", url: "https://svelte.dev/" },
        { name: "React & Next.js", role: "Component Architecture", level: "Advanced", url: "https://react.dev/" },
        { name: "TypeScript", role: "Type-Safe Systems", level: "Proficient", url: "https://www.typescriptlang.org/" },
        { name: "Tailwind CSS", role: "Design Systems", level: "Advanced", url: "https://tailwindcss.com/" },
        { name: "Livewire & Alpine", role: "Reactive Stacks", level: "Proficient", url: "https://livewire.laravel.com/" },
        { name: "Vue.js", role: "Web Apps", level: "Proficient", url: "https://vuejs.org/" }
      ]
    },
    {
      name: "Cloud, Mobile & DevOps",
      badge: "Infrastructure",
      description: "Cross-platform mobile apps, containerization, observability, and deployments.",
      skills: [
        { name: "Flutter & Dart", role: "Mobile Client", level: "Proficient", url: "https://flutter.dev/" },
        { name: "Docker", role: "Containers", level: "Proficient", url: "https://www.docker.com/" },
        { name: "Git & Actions", role: "CI/CD Workflows", level: "Advanced", url: "https://git-scm.com/" },
        { name: "Grafana & Sentry", role: "Observability", level: "Proficient", url: "https://grafana.com/" },
        { name: "WordPress & Custom Plugins", role: "CMS Platforms", level: "Advanced", url: "https://wordpress.org/" }
      ]
    }
  ];
</script>

<section id="tech-stack" class="py-12 border-b border-zinc-200 dark:border-zinc-900/50 scroll-mt-14">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-200 dark:border-zinc-900/50 h-full">
    
    <!-- Section Header with Explicit Hallmark Indexing -->
    <div class="flex items-baseline justify-between mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800/80">
      <div class="flex items-center gap-3">
        <span class="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500">01 /</span>
        <h2 class="text-xl sm:text-2xl font-bold font-display tracking-tight text-zinc-950 dark:text-white">
          Technical Stack & Ecosystem
        </h2>
      </div>
      <span class="text-xs font-mono text-zinc-500">Production-Tested</span>
    </div>

    <!-- Bento Matrix Layout -->
    <div class="space-y-6">
      {#each categories as category}
        <div class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 shadow-xs dark:shadow-none transition-colors">
          
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 class="text-base sm:text-lg font-bold font-display text-zinc-900 dark:text-zinc-100">
                {category.name}
              </h3>
              <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
                {category.description}
              </p>
            </div>
            <span class="self-start sm:self-auto px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
              {category.badge}
            </span>
          </div>

          <!-- Skill Chips with Role & Mastery Level -->
          <div class="flex flex-wrap gap-2 pt-3">
            {#each category.skills as skill}
              <a
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                class="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-white dark:hover:bg-zinc-800/80 transition-all text-xs font-mono"
              >
                <span class="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white">
                  {skill.name}
                </span>
                <span class="text-[11px] text-zinc-400 dark:text-zinc-500">· {skill.role}</span>
              </a>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
