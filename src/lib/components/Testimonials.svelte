<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

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
      image: "https://media.licdn.com/dms/image/v2/D5603AQHYnJMoTxmGMg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1696472732033?e=1775088000&v=beta&t=-1NGAeTH-5Bjaf6qbz12j5yQpjqR3zVAnfJDOdacilo"
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
      image: "https://media.licdn.com/dms/image/v2/D5603AQGRdU8IfAg2AA/profile-displayphoto-scale_200_200/B56Zh_s3gbHMAY-/0/1754489127337?e=1775088000&v=beta&t=PpeB-HEwR9jhmF0uyVGkuF0Eiv2fcNOSpOnwZYu_6e4"
    },
    {
      quote: "A versatile all-around developer who learns quickly and adapts seamlessly to new environments.",
      author: "Ariz Karlim",
      role: "Senior Asst Officer at EPI",
      image: "https://i0.wp.com/maritimindonesia.id/wp-content/uploads/2025/05/IMG-20250521-WA0037-scaled.jpg?fit=800%2C600&ssl=1"
    },
    {
      quote: "Love his personality and his works.",
      author: "Aliya Angel",
      role: "Graphic designer and Artist",
      image: "/aliya.jpeg"
    },
    {
      quote: "I provide the backend, and he seamlessly integrates it with clean, efficient frontend code.",
      author: "Putra Setyonugroho",
      role: "Backend and Fullstack Developer also my best buddies",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQGWPRvqrFWJ9Q/profile-displayphoto-scale_200_200/B4EZh47KHtHgAY-/0/1754375432537?e=1775088000&v=beta&t=i2-NbUUt22mrlLdHszV5Iz_LQ4aiQ47LGw42j6drZy4"
    },
    {
      quote: "Highly innovative in developing our web-based attendance system. Quick to resolve bugs and very open to feedback.",
      author: "Iqbar Ramadhityo",
      role: "Accounting Staff at EPI",
      image : "/iqbar.jpg"
    },
    {
      quote: "Combines strong technical expertise with limitless creativity. His innovative solutions consistently exceed expectations.",
      author: "Iqbal Baihaqi",
      role: "Operation and Technical Staff at EPI",
      image: "/iqbal.jpg"
    },
  ];

  const row1Items = [...testimonials];
  const row2Items = [...testimonials].reverse();

  let sectionElement: HTMLElement;
  let isVisible = false;
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
    if (!isVisible) return;

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
    
    if ('touches' in e && e.cancelable) {
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

  onMount(() => {
    row2X = -SINGLE_SET_WIDTH;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible = true;
          cancelAnimationFrame(animationFrameId);
          animate();
        } else {
          isVisible = false;
          cancelAnimationFrame(animationFrameId);
        }
      });
    }, { threshold: 0.1 });

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  });
</script>

