<script>
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { lenis } from '../stores/lenis.js';

  let showAllProjects = false;
  let isStuck = false;
  let sentinel;

  const projects = [
    {
      title: 'MPSOnline',
      description: 'A comprehensive cloud-based School Management System streamlining administrative tasks for Malaysian educational institutions.',
      tags: ['Laravel', 'RestAPI', 'Microservice Architecture', 'Toyyibpay', 'GCP', 'Github Actions','OpenAI'],
      link: 'https://mpsonline.cloud/',
      icon: 'https://mpsonline.cloud/images/Logo_MPS.png'
    },
    {
      title: 'Qarirhack',
      description: 'An AI-powered career acceleration platform offering personalized roadmaps, CV reviews, and global job matching strategies for a Singaporean client.',
      tags: ['ReactJS', 'Laravel', 'RestAPI', 'OpenAI','Github Actions'],
      link: 'https://qarirhack.gravix.my.id/',
      icon: 'https://media.licdn.com/dms/image/v2/D4D0BAQFH7s4M9mGesw/company-logo_200_200/company-logo_200_200/0/1682788922562/qarirlabscom_logo?e=1773273600&v=beta&t=pFs97UTmZ9BALamn-umSovbDGyyIMvlDJ6rjL35LOvQ'
    },
    {
      title: 'RPHClick',
      description: 'AI-driven Daily Lesson Plan (RPH) generator tailored for Malaysian educators, automating curriculum planning with intelligent suggestions.',
      tags: ['Laravel', 'RestAPI', 'Microservice Architecture', 'Toyyibpay', 'GCP', 'Github Actions','OpenAI'],
      link: 'http://rphclick.cloud/',
      icon: 'https://bo.mpsonline.cloud/images/iconWebMaster.png'
    },
    {
      title: 'Webapp Backoffice',
      description: 'Centralized administrative dashboard managing multiple ecosystem products including MPSOnline and RPHClick, featuring real-time analytics.',
      tags: ['Laravel', 'RestAPI', 'Microservice Architecture', 'Toyyibpay', 'GCP', 'Github Actions','OpenAI'],
      link: 'https://bo.mpsonline.cloud/',
      icon: 'https://bo.mpsonline.cloud/images/iconWebMaster.png'
    },
  ];

  const additionalProjects = [
    {
      title: 'AP2EPI',
      description: 'Integrated internal Customer Service application for Energi Pelabuhan Indonesia (EPI), unifying support tickets and operational workflows.',
      tags: ['Laravel', 'RestAPI', 'Grafana', 'Centralized Backend', 'Cloud Server', 'Github Actions','Nginx','Sentry','Cloudflare'],
      link: 'https://epionline.id/',
      icon: 'https://epionline.id/assets/img/logoepi.jpg'
    },
    {
      title: 'Glide',
      description: 'Efficient project management tool designed to streamline team collaboration, task tracking, and workflow optimization.',
      tags: ['Laravel', 'Livewire', 'AlpineJS', 'Github Actions','Cloudflare'],
      link: 'https://glide.epionline.id/',
      icon: 'https://glide.epionline.id/build/images/logo_project_board.png'
    },
    {
      title: 'Company Profile',
      description: 'Official corporate website for Energi Pelabuhan Indonesia (EPI), showcasing company services, milestones, and operational excellence.',
      tags: ['Wordpress', 'Elementor', 'Cloudflare'],
      link: 'https://energipelabuhan.co.id/',
      icon: 'https://epionline.id/assets/img/logoepi.jpg'
    },
    {
      title: 'EPILog',
      description: 'Operational expense management system for tracking HR and general administrative costs at Energi Pelabuhan Indonesia.',
      tags: ['ReactJS', 'Tailwind', 'PWA'],
      link: 'https://epilog.rafitojuan.my.id/data',
      icon: 'https://epionline.id/assets/img/logoepi.jpg'
    },
    {
      title: 'General Affairs',
      description: 'Internal portal for managing corporate resources, including meeting room reservations, vehicle fleet scheduling, and general affairs requests.',
      tags: ['Laravel', 'RestAPI', 'Grafana', 'Centralized Backend', 'Cloud Server', 'Github Actions','Nginx','Sentry','Cloudflare'],
      link: 'https://epionline.id',
      icon: 'https://epionline.id/assets/img/logoepi.jpg'
    },
    {
      title: 'EPI Docs',
      description: 'Comprehensive backend API documentation and developer portal for Energi Pelabuhan Indonesia\'s internal systems.',
      tags: ['Laravel', 'Scramble Dedoc', 'Markdown', 'Cloudflare'],
      link: 'https://epionline.id/api/v1.0/docs',
      icon: 'https://epionline.id/assets/img/logoepi.jpg'
    },
    {
      title: 'PresenX',
      description: 'Digital attendance management system designed for interns at Energi Pelabuhan Indonesia, streamlining check-ins and activity reporting.',
      tags: ['ReactJS', 'NextJS', 'Tailwind','Cloudflare'],
      link: 'https://presenx.epionline.id/',
      icon: 'https://epionline.id/assets/img/logoepi.jpg'
    },
    {
      title: 'EPI Backend System',
      description: 'Core backend infrastructure powering Energi Pelabuhan Indonesia\'s digital ecosystem, handling data processing and service integration.',
      tags: ['Laravel', 'RestAPI', 'Centralized Backend', 'Clean Architecture', 'Grafana', 'Sentry', 'Nginx', 'Cloudflare'],
      link: 'https://epionline.id/api/v1.0/docs',
      icon: 'https://epionline.id/assets/img/logoepi.jpg'
    },
    {
      title: 'EPI Electric',
      description: 'Customer-facing mobile application for electrical utility management, featuring bill payments, power upgrades, and usage monitoring.',
      tags: ['Flutter', 'Dart', 'RestAPI'],
      link: '#',
      icon: '/Logo-Purple.png'
    },
    {
      title: 'Clinico API',
      description: 'Robust backend API architecture for Clinico, a healthcare management platform serving the Malaysian market.',
      tags: ['Laravel', 'RestAPI', 'Clean Architecture'],
      link: '#',
      icon: 'https://api.clinico.site/storage/clinic_profile/hsL8rpOYJkm7QXxNOSOxgQXl2qxQNJwUwT9DdhoR.png'
    },
    {
      title: 'Portfolio Website V1',
      description: 'My inaugural portfolio website, marking the beginning of my journey in web development and design.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Tailwind', 'Github'],
      link: 'https://rafitojuan.github.io/portofolio/',
      icon: '/Logo-Purple.png'
    },
    {
      title: 'AI Portfolio Website',
      description: 'Interactive portfolio featuring an integrated AI chat assistant, showcasing early experimentation with conversational interfaces.',
      tags: ['ReactJS', 'NextJS', 'Framer Motion', 'Tailwind', 'OpenAI', 'Vercel'],
      link: 'https://rafitojuan.my.id/',
      icon: '/Logo-Purple.png'
    },
    {
      title: 'Portfolio Website V2',
      description: 'The current iteration of my professional portfolio, built with Svelte and Tailwind CSS to demonstrate modern frontend capabilities.',
      tags: ['Svelte', 'Tailwind', 'Lenis' , 'Vercel'],
      link: 'https://rafitojuan.my.id/portfolio/',
      icon: '/Logo-Purple.png'
    },
    {
      title: 'Wordpress Loadtesting',
      description: 'Python-based load testing script designed to benchmark and analyze the performance of WordPress installations under high traffic.',
      tags: ['Python'],
      link: 'https://github.com/rafitojuan/wordpress-loadtesting',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><g fill="#00749a" clip-path="url(#a)"><path d="M7.107 49.999c0 16.979 9.867 31.65 24.175 38.604L10.82 32.543a42.7 42.7 0 0 0-3.714 17.456m71.85-2.165c0-5.3-1.904-8.972-3.537-11.83-2.175-3.532-4.212-6.524-4.212-10.058 0-3.943 2.99-7.613 7.202-7.613.19 0 .37.024.557.034-7.632-6.991-17.8-11.26-28.966-11.26-14.985 0-28.169 7.689-35.839 19.334 1.007.03 1.956.05 2.76.05 4.487 0 11.432-.544 11.432-.544 2.312-.136 2.585 3.26.276 3.533 0 0-2.325.274-4.91.41l15.62 46.46 9.387-28.152-6.683-18.31c-2.31-.135-4.498-.409-4.498-.409-2.312-.135-2.04-3.669.27-3.533 0 0 7.084.545 11.299.545 4.486 0 11.431-.545 11.431-.545 2.314-.136 2.586 3.26.275 3.534 0 0-2.328.273-4.909.408l15.5 46.11L75.69 61.7c1.856-5.932 3.267-10.194 3.267-13.866"/><path d="m50.753 53.75-12.87 37.396a42.9 42.9 0 0 0 12.118 1.748 42.9 42.9 0 0 0 14.243-2.43 3.6 3.6 0 0 1-.305-.592zm36.885-24.33c.184 1.366.288 2.834.288 4.41 0 4.353-.812 9.246-3.261 15.364L71.563 87.075C84.315 79.64 92.893 65.824 92.893 50a42.66 42.66 0 0 0-5.255-20.58"/><path d="M50 0C22.43 0 0 22.43 0 49.999 0 77.57 22.43 100 50 100s50.003-22.429 50.003-50.002C100.003 22.429 77.569 0 50.001 0m0 97.708c-26.305 0-47.707-21.402-47.707-47.71C2.293 23.695 23.694 2.294 50 2.294c26.304 0 47.705 21.401 47.705 47.706 0 26.307-21.402 47.71-47.705 47.71"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>'
    },
    {
      title: 'CIV VI advanced cheat menu patch',
      description: 'Community patch for Civilization VI, enhancing the debug menu with advanced cheat functionalities for gameplay testing.',
      tags: ['Lua Script', 'Modding', 'GUI'],
      link: 'https://github.com/rafitojuan/civilization-vi-advanced-cheat-menu-fix',
      icon: '/civvi.png'
    },
    {
      title: 'Simple NFC',
      description: 'Desktop utility for reading and writing NFC tags, simplifying hardware interaction for developers and hobbyists.',
      tags: ['ReactJS', 'Tailwind', 'Vercel'],
      link: 'https://nfc.rafitojuan.my.id/',
      icon: '/Logo-Purple.png'
    },
    {
      title: 'Pomore',
      description: 'Productivity tool combining a Pomodoro timer with an ad-free YouTube player to maintain focus and flow state.',
      tags: ['ReactJS', 'Tailwind', 'Youtube API V3', 'Framer Motion' , 'Vercel'],
      link: 'https://pomore.rafitojuan.my.id/',
      icon: '/Logo-Purple.png'
    },
    {
      title: 'Predikta',
      description: 'Entertaining algorithmic tool that analyzes name compatibility to generate relationship prediction scores.',
      tags: ['ReactJS', 'Tailwind', 'Framer Motion', 'Vercel'],
      link: 'https://predikta.rafitojuan.my.id/',
      icon: 'https://predikta.rafitojuan.my.id/heart.svg'
    },
    {
      title: 'Mutameda',
      description: 'Mood tracking application designed to help users monitor emotional well-being and identify patterns over time.',
      tags: ['Ruby', 'Ruby on Rails', 'Tailwind'],
      link: 'https://mutameda.rafitojuan.my.id/',
      icon: '/Logo-Purple.png'
    },
  ];

  function toggleProjects() {
    showAllProjects = !showAllProjects;
    if (!showAllProjects) {
      if ($lenis) {
        $lenis.scrollTo('#projects');
      } else {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isStuck = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      },
      { rootMargin: '-1px 0px 0px 0px', threshold: [1] }
    );
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  });
</script>

