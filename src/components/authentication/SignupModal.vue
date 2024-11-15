<template>
  <div
    class="rounded-lg bg-gray-800 h-full text-white p-[2rem] w-[90%] m-auto md:w-[60%] lg:w-[40%]"
  >
    <h1 class="text-3xl text-center">Sign up</h1>
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
      <input
        class="border rounded-lg bg-gray-600 py-1 px-2"
        id="name"
        v-model="name"
        type="name"
        placeholder="Enter your name"
        required
      />
      <label>Student / Teacher:</label>
      <select
        class="border rounded-lg bg-gray-600 py-1 px-2 mb-4"
        id="userType"
        v-model="userType"
        required
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
    </form>
    <button
      type="submit"
      class="py-1 w-full bg-purple-600 rounded-lg hover:bg-purple-700"
      @click="createAccount"
    >
      Create account
    </button>
    <p class="pt-3 text-sm">
      Already have an account?
      <span
        class="text-purple-400 hover:underline hover:text-purple-600"
        @click="$emit('setOption', 'login')"
        >Log in here</span
      >
    </p>
  </div>
</template>

<script>
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { collection, addDoc } from "firebase/firestore"; 
  export default {
    name: "LoginModal",
    data() {
      return {
        email: "",
        password: "",
        userType: null,
        name: null,
        errorMessage: "",
      };
    },
    methods: {
      createAccount() {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((registeredUser) => {
            const user = registeredUser.user;
            addDoc(collection(this.$store.state.db, "users"), {
              uid: user.uid,
              displayName: this.name,
              email: user.email,
              userType: this.userType,
            });
            this.$store.dispatch("setPropByName", {
              module: "auth",
              property: "user",
              value: {
              uid: user.uid,
              displayName: this.name,
              email: user.email,
              userType: this.userType,
            },
            });
          })
          .catch((error) => {
            console.log(error);
          });
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
