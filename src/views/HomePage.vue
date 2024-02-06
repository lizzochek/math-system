<template>
  <div>
    <div class="p-5 flex flex-row">
      <div class="lg:basis-1/2 text-white m-auto">
        <h2 class="lg:text-5xl text-4xl mb-4 pl-[5%]">Unlock the Power of Numbers</h2>
        <h3 class="lg:text-3xl text-2xl pl-[20%] italic">Your Journey to Math Mastery!</h3>
        <div class="pl-[55%] mt-2">
          <button
            class="text-white rounded-full bg-purple-400 hover:bg-purple-700 py-4 px-5 mt-3 lg:stext-2xl text-xl"
          >
            Get started
          </button>
        </div>
      </div>
      <img
        class="basis-1/2 hidden md:block"
        src="@/assets/landing-img.png"
      />
    </div>
    <div class="bg-white p-[2rem] flex flex-col justify-items-center">
      <p class="text-3xl mb-5 mx-auto uppercase">Get personalized education experience</p>
      <ul class="flex md:flex-row flex-col gap-5 list-disc md:list-none pl-3 md:pl-0">
        <li class="text-2xl italic text-center">
          <img
            class="hidden md:block"
            src="@/assets/personalised-profile.png"
          />
          <p class="pt-5">Create a personalised profile</p>
        </li>

        <li class="text-2xl italic text-center">
          <img
            class="hidden md:block"
            src="@/assets/laptop-img.jpeg"
          />
          <p class="pt-5">Engage with AI-generated recommendations</p>
        </li>

        <li class="text-2xl italic text-center">
          <img
            class="hidden md:block"
            src="@/assets/home-study.jpeg"
          />
          <p class="pt-5">Study from the comfort of your home</p>
        </li>
      </ul>
    </div>
    <div class="py-5 text-center">
      <h3 class="text-3xl text-white uppercase py-5 mx-auto">Get your deal</h3>
      <ImgCarousel class="bg-white rounded-lg" />
    </div>
  </div>
</template>

<script>
  import ImgCarousel from "@/components/common/ImgCarousel";

  export default {
    name: "HomePage",
    components: { ImgCarousel },
  };
</script>
