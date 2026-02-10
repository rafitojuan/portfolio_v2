<script>
  const stack = [
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Svelte', icon: '🔥' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'TypeScript', icon: 'TS' },
    { name: 'Tailwind', icon: '🌊' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Figma', icon: '🎨' },
    { name: 'Git', icon: '📦' },
    { name: 'VS Code', icon: '📝' },
    { name: 'Linux', icon: '🐧' },
    { name: 'Rust', icon: '🦀' },
    { name: 'Python', icon: '🐍' },
  ];
</script>

<section class="py-12 border-b border-zinc-900">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-2xl font-bold text-white mb-6">Stack</h2>
    
    <div class="flex flex-wrap gap-4">
      {#each stack as tech}
        <div class="group relative flex items-center justify-center w-12 h-12 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:bg-zinc-800 hover:border-zinc-700 transition-all cursor-default">
          <span class="text-xl filter grayscale group-hover:grayscale-0 transition-all">{tech.icon}</span>
          
          <!-- Tooltip -->
          <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {tech.name}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
