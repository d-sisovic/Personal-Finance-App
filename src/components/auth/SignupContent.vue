<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthHeader from './AuthHeader.vue';
import { useSnackbar } from 'vue3-snackbar';
import { ROUTES } from '@/ts/enums/routes.enum';
import InputElement from '../ui/InputElement.vue';
import ButtonElement from '../ui/ButtonElement.vue';
import SpinnerElement from '../ui/SpinnerElement.vue';
import AuthLeftDesktopSection from './AuthLeftDesktopSection.vue';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';

const router = useRouter();
const snackbar = useSnackbar();

const nameInputRef = ref<string>('');
const emailInputRef = ref<string>('');
const passwordInputRef = ref<string>('');

const signupInProgress = ref<boolean>(false);
const passwordVisibleRef = ref<boolean>(false);

const validateInput = (name: string, email: string, password: string): string | null => {
  if (!name.trim() || name.trim().length < 3) {
    return 'Name is required and at least 3 characters long';
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return 'Email format must be valid';
  }

  if (password.trim().length < 8) {
    return 'Passwords must be at least 8 characters';
  }

  return null;
};

const onSignup = async () => {
  signupInProgress.value = true;

  const name = nameInputRef.value.trim();
  const email = emailInputRef.value.trim();
  const password = passwordInputRef.value.trim();

  const errorMessage = validateInput(name, email, password);

  if (errorMessage) {
    snackbar.add({ type: 'error', text: errorMessage });
    signupInProgress.value = false;
    return;
  }

  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });

    snackbar.add({ type: 'success', text: 'Account created successfully. Please login!' });
    router.push({ name: ROUTES.LOGIN });
  } catch (error: unknown) {
    snackbar.add({ type: 'error', text: (error as Error).message });
  } finally {
    signupInProgress.value = false;
  }
};

const onTogglePasswordVisibility = (visible: boolean) => (passwordVisibleRef.value = visible);
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

        <InputElement label="Name" type="text" class="mb-4" v-model="nameInputRef" />

        <InputElement label="Email" type="email" class="mb-4" v-model="emailInputRef" />

        <div class="mb-8">
          <InputElement
            label="Create Password"
            type="password"
            v-model="passwordInputRef"
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

          <p
            class="text-[var(--grey-500)] text-xs font-normal leading-[150%] tracking-normal text-right mt-1"
          >
            Passwords must be at least 8 characters
          </p>
        </div>

        <ButtonElement
          label="Create Account"
          :click-handler="onSignup"
          class="mb-8"
          :disabled="signupInProgress"
        >
          <SpinnerElement size="1.25" v-if="signupInProgress" />
        </ButtonElement>

        <div class="text-[0.88rem] tablet:text-center">
          <p class="font-normal leading-[150%] text-[var(--grey-500)]">
            Already have an account?

            <router-link
              :to="{ name: ROUTES.LOGIN }"
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
