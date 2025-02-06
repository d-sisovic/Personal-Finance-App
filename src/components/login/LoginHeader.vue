<script setup lang="ts">
import { ref } from 'vue';
import InputElement from '../ui/InputElement.vue';
import ButtonElement from '../ui/ButtonElement.vue';

const passwordVisible = ref<boolean>(false);

const onLogin = () => {
  console.log('heyy');
};

const onTogglePasswordVisibility = (visible: boolean) => (passwordVisible.value = visible);
</script>

<template>
  <div class="flex flex-col h-screen desktop:flex-row desktop:bg-[var(--beige-100)]">
    <div class="hidden desktop:block m-5 w-full max-w-[35rem]">
      <div
        class="h-full w-full rounded-xl bg-[url('@/assets/images/illustration-authentication.svg')] bg-cover bg-no-repeat bg-top p-10 flex flex-col justify-between items-start"
      >
        <img src="@/assets/images/logo-large.svg" alt="logo" class="h-[1.375rem]" />

        <div class="flex flex-col gap-6 text-[var(--white)]">
          <h3 class="text-[2rem] font-bold leading-[120%] max-w-[25rem] white-text-shadow">
            Keep track of your money and save for your future
          </h3>

          <p class="text-[0.88rem] leading-[150%] font-normal white-text-shadow">
            Personal finance app puts you in control of your spending. Track transactions, set
            budgets, and add to savings pots easily.
          </p>
        </div>
      </div>
    </div>

    <div class="py-6 px-10 bg-[var(--grey-900)] rounded-b-lg flex justify-center desktop:hidden">
      <img src="@/assets/images/logo-small.svg" alt="login" />
    </div>

    <div class="py-6 px-4 bg-[var(--beige-100)] flex-1 flex justify-center items-center">
      <div class="py-6 px-5 rounded-xl bg-[var(--white)] w-full max-w-[35rem] tablet:p-8">
        <h3 class="text-[rgb(32,31,36)] text-[2rem] font-bold leading-[120%] text-left mb-8">
          Login
        </h3>

        <InputElement label="Email" type="email" class="mb-4" />

        <InputElement
          label="Password"
          :type="passwordVisible ? 'text' : 'password'"
          class="mb-8"
          custom-input-class="pr-[2.5rem]"
        >
          <img
            src="@/assets/images/icon-show-password.svg"
            alt="show-password"
            class="absolute right-5 top-[50%] -translate-y-[50%] cursor-pointer"
            @mousedown="onTogglePasswordVisibility(true)"
            @mouseup="onTogglePasswordVisibility(false)"
            @mouseleave="onTogglePasswordVisibility(false)"
            @touchstart="onTogglePasswordVisibility(true)"
            @touchend="onTogglePasswordVisibility(false)"
            @touchcancel="onTogglePasswordVisibility(false)"
          />
        </InputElement>

        <ButtonElement label="Login" :click-handler="onLogin" class="mb-8" />

        <div class="text-[0.88rem] tablet:text-center">
          <p class="font-normal leading-[150%] text-[var(--grey-500)]">
            Need to create an account?
            <span class="underline font-bold text-[var(--grey-900)] hover:cursor-pointer ml-2">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