<section bind:this={sectionElement} class="py-24 bg-zinc-100/50 dark:bg-zinc-950 relative overflow-hidden border-y border-zinc-200 dark:border-zinc-900/50 transition-colors duration-200">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 h-full overflow-hidden">
    <div class="mb-16 text-center space-y-3">
      <h2 class="text-3xl sm:text-4xl font-bold text-zinc-950 dark:text-white tracking-tight">
        Trusted by Teams & Colleagues
      </h2>
      <p class="text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
        Building high-quality, reliable software that delivers real-world impact.
      </p>
    </div>

    <div class="flex flex-col gap-8 w-full">
      <!-- Row 1 -->
      <div class="relative w-full mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" role="region" aria-label="Client testimonials continuous slider, row 1">
        <div 
          role="presentation"
          class="flex w-max py-2 cursor-grab active:cursor-grabbing rounded-lg select-none"
          style="transform: translateX(-{row1X}px)"
          on:mousedown={(e) => handleMouseDown(e, 1)}
          on:touchstart={(e) => handleMouseDown(e, 1)}
          on:mousemove={handleMouseMove}
          on:touchmove={handleMouseMove}
        >
          <!-- Loop set 1 -->
          <div class="flex shrink-0 gap-6 px-3">
            {#each row1Items as testimonial}
              <div class="w-[420px] shrink-0 bg-white dark:bg-zinc-900/40 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/70 transition-all duration-200 flex flex-col justify-between shadow-sm dark:shadow-lg">
                <div class="mb-5">
                  <p class="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed font-normal">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div class="border-t border-zinc-200 dark:border-zinc-800/80 pt-4 flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-semibold overflow-hidden shrink-0">
                    {#if testimonial.image}
                      <img src={testimonial.image} alt={testimonial.author} class="w-full h-full object-cover" loading="lazy" />
                    {:else}
                      {testimonial.author.charAt(0)}
                    {/if}
                  </div>
                  <div>
                    <div class="text-zinc-900 dark:text-zinc-100 font-semibold text-sm">{testimonial.author}</div>
                    <div class="text-zinc-500 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <!-- Loop set 2 for infinite wrap -->
          <div class="flex shrink-0 gap-6 px-3" aria-hidden="true">
            {#each row1Items as testimonial}
              <div class="w-[420px] shrink-0 bg-white dark:bg-zinc-900/40 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/70 transition-all duration-200 flex flex-col justify-between shadow-sm dark:shadow-lg">
                <div class="mb-5">
                  <p class="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed font-normal">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div class="border-t border-zinc-200 dark:border-zinc-800/80 pt-4 flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-semibold overflow-hidden shrink-0">
                    {#if testimonial.image}
                      <img src={testimonial.image} alt="" class="w-full h-full object-cover" loading="lazy" />
                    {:else}
                      {testimonial.author.charAt(0)}
                    {/if}
                  </div>
                  <div>
                    <div class="text-zinc-900 dark:text-zinc-100 font-semibold text-sm">{testimonial.author}</div>
                    <div class="text-zinc-500 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Row 2 -->
      <div class="relative w-full mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" role="region" aria-label="Client testimonials continuous slider, row 2">
        <div 
          role="presentation"
          class="flex w-max py-2 cursor-grab active:cursor-grabbing rounded-lg select-none"
          style="transform: translateX({row2X}px)"
          on:mousedown={(e) => handleMouseDown(e, 2)}
          on:touchstart={(e) => handleMouseDown(e, 2)}
          on:mousemove={handleMouseMove}
          on:touchmove={handleMouseMove}
        >
          <!-- Loop set 1 -->
          <div class="flex shrink-0 gap-6 px-3">
            {#each row2Items as testimonial}
              <div class="w-[420px] shrink-0 bg-white dark:bg-zinc-900/40 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/70 transition-all duration-200 flex flex-col justify-between shadow-sm dark:shadow-lg">
                <div class="mb-5">
                  <p class="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed font-normal">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div class="border-t border-zinc-200 dark:border-zinc-800/80 pt-4 flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-semibold overflow-hidden shrink-0">
                    {#if testimonial.image}
                      <img src={testimonial.image} alt={testimonial.author} class="w-full h-full object-cover" loading="lazy" />
                    {:else}
                      {testimonial.author.charAt(0)}
                    {/if}
                  </div>
                  <div>
                    <div class="text-zinc-900 dark:text-zinc-100 font-semibold text-sm">{testimonial.author}</div>
                    <div class="text-zinc-500 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <!-- Loop set 2 for infinite wrap -->
          <div class="flex shrink-0 gap-6 px-3" aria-hidden="true">
            {#each row2Items as testimonial}
              <div class="w-[420px] shrink-0 bg-white dark:bg-zinc-900/40 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/70 transition-all duration-200 flex flex-col justify-between shadow-sm dark:shadow-lg">
                <div class="mb-5">
                  <p class="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed font-normal">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div class="border-t border-zinc-200 dark:border-zinc-800/80 pt-4 flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-semibold overflow-hidden shrink-0">
                    {#if testimonial.image}
                      <img src={testimonial.image} alt="" class="w-full h-full object-cover" loading="lazy" />
                    {:else}
                      {testimonial.author.charAt(0)}
                    {/if}
                  </div>
                  <div>
                    <div class="text-zinc-900 dark:text-zinc-100 font-semibold text-sm">{testimonial.author}</div>
                    <div class="text-zinc-500 text-xs">{testimonial.role}</div>
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
