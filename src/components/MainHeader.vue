<template>
  <nav class="border-gray-200 py-2.5">
    <div
      class="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto lg:static relative"
    >
      <a
        href="/"
        class="flex items-center"
      >
        <img
          src="@/assets/logo-no-text.png"
          class="h-6 mr-3 sm:h-9"
          alt="Main Logo"
        />
        <span class="self-center text-xl font-semibold whitespace-nowrap text-white">
          Math minds
        </span>
      </a>
      <div class="flex items-center lg:order-2 pr-4">
        <a
          href="/login"
          class="text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 bg-purple-600 hover:bg-purple-800"
        >
          Log in
        </a>
        <button
          type="button"
          @click="() => (collapseMenu = !collapseMenu)"
          class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            class="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="h-[100vh] lg:h-[40px] items-center justify-between w-full lg:bg-transparent bg-gray-900 lg:border-none bg-grey-800 lg:flex lg:w-auto lg:order-1 lg:static top-[42px] absolute right-1 z-10"
        :class="collapseMenu ? 'hidden' : 'visible'"
      >
        <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
          <li
            v-for="(item, index) in menuItems"
            :key="index"
          >
            <a
              :href="item.path"
              class="block py-2 pl-5 pr-4"
              :class="
                $route.path === item.path
                  ? 'text-white bg-purple-400 rounded lg:bg-transparent lg:text-purple-400 lg:p-0 text-white'
                  : 'text-gray-400 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-400 lg:p-0 text-gray-400 hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700'
              "
            >
              {{ item.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "MainHeader",
    data() {
      return {
        collapseMenu: true,
        menuItems: [{ name: "Login", path: "/login" }],
      };
    },
  };
</script>
