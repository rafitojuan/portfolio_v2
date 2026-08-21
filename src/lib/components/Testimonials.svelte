<script lang="ts">
  interface Testimonial {
    quote: string;
    author: string;
    role: string;
    image?: string;
    tag?: string;
  }

  const testimonials: Testimonial[] = [
    {
      quote: "Perfect for rapid MVP development; highly responsive to issues and exceptionally quick to resolve backend bugs.",
      author: "Randi Apriansyah",
      role: "CEO of Gravix",
      tag: "Client · Singapore & ID",
      image: "https://media.licdn.com/dms/image/v2/D5603AQHYnJMoTxmGMg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1696472732033?e=1775088000&v=beta&t=-1NGAeTH-5Bjaf6qbz12j5yQpjqR3zVAnfJDOdacilo"
    },
    {
      quote: "Exceptional at handling complex projects. Great communication and always provides the most resilient technical solutions.",
      author: "Mr. Rob",
      role: "Founder of Webapp Studio",
      tag: "Client · Malaysia EdTech",
      image: "https://bo.mpsonline.cloud/images/iconWebMaster.png"
    },
    {
      quote: "Delivers high-quality code that consistently adheres to clean architecture and industry best practices.",
      author: "Ari Maulana",
      role: "Project Manager for QarirGenerator",
      tag: "Project Lead",
      image: "https://media.licdn.com/dms/image/v2/D5603AQGRdU8IfAg2AA/profile-displayphoto-scale_200_200/B56Zh_s3gbHMAY-/0/1754489127337?e=1775088000&v=beta&t=PpeB-HEwR9jhmF0uyVGkuF0Eiv2fcNOSpOnwZYu_6e4"
    },
    {
      quote: "A versatile all-around developer who learns quickly and adapts seamlessly to mission-critical environments.",
      author: "Ariz Karlim",
      role: "Senior Asst. Officer at EPI",
      tag: "Enterprise SOE",
      image: "https://i0.wp.com/maritimindonesia.id/wp-content/uploads/2025/05/IMG-20250521-WA0037-scaled.jpg?fit=800%2C600&ssl=1"
    },
    {
      quote: "Highly innovative in developing our web-based attendance system. Quick to resolve edge cases and very open to feedback.",
      author: "Iqbar Ramadhityo",
      role: "Accounting Staff at EPI",
      tag: "Enterprise SOE",
      image: "/iqbar.jpg"
    },
    {
      quote: "Combines strong technical expertise with creative problem-solving. His system solutions consistently exceed expectations.",
      author: "Iqbal Baihaqi",
      role: "Operation & Technical Staff at EPI",
      tag: "Enterprise SOE",
      image: "/iqbal.jpg"
    },
    {
      quote: "I provide the backend requirements, and he seamlessly integrates it with clean, efficient, and responsive frontend code.",
      author: "Putra Setyonugroho",
      role: "Backend & Fullstack Developer",
      tag: "Engineering Peer",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQGWPRvqrFWJ9Q/profile-displayphoto-scale_200_200/B4EZh47KHtHgAY-/0/1754375432537?e=1775088000&v=beta&t=i2-NbUUt22mrlLdHszV5Iz_LQ4aiQ47LGw42j6drZy4"
    },
    {
      quote: "Great visual aesthetic sense, strong work ethic, and wonderful personality to collaborate with on design & web.",
      author: "Aliya Angel",
      role: "Graphic Designer & Artist",
      tag: "Design Collaborator",
      image: "/aliya.jpeg"
    }
  ];
</script>

<section id="testimonials" class="py-12 border-b border-zinc-200 dark:border-zinc-900/50 scroll-mt-14">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 border-x border-zinc-200 dark:border-zinc-900/50 h-full">
    
    <!-- Section Header -->
    <div class="flex items-baseline justify-between mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800/80">
      <div class="flex items-center gap-3">
        <span class="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500">08 /</span>
        <h2 class="text-xl sm:text-2xl font-bold font-display tracking-tight text-zinc-950 dark:text-white">
          Client & Colleague Endorsements
        </h2>
      </div>
      <span class="text-xs font-mono text-zinc-500">Authentic Feedback</span>
    </div>

    <!-- Editorial Quote Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {#each testimonials as item}
        <div class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/80 shadow-xs dark:shadow-none flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
          
          <div>
            <!-- Tag & Quote Symbol -->
            <div class="flex items-center justify-between mb-3 text-xs font-mono text-zinc-400 dark:text-zinc-500">
              <span class="px-2 py-0.5 rounded text-[10px] bg-zinc-100 dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/60">
                {item.tag}
              </span>
              <span class="text-lg font-serif opacity-40">“</span>
            </div>

            <!-- Quote Body -->
            <p class="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic mb-6">
              "{item.quote}"
            </p>
          </div>

          <!-- Author Info with Verified Photo -->
          <div class="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
            {#if item.image}
              <img
                src={item.image}
                alt={item.author}
                class="w-9 h-9 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 bg-zinc-100 shrink-0"
              />
            {:else}
              <div class="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-600 dark:text-zinc-400 shrink-0">
                {item.author[0]}
              </div>
            {/if}

            <div class="min-w-0">
              <h3 class="text-xs sm:text-sm font-bold font-display text-zinc-900 dark:text-zinc-100 truncate">
                {item.author}
              </h3>
              <p class="text-[11px] font-mono text-zinc-500 truncate">
                {item.role}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
