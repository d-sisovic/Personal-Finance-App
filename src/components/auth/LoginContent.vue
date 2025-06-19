<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import { useFirebaseApp } from 'vuefire';
import AuthHeader from './AuthHeader.vue';
import { useSnackbar } from 'vue3-snackbar';
import { ROUTES } from '@/ts/enums/routes.enum';
import InputElement from '../ui/InputElement.vue';
import ButtonElement from '../ui/ButtonElement.vue';
import SpinnerElement from '../ui/SpinnerElement.vue';
import AuthLeftDesktopSection from './AuthLeftDesktopSection.vue';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const emailRef = ref<string>('');
const passwordRef = ref<string>('');

const isCheckingAuthRef = ref<boolean>(true);
const passwordVisibleRef = ref<boolean>(false);
const loginInProgressRef = ref<boolean>(false);

const router = useRouter();
const snackbar = useSnackbar();
const firebaseApp = useFirebaseApp();
const auth = getAuth(firebaseApp);

onBeforeMount(async () => {
  await signOut(auth);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push({ name: ROUTES.HOME });
      return;
    }

    isCheckingAuthRef.value = false;
  });
});

const onLogin = async () => {
  loginInProgressRef.value = true;

  try {
    await signInWithEmailAndPassword(auth, emailRef.value, passwordRef.value);
    router.push({ name: ROUTES.HOME });
  } catch (error: unknown) {
    snackbar.add({ type: 'error', text: (error as Error).message });
  } finally {
    loginInProgressRef.value = false;
  }
};

const onTogglePasswordVisibility = (visible: boolean) => (passwordVisibleRef.value = visible);

onBeforeMount(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push({ name: ROUTES.HOME });
      return;
    }

    isCheckingAuthRef.value = false;
  });
});
</script>

<template>
  <div v-if="isCheckingAuthRef" class="flex justify-center items-center h-screen">
    <SpinnerElement size="3" />
  </div>

  <div v-else class="flex flex-col h-screen desktop:flex-row desktop:bg-[var(--beige-100)]">
    <AuthLeftDesktopSection />
    <AuthHeader />

    <div class="py-6 px-4 bg-[var(--beige-100)] flex-1 flex justify-center items-center">
      <div class="py-6 px-5 rounded-xl bg-[var(--white)] w-full max-w-[35rem] tablet:p-8">
        <h3 class="text-[rgb(32,31,36)] text-[2rem] font-bold leading-[120%] text-left mb-8">
          Login
        </h3>

        <InputElement v-model="emailRef" label="Email" type="email" class="mb-4" />

        <InputElement
          v-model="passwordRef"
          label="Password"
          :type="passwordVisibleRef ? 'text' : 'password'"
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

        <ButtonElement label="Login" :click-handler="onLogin" class="mb-8">
          <SpinnerElement size="1.25" v-if="loginInProgressRef" />
        </ButtonElement>

        <div class="text-[0.88rem] tablet:text-center">
          <p class="font-normal leading-[150%] text-[var(--grey-500)]">
            Need to create an account?
            <router-link
              :to="{ name: ROUTES.SIGNUP }"
              class="underline font-bold text-[var(--grey-900)] hover:cursor-pointer ml-2"
            >
              Sign Up
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
