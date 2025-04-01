<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ROUTES } from '@/ts/enums/routes.enum';
import ButtonElement from '@/components/ui/ButtonElement.vue';

const router = useRouter();

const onGoBack = () => router.push({ name: ROUTES.HOME });
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
    <div>
      <h1 class="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p class="text-lg text-gray-600">The page you are looking for does not exist.</p>

      <div class="max-w-[15rem] mx-auto">
        <ButtonElement label="Go back" :click-handler="onGoBack" class="mt-8" />
      </div>
    </div>
  </div>
</template>
