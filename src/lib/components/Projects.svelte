<script>
  const projects = [
    {
      title: 'ShopFlow',
      description: 'Modern SaaS shop management system built with PERN stack (PostgreSQL, Express, React, Node.js) and Prisma ORM. Features real-time dashboard and inventory tracking.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Prisma'],
      link: '#',
      icon: '🛍️'
    },
    {
      title: 'Fynosign',
      description: 'Complete e-signature SaaS platform with PDF signing workflows. Integrated Stripe for payments and solved complex PDF manipulation challenges.',
      tags: ['Next.js', 'Stripe', 'PDF-Lib'],
      link: '#',
      icon: '✍️'
    },
    {
      title: 'RallyTyper',
      description: 'Online competitive typing game. Focused on real-time performance and user engagement with WebSocket integration.',
      tags: ['Svelte', 'WebSockets', 'Tailwind'],
      link: '#',
      icon: '⌨️'
    },
    {
      title: '3D Portfolio',
      description: 'Immersive 3D portfolio website using Three.js and React Three Fiber. Showcasing creative developer skills.',
      tags: ['Three.js', 'R3F', 'React'],
      link: '#',
      icon: '🧊'
    }
  ];
</script>

<section id="projects" class="py-12 border-b border-zinc-900">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold text-white">Projects</h2>
      <a href="#" class="text-sm text-zinc-500 hover:text-white transition-colors">View all projects →</a>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each projects as project}
        <a href={project.link} class="group block p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300">
          <div class="flex justify-between items-start mb-4">
            <div class="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
              {project.icon}
            </div>
            <svg class="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          
          <h3 class="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          
          <p class="text-sm text-zinc-400 mb-4 line-clamp-2">
            {project.description}
          </p>
          
          <div class="flex flex-wrap gap-2">
            {#each project.tags as tag}
              <span class="px-2 py-1 text-xs font-medium text-zinc-400 bg-zinc-900/50 border border-zinc-800 rounded-md">
                {tag}
              </span>
            {/each}
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>
