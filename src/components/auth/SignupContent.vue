<script setup lang="ts">
import { ref } from 'vue';
import AuthHeader from './AuthHeader.vue';
import InputElement from '../ui/InputElement.vue';
import ButtonElement from '../ui/ButtonElement.vue';
import AuthLeftDesktopSection from './AuthLeftDesktopSection.vue';

const passwordVisible = ref<boolean>(false);

const onSignup = () => {
  console.log('heyy');
};

const onTogglePasswordVisibility = (visible: boolean) => (passwordVisible.value = visible);
</script>

<template>
  <div class="flex flex-col h-screen desktop:flex-row desktop:bg-[var(--beige-100)]">
    <AuthLeftDesktopSection />

    <AuthHeader />

    <div class="py-6 px-4 bg-[var(--beige-100)] flex-1 flex justify-center items-center">
      <div class="py-6 px-5 rounded-xl bg-[var(--white)] w-full max-w-[35rem] tablet:p-8">
        <h3 class="text-[rgb(32,31,36)] text-[2rem] font-bold leading-[120%] text-left mb-8">
          Sign Up
        </h3>

        <InputElement label="Name" type="text" class="mb-4" />

        <InputElement label="Email" type="email" class="mb-4" />

        <div class="mb-8">
          <InputElement label="Create Password" type="password" custom-input-class="pr-[2.5rem]">
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

          <p
            class="text-[var(--grey-500)] text-xs font-normal leading-[150%] tracking-normal text-right mt-1"
          >
            Passwords must be at least 8 characters
          </p>
        </div>

        <ButtonElement label="Create Account" :click-handler="onSignup" class="mb-8" />

        <div class="text-[0.88rem] tablet:text-center">
          <p class="font-normal leading-[150%] text-[var(--grey-500)]">
            Already have an account?

            <router-link
              :to="{ name: 'login' }"
              class="underline font-bold text-[var(--grey-900)] hover:cursor-pointer ml-2"
            >
              Login
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
