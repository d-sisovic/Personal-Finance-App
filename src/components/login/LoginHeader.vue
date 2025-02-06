<script setup lang="ts">
import ButtonElement from '../ui/ButtonElement.vue';
import InputElement from '../ui/InputElement.vue';

const onLogin = () => {
  console.log('heyy');
};
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="py-6 px-10 bg-[var(--grey-900)] rounded-b-lg flex justify-center">
      <img src="@/assets/images/logo-small.svg" alt="login" />
    </div>

    <div class="py-6 px-4 bg-[var(--beige-100)] flex-1 flex justify-center items-center">
      <div class="py-6 px-5 rounded-xl bg-[var(--white)] w-full">
        <h3 class="text-[rgb(32,31,36)] text-[2rem] font-bold leading-[120%] text-left mb-8">
          Login
        </h3>

        <InputElement label="Email" type="email" class="mb-4" />

        <InputElement label="Password" type="password" class="mb-8" />

        <ButtonElement label="Login" :click-handler="onLogin" class="mb-8" />

        <div class="text-[0.88rem]">
          <p class="font-normal leading-[150%] text-[var(--grey-500)]">
            Need to create an account?
            <span class="underline font-bold text-[var(--grey-900)] hover:cursor-pointer ml-2"
              >Sign Up</span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
