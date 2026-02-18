<script>
  import { fade, fly } from 'svelte/transition';

  let showAllProjects = false;

  const projects = [
    {
      title: 'MPSOnline',
      description: 'Modern SaaS shop management system built with PERN stack (PostgreSQL, Express, React, Node.js) and Prisma ORM. Features real-time dashboard and inventory tracking.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Prisma'],
      link: 'https://mpsonline.cloud/',
      icon: 'https://mpsonline.cloud/images/Logo_MPS.png'
    },
    {
      title: 'Qarirhack',
      description: 'Immersive 3D portfolio website using Three.js and React Three Fiber. Showcasing creative developer skills.',
      tags: ['Three.js', 'R3F', 'React'],
      link: 'https://qarirhack.gravix.my.id/',
      icon: 'https://media.licdn.com/dms/image/v2/D4D0BAQFH7s4M9mGesw/company-logo_200_200/company-logo_200_200/0/1682788922562/qarirlabscom_logo?e=1773273600&v=beta&t=pFs97UTmZ9BALamn-umSovbDGyyIMvlDJ6rjL35LOvQ'
    },
    {
      title: 'RPHClick',
      description: 'Complete e-signature SaaS platform with PDF signing workflows. Integrated Stripe for payments and solved complex PDF manipulation challenges.',
      tags: ['Next.js', 'Stripe', 'PDF-Lib'],
      link: 'http://rphclick.cloud/',
      icon: 'https://bo.mpsonline.cloud/images/iconWebMaster.png'
    },
    {
      title: 'Webapp Backoffice',
      description: 'Online competitive typing game. Focused on real-time performance and user engagement with WebSocket integration.',
      tags: ['Svelte', 'WebSockets', 'Tailwind'],
      link: 'https://bo.mpsonline.cloud/',
      icon: 'https://bo.mpsonline.cloud/images/iconWebMaster.png'
    },
  ];

  const additionalProjects = [
    {
      title: 'AP2EPI',
      description: 'Description for your additional manual project. This is a placeholder for you to fill with your actual project details.',
      tags: ['Technology 1', 'Technology 2'],
      link: 'https://epionline.id/',
      icon: 'https://epionline.id/assets/img/logoepi.jpg'
    },
    {
      title: 'Glide',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: 'https://glide.epionline.id/',
      icon: 'https://glide.epionline.id/build/images/logo_project_board.png'
    },
    {
      title: 'Company Profile',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: 'https://energipelabuhan.co.id/',
      icon: 'https://epionline.id/assets/img/logoepi.jpg'
    },
    {
      title: 'EPILog',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: 'https://epilog.rafitojuan.my.id/data',
      icon: 'https://epionline.id/assets/img/logoepi.jpg'
    },
    {
      title: 'General Affairs',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: 'https://epionline.id',
      icon: 'https://epionline.id/assets/img/logoepi.jpg'
    },
    {
      title: 'EPI Docs',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: 'https://epionline.id/api/v1.0/docs',
      icon: 'https://epionline.id/assets/img/logoepi.jpg'
    },
    {
      title: 'PresenX',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: 'https://presenx.epionline.id/',
      icon: 'https://epionline.id/assets/img/logoepi.jpg'
    },
    {
      title: 'EPI Backend System',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: 'https://epionline.id/api/v1.0/docs',
      icon: 'https://epionline.id/assets/img/logoepi.jpg'
    },
    {
      title: 'EPI Electric',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: '#',
      icon: '/Logo-Purple.png'
    },
    {
      title: 'Clinico API',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: '#',
      icon: 'https://api.clinico.site/storage/clinic_profile/hsL8rpOYJkm7QXxNOSOxgQXl2qxQNJwUwT9DdhoR.png'
    },
    {
      title: 'Portfolio Website V1',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: 'https://rafitojuan.github.io/portofolio/',
      icon: '/Logo-Purple.png'
    },
    {
      title: 'AI Portfolio Website',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: 'https://rafitojuan.my.id/',
      icon: '/Logo-Purple.png'
    },
    {
      title: 'Portfolio Website V2',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: 'https://rafitojuan.my.id/portfolio/',
      icon: '/Logo-Purple.png'
    },
    {
      title: 'Wordpress Loadtesting',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: 'https://github.com/rafitojuan/wordpress-loadtesting',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><g fill="#00749a" clip-path="url(#a)"><path d="M7.107 49.999c0 16.979 9.867 31.65 24.175 38.604L10.82 32.543a42.7 42.7 0 0 0-3.714 17.456m71.85-2.165c0-5.3-1.904-8.972-3.537-11.83-2.175-3.532-4.212-6.524-4.212-10.058 0-3.943 2.99-7.613 7.202-7.613.19 0 .37.024.557.034-7.632-6.991-17.8-11.26-28.966-11.26-14.985 0-28.169 7.689-35.839 19.334 1.007.03 1.956.05 2.76.05 4.487 0 11.432-.544 11.432-.544 2.312-.136 2.585 3.26.276 3.533 0 0-2.325.274-4.91.41l15.62 46.46 9.387-28.152-6.683-18.31c-2.31-.135-4.498-.409-4.498-.409-2.312-.135-2.04-3.669.27-3.533 0 0 7.084.545 11.299.545 4.486 0 11.431-.545 11.431-.545 2.314-.136 2.586 3.26.275 3.534 0 0-2.328.273-4.909.408l15.5 46.11L75.69 61.7c1.856-5.932 3.267-10.194 3.267-13.866"/><path d="m50.753 53.75-12.87 37.396a42.9 42.9 0 0 0 12.118 1.748 42.9 42.9 0 0 0 14.243-2.43 3.6 3.6 0 0 1-.305-.592zm36.885-24.33c.184 1.366.288 2.834.288 4.41 0 4.353-.812 9.246-3.261 15.364L71.563 87.075C84.315 79.64 92.893 65.824 92.893 50a42.66 42.66 0 0 0-5.255-20.58"/><path d="M50 0C22.43 0 0 22.43 0 49.999 0 77.57 22.43 100 50 100s50.003-22.429 50.003-50.002C100.003 22.429 77.569 0 50.001 0m0 97.708c-26.305 0-47.707-21.402-47.707-47.71C2.293 23.695 23.694 2.294 50 2.294c26.304 0 47.705 21.401 47.705 47.706 0 26.307-21.402 47.71-47.705 47.71"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>'
    },
    {
      title: 'CIV VI advanced cheat menu',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: 'https://github.com/rafitojuan/civilization-vi-advanced-cheat-menu-fix',
      icon: '/civvi.png'
    },
    {
      title: 'Simple NFC',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: 'https://nfc.rafitojuan.my.id/',
      icon: '/Logo-Purple.png'
    },
    {
      title: 'Pomore',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: 'https://pomore.rafitojuan.my.id/',
      icon: '/Logo-Purple.png'
    },
    {
      title: 'Predikta',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: 'https://predikta.rafitojuan.my.id/',
      icon: 'https://predikta.rafitojuan.my.id/heart.svg'
    },
    {
      title: 'Mutameda',
      description: 'Another manual project description. Add as many projects as you like in this array.',
      tags: ['Tool A', 'Tool B', 'Tool C'],
      link: 'https://mutameda.rafitojuan.my.id/',
      icon: '/Logo-Purple.png'
    },
  ];

  function openAllProjects() {
    showAllProjects = true;
  }
