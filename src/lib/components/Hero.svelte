<script>
  import SocialGrid from './SocialGrid.svelte';
  import { onMount, onDestroy } from 'svelte';
  
  let time = '';
  let interval;
  
  const titles = [
    "Fullstack Developer",
    "Software Engineer",
    "Mobile Developer",
    "Data Management",
    "Wordpress Developer",
    "Database Engineer",
    "AI Engineer"
  ];
  
  let displayedText = '';
  let typingTimeout;
  let titleIndex = 0;
  let isDeleting = false;

  function typeWriter() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
      displayedText = currentTitle.substring(0, displayedText.length - 1);
    } else {
      displayedText = currentTitle.substring(0, displayedText.length + 1);
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && displayedText === currentTitle) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && displayedText === '') {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 500; 
    }

    typingTimeout = setTimeout(typeWriter, typeSpeed);
  }

  function updateTime() {
    time = new Date().toLocaleTimeString('en-US', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  onMount(() => {
    updateTime();
    interval = setInterval(updateTime, 1000);
    typeWriter();
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
    if (typingTimeout) clearTimeout(typingTimeout);
  });
</script>

<section id="home" class="pt-8 pb-8 border-b border-zinc-900/50">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-900/50 h-full">
    
    <div class="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/50">
      
      <div class="absolute inset-0 opacity-20 pointer-events-none" 
           style="background-image: repeating-linear-gradient(45deg, #3f3f46 0, #3f3f46 1px, transparent 0, transparent 10px);">
      </div>

      <div class="relative z-10 p-6 sm:p-8">
        <div class="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-8 border-b border-zinc-800/50 pb-8">
          
          <div class="relative shrink-0">
            <div class="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-zinc-900 overflow-hidden bg-zinc-800">
              <img 
                src="https://github.com/rafitojuan.png" 
                alt="Profile" 
                class="w-full h-full object-cover"
              />
            </div>
            <div class="absolute top-0 left-0 w-10 h-7 rounded overflow-hidden shadow-lg border border-zinc-700">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg" 
                alt="Indonesia Flag" 
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <div class="flex-1 text-center sm:text-left mb-2">
            <div class="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">Rafito Juan</h1>
              <svg class="w-6 h-6 text-blue-500 fill-current" viewBox="0 0 24 24">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
              </svg>
              <button class="text-zinc-500 hover:text-zinc-300 transition-colors" aria-label="Pronounce name">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                </svg>
              </button>
            </div>
            <div class="h-8 relative overflow-hidden flex items-center">
               <p class="text-xl text-zinc-400 font-medium">
                 {displayedText}<span class="animate-pulse ml-0.5">|</span>
               </p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm font-mono text-zinc-400">
          
          <div class="flex items-start gap-3 md:col-span-2">
            <div class="mt-0.5 p-1.5 rounded bg-zinc-900 border border-zinc-800 shrink-0">
              <svg class="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
            </div>
            <p>
              Software Engineer and Fullstack Developer
            </p>
          </div>

          <div class="flex items-center gap-3">
            <div class="p-1.5 rounded bg-zinc-900 border border-zinc-800 shrink-0">
              <svg class="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
            <p>Open Source Contributor</p>
          </div>

          <div class="flex items-center gap-3">
            <div class="p-1.5 rounded bg-zinc-900 border border-zinc-800 shrink-0">
              <svg class="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <p>he/him</p>
          </div>

          <div class="flex items-center gap-3">
            <div class="p-1.5 rounded bg-zinc-900 border border-zinc-800 shrink-0">
              <svg class="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <p>Jakarta, Indonesia</p>
          </div>

          <div class="flex items-center gap-3">
            <div class="p-1.5 rounded bg-zinc-900 border border-zinc-800 shrink-0">
              <svg class="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <p class="text-white">{time} (GMT+7)</p>
          </div>

          <div class="flex items-center gap-3">
            <div class="p-1.5 rounded bg-zinc-900 border border-zinc-800 shrink-0">
              <svg class="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <a href="mailto:rafitosch@gmail.com" class="hover:text-white transition-colors">rafitosch@gmail.com</a>
          </div>

          <div class="flex items-center gap-3">
            <div class="p-1.5 rounded bg-zinc-900 border border-zinc-800 shrink-0">
              <svg class="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
              </svg>
            </div>
            <a href="https://rafitojuan.my.id" target="_blank" class="hover:text-white transition-colors">rafitojuan.my.id</a>
          </div>

        </div>
      </div>
    </div>

    <div class="mt-4">
      <SocialGrid />
    </div>
    
  </div>
</section>
