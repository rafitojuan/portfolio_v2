<script>
  // Fake contribution data generator
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weeks = Array.from({ length: 52 });
  
  function getRandomIntensity() {
    const r = Math.random();
    if (r > 0.9) return 'bg-green-500';
    if (r > 0.7) return 'bg-green-700';
    if (r > 0.5) return 'bg-green-900';
    if (r > 0.2) return 'bg-zinc-800';
    return 'bg-zinc-900';
  }
</script>

<section id="about" class="pb-12 border-b border-zinc-900">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-2xl font-bold text-white mb-6">About</h2>
    
    <div class="space-y-4 text-zinc-400 leading-relaxed mb-8">
      <ul class="space-y-2 list-disc list-inside">
        <li>Fullstack Developer with 4+ years of experience. started coding at age 14; known for clean architecture and attention to detail.</li>
        <li>Expertise in MERN stack, Next.js, NestJS, React Native, Electron, and 3D technologies; building scalable web, mobile, desktop, and immersive 3D applications.</li>
        <li>Now at 18 years old, what some view as a limitation, I see as my greatest advantage—starting early gave me the freedom to learn, experiment and build a strong foundation.</li>
        <li>Creator of ShopFlow: modern SaaS shop management system.</li>
        <li>Passionate about exploring new technologies and turning ideas into reality through polished, production-ready projects.</li>
      </ul>
    </div>

    <!-- Contribution Graph Mockup -->
    <div class="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800 overflow-hidden">
      <div class="flex justify-between text-xs text-zinc-500 mb-2 font-mono">
        {#each months as month}
          <span>{month}</span>
        {/each}
      </div>
      <div class="flex gap-1 overflow-hidden h-[100px]">
        {#each weeks as _}
          <div class="flex flex-col gap-1 flex-1">
            {#each Array(7) as _}
              <div class="w-full h-full rounded-sm {getRandomIntensity()}"></div>
            {/each}
          </div>
        {/each}
      </div>
      <div class="flex justify-end items-center gap-2 mt-2 text-xs text-zinc-500">
        <span>Less</span>
        <div class="w-3 h-3 bg-zinc-900 rounded-sm"></div>
        <div class="w-3 h-3 bg-zinc-800 rounded-sm"></div>
        <div class="w-3 h-3 bg-green-900 rounded-sm"></div>
        <div class="w-3 h-3 bg-green-700 rounded-sm"></div>
        <div class="w-3 h-3 bg-green-500 rounded-sm"></div>
        <span>More</span>
      </div>
    </div>
  </div>
</section>
