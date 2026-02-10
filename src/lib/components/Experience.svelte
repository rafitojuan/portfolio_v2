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
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-2xl font-bold text-white mb-8">Experience</h2>
    
    <div class="space-y-8">
      {#each experiences as exp}
        <div class="relative pl-8 md:pl-0">
          <!-- Timeline Line for Mobile -->
          <div class="absolute left-3 top-3 bottom-0 w-px bg-zinc-800 md:hidden"></div>
          
          <div class="flex flex-col md:flex-row gap-6 group">
            <!-- Logo Column -->
            <div class="flex-shrink-0 relative z-10">
              <div class="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 font-bold group-hover:border-zinc-600 group-hover:text-white transition-colors">
                {exp.logo}
              </div>
            </div>

            <!-- Content Column -->
            <div class="flex-1 pt-1">
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                <h3 class="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {exp.company}
                </h3>
                <span class="text-sm font-mono text-zinc-500">{exp.period}</span>
              </div>
              
              <div class="text-zinc-400 font-medium text-sm mb-3">{exp.role}</div>
              
              <p class="text-zinc-500 text-sm leading-relaxed">
                {exp.description}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
