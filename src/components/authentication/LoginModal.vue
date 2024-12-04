<template>
  <div
    class="rounded-lg bg-gray-800 h-full text-white p-[2rem] w-[90%] m-auto md:w-[60%] lg:w-[40%]"
  >
    <h1 class="text-3xl text-center">Log in</h1>
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
    <form class="flex flex-col gap-3">
      <label for="email">Email address:</label>
      <input
        class="border rounded-lg bg-gray-600 py-1 px-2"
        :class="
          errorMessage === 'Invalid email'
            ? 'border-red-700 text-red-700'
            : 'border-white text-white'
        "
        id="email"
        v-model="email"
        type="email"
        placeholder="Enter your email"
        required
      />
      <p
        v-if="errorMessage === 'Invalid email'"
        class="text-red-700"
      >
        Please enter a valid email
      </p>
      <label for="password">Password:</label>
      <input
        class="border rounded-lg bg-gray-600 py-1 px-2"
        :class="
          errorMessage === 'Invalid password'
            ? 'border-red-700 text-red-700'
            : 'border-white text-white'
        "
        id="password"
        v-model="password"
        type="password"
        placeholder="Enter your password"
        required
      />
      <p
        v-if="errorMessage === 'Invalid password'"
        class="text-red-700"
      >
        Password has to be 8 characters or more
      </p>
    </form>
    <div>
      <p
        class="text-sm text-right hover:underline hover:text-purple-600 py-3 pr-1 text-purple-400"
        @click="$emit('setOption', 'resetPassword')"
      >
        Forgot your password?
      </p>
    </div>
    <button
      type="submit"
      class="py-1 w-full bg-purple-600 rounded-lg hover:bg-purple-700"
      @click="logIn"
    >
      Log in to your account
    </button>
    <p class="pt-3 text-sm">
      Don’t have an account yet?
      <span
        class="text-purple-400 hover:underline hover:text-purple-600"
        @click="$emit('setOption', 'signUp')"
        >Sign up here</span
      >
    </p>
  </div>
</template>

<script>
  import GoogleIcon from "../icons/GoogleIcon.vue";
  import { doc, getDoc } from "firebase/firestore";
  import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
  } from "firebase/auth";

  export default {
    name: "LoginModal",
    components: { GoogleIcon },
    data() {
      return {
        email: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      logInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then(async (result) => {
            const user = result.user;
            const document = await getDoc(doc(this.$store.state.db, "users", user.uid));
            this.$store.dispatch("setPropByName", {
              module: "auth",
              property: "user",
              value: JSON.parse(JSON.stringify(document.data())),
            });
            this.$router.push("/my-account");
          })
          .catch((error) => {
            console.log(error);
          });
      },
      logIn() {
        if (!this.errorMessage.length) {
          const auth = getAuth();
          signInWithEmailAndPassword(auth, this.email, this.password)
            .then(async (userCredential) => {
              const user = userCredential.user;
              const document = await getDoc(doc(this.$store.state.db, "users", user.uid));
              this.$store.dispatch("setPropByName", {
                module: "auth",
                property: "user",
                value: JSON.parse(JSON.stringify(document.data())),
              });
              this.$router.push("/my-account");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
    },
    watch: {
      email: {
        handler(newVal) {
          // eslint-disable-next-line
          this.errorMessage =
            newVal.search(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g) === -1 ? "Invalid email" : "";
        },
      },
      password: {
        handler(newVal) {
          this.errorMessage = newVal.length < 8 ? "Invalid password" : "";
        },
      },
    },
  };
</script>
