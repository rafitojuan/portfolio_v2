<script>
  const experiences = [
    {
      company: 'Energi Pelabuhan Indonesia Ltd.',
      role: 'Data Management and IT Infrastructure',
      period: '2024 - Present',
      description: 'Develop scalable SaaS applications using modern web technologies. Architect and develop full-stack solutions with the MERN stack and Next.js. Build cross-platform applications with React Native and Electron.',
      logo: '/pt_energi_pelabuhan_indonesia_logo.jpg'
    },
    {
      company: 'Gravix (Freelance)',
      role: 'Fullstack and Devops Engineer',
      period: '2024 - 2025',
      description: 'Collaborated with various clients to deliver production-ready web solutions. Focused on solving complex frontend challenges and building robust backend systems.',
      logo: '/idgravix_logo.jpg'
    },
    {
      company: 'SEMUDAH',
      role: 'Head Technician',
      period: '2023 - 2024',
      description: 'Assisted in the development of client websites using WordPress and custom PHP. Learned the fundamentals of web development and agile methodologies.',
      logo: '/semudah.jpg'
    },
    {
      company: 'Korpolairud Baharkam Polri',
      role: 'IT Staff Intern',
      period: 'Jan 2023 - Apr 2023',
      description: 'Assisted in the development of client websites using WordPress and custom PHP. Learned the fundamentals of web development and agile methodologies.',
      logo: '/korps_mariniers_logo.jpg'
    }
  ];
</script>

<section id="experience" class="py-12 border-b border-zinc-900/50">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-900/50 h-full">
    <h2 class="text-xl font-bold text-white mb-8">Experience</h2>
    
    <div class="space-y-12">
      {#each experiences as exp}
        <div class="group relative flex gap-6">
          <div class="absolute left-[27px] top-14 bottom-0 w-px bg-zinc-800 -mb-6 last:hidden"></div>
          
          <div class="relative shrink-0">
            <div class="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 font-bold group-hover:border-zinc-700 group-hover:text-white transition-colors overflow-hidden">
              <img src={exp.logo} alt={exp.company} class="w-full h-full object-cover" />
            </div>
          </div>

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
