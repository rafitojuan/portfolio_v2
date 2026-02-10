<script>
  import SocialGrid from './SocialGrid.svelte';
</script>

<section id="home" class="pt-24 pb-12">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <!-- Profile Header -->
    <div class="relative bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 mb-12">
      <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
        
        <!-- Profile Picture -->
        <div class="relative group">
          <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-800 group-hover:border-green-500/50 transition-colors duration-300">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Profile" 
              class="w-full h-full object-cover bg-zinc-800"
            />
          </div>
          <div class="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-zinc-900 rounded-full"></div>
        </div>

        <!-- Info -->
        <div class="flex-1 text-center md:text-left space-y-4">
          <div>
            <div class="flex items-center justify-center md:justify-start gap-2">
              <h1 class="text-3xl font-bold text-white">Abdul Rehman</h1>
              <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </div>
            <p class="text-zinc-500 font-mono text-sm mt-1">@AbdulRehmanWaseem</p>
          </div>

          <!-- Info Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-zinc-400">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <span>Senior Fullstack Developer</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>Remote (Global)</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
              <span>GMT +5 (Islamabad)</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <span>contact@abdulrehman.me</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Social Grid -->
    <SocialGrid />
    
  </div>
</section>
