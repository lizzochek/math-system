<template>
  <section class="bg-gray-800 p-8 rounded-lg shadow-lg mt-8">
    <div class="flex items-center space-x-6">
      <img
        src="../../assets/teacher-pic.jpg"
        alt="Author"
        class="rounded-full w-20 h-20"
      />
      <div>
        <h3 class="text-xl font-bold">{{ author.name }}</h3>
        <p class="text-gray-300">
          {{ author.description }}
        </p>
        <div class="flex space-x-4 mt-4">
          <button
            class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            @click="$router.push(`/courses?author=${author.id}`)"
          >
            All Author's Courses
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "AuthorCard",
    props: ["author"],
  };
</script>
