<template>
  <div class="flex flex-row mt-5 px-5 xl:px-[7rem]">
    <div class="hidden md:block w-0 md:w-[30%] lg:w-[55%] m-auto">
      <img
        src="@/assets/math-img.png"
        alt="Math learning picture"
      />
    </div>
    <div
      class="rounded-lg bg-gray-800 h-full text-white p-[2rem] w-[90%] m-auto md:w-[60%] lg:w-[40%]"
    >
      <h1 class="text-2xl">Welcome back</h1>
      <div
        class="flex flex-row justify-center border rounded-lg border-white gap-2 p-2 my-4"
        @click="logInWithGoogle"
      >
        <GoogleIcon class="h-6 w-6" />
        <button>Log in with Google</button>
      </div>
      <div class="flex flex-row items-center justify-center w-full gap-8">
        <hr class="w-44 h-px my-8 bg-gray-400 border-0" />
        <span class="absolute px-3 font-medium">or</span>
        <hr class="w-44 h-px my-8 bg-gray-400 border-0" />
      </div>
      <form
        class="flex flex-col gap-3"
        @click="logIn"
      >
        <label for="email">Email address:</label>
        <input
          class="border border-white rounded-lg bg-gray-600 text-white py-1 px-2"
          id="email"
          v-model="formData.email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <label for="password">Password:</label>
        <input
          class="border border-white rounded-lg bg-gray-600 text-white py-1 px-2"
          id="password"
          v-model="formData.password"
          type="password"
          placeholder="Enter your password"
          required
        />
      </form>
      <div>
        <p
          class="text-sm text-right hover:underline hover:text-purple-600 py-3 pr-1 text-purple-400"
          @click="$emit('setOption', 'resetPassword')"
        >
          Forgot your password?
        </p>
      </div>
      <button class="py-1 w-full bg-purple-600 rounded-lg">Log in to your account</button>
      <p class="pt-3 text-sm">
        Don’t have an account yet?
        <span
          class="text-purple-400 hover:underline hover:text-purple-600"
          @click="$emit('setOption', 'signUp')"
          >Sign up here</span
        >
      </p>
    </div>
  </div>
</template>

<script>
  import GoogleIcon from "../icons/GoogleIcon.vue";
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

  export default {
    name: "LoginModal",
    components: { GoogleIcon },
    data() {
      return {
        formData: {
          email: "",
          password: "",
        },
      };
    },
    methods: {
      logIn() {},
      logInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            const user = result.user;
            console.log(user);
            // IdP data available using getAdditionalUserInfo(result)
          })
          .catch((error) => {
            // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.customData.email;
            console.log(error);
          });
      },
    },
  };
</script>
