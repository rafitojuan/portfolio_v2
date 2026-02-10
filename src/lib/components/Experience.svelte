<script>
  const experiences = [
    {
      company: 'Forrof.io',
      role: 'Senior Fullstack Developer',
      period: '2023 - Present',
      description: 'Develop scalable SaaS applications using modern web technologies. Architect and develop full-stack solutions with the MERN stack and Next.js. Build cross-platform applications with React Native and Electron.',
      logo: 'F'
    },
    {
      company: 'Upwork (Freelance)',
      role: 'Fullstack Developer',
      period: '2021 - 2023',
      description: 'Collaborated with various clients to deliver production-ready web solutions. Focused on solving complex frontend challenges and building robust backend systems.',
      logo: 'U'
    },
    {
      company: 'TechCorp Inc.',
      role: 'Junior Web Developer',
      period: '2020 - 2021',
      description: 'Assisted in the development of client websites using WordPress and custom PHP. Learned the fundamentals of web development and agile methodologies.',
      logo: 'T'
    }
  ];
</script>

<section id="experience" class="py-12 border-b border-zinc-900">
  <div class="max-w-3xl mx-auto px-4 sm:px-6">
    <h2 class="text-xl font-bold text-white mb-8">Experience</h2>
    
    <div class="space-y-12">
      {#each experiences as exp}
        <div class="group relative flex gap-6">
          <!-- Timeline Line -->
          <div class="absolute left-[27px] top-14 bottom-0 w-px bg-zinc-800 -mb-6 last:hidden"></div>
          
          <!-- Logo -->
          <div class="relative shrink-0">
            <div class="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 font-bold group-hover:border-zinc-700 group-hover:text-white transition-colors">
              {exp.logo}
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 pt-1">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
              <div>
                <h3 class="font-semibold text-white group-hover:text-zinc-200 transition-colors">
                  {exp.company}
                </h3>
                <div class="text-sm text-zinc-500">{exp.role}</div>
              </div>
              <span class="text-xs font-mono text-zinc-500 pt-1">{exp.period}</span>
            </div>
            
            <p class="text-sm text-zinc-400 leading-relaxed">
              {exp.description}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
