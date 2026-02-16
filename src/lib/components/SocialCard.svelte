<script>
  export let icon;
  export let title;
  export let subtitle;
  export let href = "#";
</script>

<a {href} target="_blank" rel="noopener noreferrer" class="group flex items-center p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-200">
  <div class="flex-shrink-0 mr-4 text-zinc-400 group-hover:text-white">
    {@html icon}
  </div>
  <div class="flex-1 min-w-0">
    <p class="text-sm font-medium text-zinc-200 truncate group-hover:text-white">
      {title}
    </p>
    <p class="text-xs text-zinc-500 truncate group-hover:text-zinc-400">
      {subtitle}
    </p>
  </div>
  <div class="flex-shrink-0 ml-2 text-zinc-600 group-hover:text-zinc-400">
    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </div>
</a>
