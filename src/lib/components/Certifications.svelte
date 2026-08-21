<script>
  const certifications = [
    {
      name: 'Website Technician Competency BNSP',
      issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
      date: '2024',
      badge: 'National Standard',
      link: 'https://drive.google.com/file/d/1YQMXi9GeD5GTYLWoWq3fmdUxGmxu_wum/view?usp=sharing'
    },
    {
      name: 'TOEIC Listening & Reading (Score: 895)',
      issuer: 'Educational Testing Service (ETS)',
      date: '2023',
      badge: 'Professional Proficiency',
      link: 'https://drive.google.com/file/d/12EhwKdZM7uTWnZ_kIsoh2fvNsPSqwC25/view?usp=sharing'
    },
    {
      name: 'Certified Database Administrator',
      issuer: 'Certification Authority',
      date: '2026',
      badge: 'Enterprise DB',
      link: 'https://drive.google.com/file/d/1fLn8qbE4Ln0bY9QRk4hXqtsP-UXtbW35/view?usp=drive_link'
    },
    {
      name: 'Certified Database Developer',
      issuer: 'Certification Authority',
      date: '2026',
      badge: 'SQL & Architecture',
      link: 'https://drive.google.com/file/d/1XQK7HkSGloWQ8-Dq5HCvpElyZqX5n10J/view?usp=drive_link'
    },
    {
      name: 'Certified Database Practitioner',
      issuer: 'Certification Authority',
      date: '2026',
      badge: 'Practitioner',
      link: 'https://drive.google.com/file/d/1JybtxPgPoEItGhwwhogsh31tZ0p_mcHh/view?usp=drive_link'
    },
    {
      name: 'AI Career Bootcamp Certification',
      issuer: 'Indonesia AI Institute',
      date: '2023',
      badge: 'AI & ML Ops',
      link: 'https://drive.google.com/file/d/1mXd_0Df1MCoYiq-A36ZcmAKtUBFFaTeu/view?usp=sharing'
    },
    {
      name: 'Film Screenwriting Certification',
      issuer: 'Jakarta Islamic Centre',
      date: '2022',
      badge: 'Creative Narrative',
      link: 'https://drive.google.com/file/d/1ySAcrQjbNvHpHEnU8AQiGNjQqxTeH_qy/view?usp=sharing'
    },
  ];
</script>

<section id="certifications" class="py-12 border-b border-zinc-200 dark:border-zinc-900/50 scroll-mt-14">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-200 dark:border-zinc-900/50 h-full">
    
    <!-- Section Header -->
    <div class="flex items-baseline justify-between mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800/80">
      <div class="flex items-center gap-3">
        <span class="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500">07 /</span>
        <h2 class="text-xl sm:text-2xl font-bold font-display tracking-tight text-zinc-950 dark:text-white">
          Verified Credentials
        </h2>
      </div>
      <span class="text-xs font-mono text-zinc-500">({certifications.length} Certificates)</span>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      {#each certifications as cert}
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer" 
          class="group p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs dark:shadow-none transition-all rounded-2xl flex flex-col justify-between h-full"
        >
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                {cert.badge}
              </span>
              <span class="text-xs font-mono text-zinc-400">{cert.date}</span>
            </div>

            <h3 class="font-bold font-display text-zinc-900 dark:text-white group-hover:text-zinc-950 dark:group-hover:text-zinc-100 transition-colors text-sm sm:text-base leading-snug">
              {cert.name}
            </h3>
            <div class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{cert.issuer}</div>
          </div>

          <div class="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex justify-between items-center text-xs font-mono text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
            <span>Verified Document</span>
            <span class="flex items-center gap-1">
              View PDF
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>
