<script>
  const certifications = [
    {
      name: 'Example Certification',
      issuer: 'Certification Authority',
      date: '2024',
      link: '#'
    },
    // Add more certifications here
  ];
</script>

<section id="certifications" class="py-12 border-b border-zinc-900/50">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-900/50 h-full">
    <div class="flex items-center gap-3 mb-8">
      <h2 class="text-xl font-bold text-white">Certifications</h2>
      <span class="text-zinc-500 text-sm font-mono">({certifications.length})</span>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {#each certifications as cert}
        <a href={cert.link} target="_blank" rel="noopener noreferrer" 
           class="group p-4 border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all rounded-sm flex flex-col justify-between h-full">
          <div>
            <h3 class="font-semibold text-white group-hover:text-zinc-200 transition-colors">
              {cert.name}
            </h3>
            <div class="text-sm text-zinc-500 mt-1">{cert.issuer}</div>
          </div>
          <div class="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center text-xs font-mono text-zinc-600">
            <span>{cert.date}</span>
            <span class="group-hover:text-zinc-400 transition-colors">View Credential &rarr;</span>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>