<section id="projects" class="py-12 border-b border-zinc-900/50">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-900/50 h-full relative">
    <div bind:this={sentinel} class="absolute -top-14 h-1 w-full pointer-events-none opacity-0"></div>
    <div class={`flex items-center justify-between mb-8 sticky top-14 z-10 py-4 border-b border-zinc-800/50 transition-colors duration-300 ${isStuck ? 'bg-black/90 backdrop-blur-sm' : ''}`}>
      <div class="flex items-center gap-3">
        <h2 class="text-xl font-bold text-white">Projects</h2>
        <span class="text-zinc-500 text-sm font-mono">({projects.length + additionalProjects.length})</span>
      </div>
      <button on:click={toggleProjects} class="text-sm text-zinc-500 hover:text-white transition-colors">
        {showAllProjects ? 'See less ↑' : 'View all projects →'}
      </button>
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
          
          <p class="text-sm text-zinc-400 mb-4 leading-relaxed">
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
             class="group block p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300 h-full flex-col"
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
            
            <p class="text-sm text-zinc-400 mb-4 leading-relaxed grow">
              {project.description}
            </p>
            
            <div class="flex flex-wrap gap-2 mt-auto">
              {#each project.tags as tag}
                <span class="px-2 py-1 text-xs font-medium text-zinc-500 bg-zinc-900 border border-zinc-800 rounded">
                  {tag}
                </span>
              {/each}
            </div>
          </a>
        {/each}
      {/if}
    </div>
  </div>
</section>
