<script lang="ts">
  import { onMount } from 'svelte';

  interface Testimonial {
    quote: string;
    author: string;
    role: string;
    image?: string;
  }

  const testimonials: Testimonial[] = [
    {
      quote: "Perfect for rapid MVP development; highly responsive to issues and quick to resolve bugs.",
      author: "Randi Apriansyah",
      role: "CEO of Gravix",
      image: "https://media.licdn.com/dms/image/v2/D5603AQHYnJMoTxmGMg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1696472732033?e=1773273600&v=beta&t=Vb_HTrRqGA7h8mFcJl-xl8iCYIlRIPPh4bYWmajP430"
    },
    {
      quote: "Exceptional at handling complex projects. Great communication and always provides the best technical solutions.",
      author: "Mr. Rob",
      role: "Founder of Webapp Studio",
      image: "https://bo.mpsonline.cloud/images/iconWebMaster.png"
    },
    {
      quote: "Delivers high-quality code that consistently adheres to industry best practices.",
      author: "Ari Maulana",
      role: "Project Manager for QarirGenerator",
      image: "https://media.licdn.com/dms/image/v2/D5603AQGRdU8IfAg2AA/profile-displayphoto-scale_200_200/B56Zh_s3gbHMAY-/0/1754489127337?e=1773273600&v=beta&t=_BIdE8nPYR-Qye0mozYPAJfn8MD-hJ7cAf_ylXYqOvU"
    },
    {
      quote: "A versatile all-around developer who learns quickly and adapts seamlessly to new environments.",
      author: "Ariz Karlim",
      role: "Senior Asst Officer at EPI",
      image: "https://ecopowerport.co.id/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-21-at-11.41.02-1080x675.jpeg"
    },
    {
      quote: "Always brings a unique perspective and creative energy to our collaborations.",
      author: "Aliya Angel",
      role: "Graphic designer and Artist"
    },
    {
      quote: "I provide the backend, and he seamlessly integrates it with clean, efficient frontend code.",
      author: "Putra Setyonugroho",
      role: "Backend and Fullstack Developer also my best buddies",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQGWPRvqrFWJ9Q/profile-displayphoto-scale_200_200/B4EZh47KHtHgAY-/0/1754375432537?e=1773273600&v=beta&t=zxjOBFuInzVhg7XZAKR9Wbdrzog2fpW1eXPjw-NoKhA"
    },
    {
      quote: "Highly innovative in developing our web-based attendance system. Quick to resolve bugs and very open to feedback.",
      author: "Iqbar Ramadhityo",
      role: "Accounting Staff at EPI",
      image : "/iqbar.jpg"
    },
    {
      quote: "Consistently delivers clean, scalable components. Excellent collaboration during production deployments.",
      author: "Iqbal Baihaqi",
      role: "Operation and Technical Staff at EPI",
      image: "/iqbal.jpg"
    },
  ];

  const row1Items = [...testimonials, ...testimonials, ...testimonials, ...testimonials];
  const row2Items = [...testimonials, ...testimonials, ...testimonials, ...testimonials].reverse();

  let row1X = 0;
  let row2X = 0;
  let isDragging1 = false;
  let isDragging2 = false;
  let startX1 = 0;
  let startX2 = 0;
  let animationFrameId: number;
  
  const SPEED = 0.5;
  const ITEM_WIDTH = 450;
  const GAP = 24;
  const SINGLE_SET_WIDTH = (ITEM_WIDTH + GAP) * testimonials.length;

  function animate() {
    if (!isDragging1) {
      row1X += SPEED;
      if (row1X >= SINGLE_SET_WIDTH) {
        row1X = 0;
      }
    }

    if (!isDragging2) {
      row2X += SPEED; 
      if (row2X >= 0) {
        row2X = -SINGLE_SET_WIDTH;
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  function handleMouseDown(e: MouseEvent | TouchEvent, row: 1 | 2) {
    if ('button' in e && e.button !== 0) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    if (row === 1) {
      isDragging1 = true;
      startX1 = clientX;
    } else {
      isDragging2 = true;
      startX2 = clientX;
    }
  }

  function handleMouseMove(e: MouseEvent | TouchEvent) {
    if (!isDragging1 && !isDragging2) return;
    
    if ('touches' in e) {
      e.preventDefault();
    }
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    
    if (isDragging1) {
      const delta = startX1 - clientX;
      row1X += delta;
    
      startX1 = clientX;
    }
    
    if (isDragging2) {
      const delta = clientX - startX2;
      row2X += delta;
      startX2 = clientX;
    }
  }

  function handleMouseUp() {
    isDragging1 = false;
    isDragging2 = false;
  }

  function handleKeyDown(e: KeyboardEvent, row: 1 | 2) {
    const STEP = 50;
    if (row === 1) {
      if (e.key === 'ArrowRight') row1X += STEP;
      if (e.key === 'ArrowLeft') row1X -= STEP;
    } else {
      if (e.key === 'ArrowRight') row2X += STEP;
      if (e.key === 'ArrowLeft') row2X -= STEP;
    }
  }

  onMount(() => {
    row2X = -SINGLE_SET_WIDTH;
    
    animate();
    
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  });

</script>



<section class="py-32 bg-zinc-950 relative overflow-hidden border-y border-white/5">
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950 to-zinc-950 opacity-70"></div>
  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
  <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
  
  <div class="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 h-full overflow-hidden">
    <div class="mb-20 text-center space-y-4">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-white/10 mb-4 backdrop-blur-sm">
        <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        <span class="text-xs font-medium text-zinc-400 tracking-wide uppercase">Client Feedback</span>
      </div>
      <h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-200 to-zinc-500 tracking-tight">
        Trusted by Teams
      </h2>
      <p class="text-zinc-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
        Building high-quality software that scales with your business needs.
      </p>
    </div>

    <div class="flex flex-col gap-12 w-full">
      <div class="relative w-full mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div 
          role="region"
          aria-label="Testimonials row 1"
          tabindex="0"
          class="flex w-max py-4 cursor-grab active:cursor-grabbing outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-lg"
          style="transform: translateX(-{row1X}px)"
          on:mousedown={(e) => handleMouseDown(e, 1)}
          on:touchstart={(e) => handleMouseDown(e, 1)}
          on:mousemove={handleMouseMove}
          on:touchmove={handleMouseMove}
          on:keydown={(e) => handleKeyDown(e, 1)}
        >
          <div class="flex shrink-0 gap-6 px-3">
            {#each row1Items as testimonial}
              <div class="w-[450px] relative group perspective-1000">
                <div class="absolute -inset-0.5 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition duration-500 group-hover:duration-200"></div>
                
                <div class="relative h-full bg-zinc-900/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 flex flex-col justify-between group-hover:border-white/10 group-hover:bg-zinc-900/60 transition-all duration-300 shadow-2xl">
                  <div class="mb-6 relative">
                    <div class="absolute -top-4 -left-4 text-6xl text-white/5 font-serif select-none">"</div>
                    <p class="text-zinc-300 text-lg leading-relaxed font-light tracking-wide relative z-10">
                      {testimonial.quote}
                    </p>
                  </div>
                  
                  <div class="border-t border-dashed border-white/10 my-6 w-full group-hover:border-white/20 transition-colors"></div>
                  
                  <div class="flex items-center gap-4">
                    <div class="relative">
                      <div class="w-12 h-12 rounded-full bg-linear-to-br from-zinc-800 to-black p-px shadow-lg ring-1 ring-white/10 group-hover:ring-blue-500/30 transition-all duration-300">
                        <div class="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 font-bold text-lg group-hover:text-white transition-colors overflow-hidden">
                          {#if testimonial.image}
                            <img src={testimonial.image} alt={testimonial.author} class="w-full h-full object-cover" />
                          {:else}
                            {testimonial.author.charAt(0)}
                          {/if}
                        </div>
                      </div>
                      <div class="absolute -bottom-1 -right-1 bg-zinc-950 rounded-full p-0.5">
                        <svg class="w-4 h-4 text-blue-500 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-zinc-100 font-semibold text-base tracking-wide group-hover:text-white transition-colors">{testimonial.author}</span>
                      </div>
                      <div class="text-zinc-500 text-xs font-medium uppercase tracking-wider group-hover:text-zinc-400 transition-colors">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <div class="flex shrink-0 gap-6 px-3">
            {#each row1Items as testimonial}
              <div class="w-[450px] relative group perspective-1000">
                <div class="absolute -inset-0.5 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition duration-500 group-hover:duration-200"></div>
                
                <div class="relative h-full bg-zinc-900/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 flex flex-col justify-between group-hover:border-white/10 group-hover:bg-zinc-900/60 transition-all duration-300 shadow-2xl">
                  <div class="mb-6 relative">
                    <div class="absolute -top-4 -left-4 text-6xl text-white/5 font-serif select-none">"</div>
                    <p class="text-zinc-300 text-lg leading-relaxed font-light tracking-wide relative z-10">
                      {testimonial.quote}
                    </p>
                  </div>
                  
                  <div class="border-t border-dashed border-white/10 my-6 w-full group-hover:border-white/20 transition-colors"></div>
                  
                  <div class="flex items-center gap-4">
                    <div class="relative">
                      <div class="w-12 h-12 rounded-full bg-linear-to-br from-zinc-800 to-black p-px shadow-lg ring-1 ring-white/10 group-hover:ring-blue-500/30 transition-all duration-300">
                        <div class="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 font-bold text-lg group-hover:text-white transition-colors overflow-hidden">
                          {#if testimonial.image}
                            <img src={testimonial.image} alt={testimonial.author} class="w-full h-full object-cover" />
                          {:else}
                            {testimonial.author.charAt(0)}
                          {/if}
                        </div>
                      </div>
                      <div class="absolute -bottom-1 -right-1 bg-zinc-950 rounded-full p-0.5">
                        <svg class="w-4 h-4 text-blue-500 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-zinc-100 font-semibold text-base tracking-wide group-hover:text-white transition-colors">{testimonial.author}</span>
                      </div>
                      <div class="text-zinc-500 text-xs font-medium uppercase tracking-wider group-hover:text-zinc-400 transition-colors">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <div class="relative w-full mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div 
          role="region"
          aria-label="Testimonials row 2"
          tabindex="0"
          class="flex w-max py-4 cursor-grab active:cursor-grabbing outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded-lg"
          style="transform: translateX({row2X}px)"
          on:mousedown={(e) => handleMouseDown(e, 2)}
          on:touchstart={(e) => handleMouseDown(e, 2)}
          on:mousemove={handleMouseMove}
          on:touchmove={handleMouseMove}
          on:keydown={(e) => handleKeyDown(e, 2)}
        >
          <div class="flex shrink-0 gap-6 px-3">
            {#each row2Items as testimonial}
              <div class="w-[450px] relative group perspective-1000">
                <div class="absolute -inset-0.5 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition duration-500 group-hover:duration-200"></div>
                
                <div class="relative h-full bg-zinc-900/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 flex flex-col justify-between group-hover:border-white/10 group-hover:bg-zinc-900/60 transition-all duration-300 shadow-2xl">
                  <div class="mb-6 relative">
                    <div class="absolute -top-4 -left-4 text-6xl text-white/5 font-serif select-none">"</div>
                    <p class="text-zinc-300 text-lg leading-relaxed font-light tracking-wide relative z-10">
                      {testimonial.quote}
                    </p>
                  </div>
                  
                  <div class="border-t border-dashed border-white/10 my-6 w-full group-hover:border-white/20 transition-colors"></div>
                  
                  <div class="flex items-center gap-4">
                    <div class="relative">
                      <div class="w-12 h-12 rounded-full bg-linear-to-br from-zinc-800 to-black p-px shadow-lg ring-1 ring-white/10 group-hover:ring-purple-500/30 transition-all duration-300">
                        <div class="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 font-bold text-lg group-hover:text-white transition-colors overflow-hidden">
                          {#if testimonial.image}
                            <img src={testimonial.image} alt={testimonial.author} class="w-full h-full object-cover" />
                          {:else}
                            {testimonial.author.charAt(0)}
                          {/if}
                        </div>
                      </div>
                      <div class="absolute -bottom-1 -right-1 bg-zinc-950 rounded-full p-0.5">
                        <svg class="w-4 h-4 text-blue-500 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-zinc-100 font-semibold text-base tracking-wide group-hover:text-white transition-colors">{testimonial.author}</span>
                      </div>
                      <div class="text-zinc-500 text-xs font-medium uppercase tracking-wider group-hover:text-zinc-400 transition-colors">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <div class="flex shrink-0 gap-6 px-3">
            {#each row2Items as testimonial}
              <div class="w-[450px] relative group perspective-1000">
                <div class="absolute -inset-0.5 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition duration-500 group-hover:duration-200"></div>
                
                <div class="relative h-full bg-zinc-900/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 flex flex-col justify-between group-hover:border-white/10 group-hover:bg-zinc-900/60 transition-all duration-300 shadow-2xl">
                  <div class="mb-6 relative">
                    <div class="absolute -top-4 -left-4 text-6xl text-white/5 font-serif select-none">"</div>
                    <p class="text-zinc-300 text-lg leading-relaxed font-light tracking-wide relative z-10">
                      {testimonial.quote}
                    </p>
                  </div>
                  
                  <div class="border-t border-dashed border-white/10 my-6 w-full group-hover:border-white/20 transition-colors"></div>
                  
                  <div class="flex items-center gap-4">
                    <div class="relative">
                      <div class="w-12 h-12 rounded-full bg-linear-to-br from-zinc-800 to-black p-px shadow-lg ring-1 ring-white/10 group-hover:ring-purple-500/30 transition-all duration-300">
                        <div class="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 font-bold text-lg group-hover:text-white transition-colors overflow-hidden">
                          {#if testimonial.image}
                            <img src={testimonial.image} alt={testimonial.author} class="w-full h-full object-cover" />
                          {:else}
                            {testimonial.author.charAt(0)}
                          {/if}
                        </div>
                      </div>
                      <div class="absolute -bottom-1 -right-1 bg-zinc-950 rounded-full p-0.5">
                        <svg class="w-4 h-4 text-blue-500 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-zinc-100 font-semibold text-base tracking-wide group-hover:text-white transition-colors">{testimonial.author}</span>
                      </div>
                      <div class="text-zinc-500 text-xs font-medium uppercase tracking-wider group-hover:text-zinc-400 transition-colors">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