</script>

<section id="projects" class="py-12 border-b border-zinc-900/50">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-900/50 h-full">
    <div class="flex items-center justify-between mb-8 sticky top-14 z-10 bg-black/90 backdrop-blur-sm py-4 border-b border-zinc-800/50">
      <h2 class="text-xl font-bold text-white">Projects</h2>
      {#if !showAllProjects}
        <button on:click={openAllProjects} class="text-sm text-zinc-500 hover:text-white transition-colors">View all projects →</button>
      {/if}
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each projects as project}
        <a href={project.link} target="_blank" rel="noopener noreferrer" class="group block p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300">
          <div class="flex justify-between items-start mb-4">
            <div class="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              {#if project.icon.startsWith('http') || project.icon.startsWith('/')}
                <img src={project.icon} alt={project.title} class="w-full h-full object-contain p-1" />
              {:else if project.icon.startsWith('<svg')}
                <div class="w-full h-full p-1 flex items-center justify-center">
                  {@html project.icon}
                </div>
              {:else}
                {project.icon}
              {/if}
            </div>
            <svg class="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          
          <h3 class="font-bold text-white mb-2 group-hover:text-zinc-200 transition-colors">
            {project.title}
          </h3>
          
          <p class="text-sm text-zinc-400 mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
          
          <div class="flex flex-wrap gap-2">
            {#each project.tags as tag}
              <span class="px-2 py-1 text-xs font-medium text-zinc-500 bg-zinc-900 border border-zinc-800 rounded">
                {tag}
              </span>
            {/each}
          </div>
        </a>
      {/each}

      {#if showAllProjects}
        {#each additionalProjects as project, i (i)}
          <a href={project.link} target="_blank" rel="noopener noreferrer"
             class="group block p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300 h-full flex flex-col"
             in:fly={{ y: 20, delay: (i % 12) * 50, duration: 300 }}>
            
            <div class="flex justify-between items-start mb-4">
              <div class="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                {#if project.icon.startsWith('http') || project.icon.startsWith('/')}
                <img src={project.icon} alt={project.title} class="w-full h-full object-contain p-1" />
              {:else if project.icon.startsWith('<svg')}
                <div class="w-full h-full p-1 flex items-center justify-center">
                  {@html project.icon}
                </div>
              {:else}
                {project.icon}
              {/if}
              </div>
              <svg class="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            
            <h3 class="font-bold text-white mb-2 group-hover:text-zinc-200 transition-colors line-clamp-1">
              {project.title}
            </h3>
            
            <p class="text-sm text-zinc-400 mb-4 line-clamp-3 leading-relaxed flex-grow">
              {project.description}
            </p>
            
            <div class="flex flex-wrap gap-2 mt-auto">
              {#each project.tags.slice(0, 3) as tag}
                <span class="px-2 py-1 text-xs font-medium text-zinc-500 bg-zinc-900 border border-zinc-800 rounded">
                  {tag}
                </span>
              {/each}
              {#if project.tags.length > 3}
                <span class="px-2 py-1 text-xs font-medium text-zinc-500 bg-zinc-900 border border-zinc-800 rounded">
                  +{project.tags.length - 3}
                </span>
              {/if}
            </div>
          </a>
        {/each}
      {/if}
    </div>
  </div>
</section>
