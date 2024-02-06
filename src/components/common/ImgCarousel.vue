<template>
  <div
    id="default-carousel"
    class="relative m-auto w-[90%] p-[2rem] block lg:hidden bg-white rounded-lg"
    data-carousel="slide"
  >
    <!-- Carousel wrapper -->
    <div class="relative w-[70%] text-gray-900 m-auto">
      <div
        v-for="(item, index) in sliderItems"
        :key="index"
        class="m-auto"
        :class="index !== currentSlide ? 'hidden' : ''"
        data-carousel-item
      >
        <h3 class="text-3xl mb-5 uppercase">{{ item.title }}</h3>
        <p class="text-2xl mb-3">${{ item.price }}/month</p>
        <p class="text-xl mb-5 italic">
          {{ item.description }}
        </p>
        <button
          class="text-white rounded-full bg-gray-900 hover:bg-gray-700 py-4 px-5 mt-3 lg:stext-2xl text-xl"
        >
          Buy now
        </button>
      </div>
    </div>
    <!-- Slider controls -->
    <button
      type="button"
      class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-prev
      @click="
        () => {
          if (currentSlide > 0) currentSlide--;
        }
      "
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <svg
          class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
    <button
      type="button"
      class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-next
      @click="
        () => {
          if (currentSlide < sliderItems.length - 1) currentSlide++;
        }
      "
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <svg
          class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div>
  <div class="hidden lg:block p-5">
    <div class="text-gray-900 m-auto flex flex-row gap-5">
      <div
        v-for="(item, index) in sliderItems"
        :key="index"
        class="bg-white mx-auto p-5 rounded-lg flex-1"
      >
        <h3 class="text-3xl uppercase h-[15%]">{{ item.title }}</h3>
        <p class="text-2xl h-[10%]">${{ item.price }}/month</p>
        <p class="text-xl pb-5 pt-5 italic h-[55%]">
          {{ item.description }}
        </p>
        <div class="h-[20%] xl:pt-5 lg:pt-[2.7rem] overflow-auto mb-1">
          <button
            class="text-white rounded-full bg-gray-900 hover:bg-gray-700 py-4 px-5 mb-5 lg:stext-2xl text-xl"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ImgCarousel",
    data() {
      return {
        sliderItems: [
          {
            title: "🔢 Basic plan",
            price: 9.99,
            description:
              "Master the fundamentals with our Basic Plan! Access a treasure trove of math lessons, practice exercises, and quizzes. Lay a strong foundation for success in math at an unbeatable price.",
          },
          {
            title: "🚀 Premium Plan",
            price: 19.99,
            description:
              "Soar to new heights with our Premium Plan! Unlock advanced lessons, personalized progress tracking, and priority support. Elevate your math skills and conquer challenges with ease. Invest in excellence today!",
          },
          {
            title: "🌐 Friend Bundle",
            price: 29.99,
            description:
              "Math learning for the whole friend group! Our Friend Bundle includes unlimited access for up to 5 users. Strengthen math skills together, with diverse lessons suitable for all levels. Unleash the power of collective learning!",
          },
          {
            title: "💡 Pro Tutoring",
            price: 49.99,
            description:
              "Experience the ultimate in math mastery with our Pro Tutoring Plan! Create classes, invite your students, personalize curriculum, and track progress. Help your students succeed with our AI guided plans!",
          },
        ],
        currentSlide: 0,
      };
    },
  };
</script>
