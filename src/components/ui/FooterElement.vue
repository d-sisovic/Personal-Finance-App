<script setup lang="ts">
import { ROUTES } from '@/ts/enums/routes.enum';
import { useRoute, useRouter } from 'vue-router';
import { computed, inject, ref, type Ref } from 'vue';
import { GLOBAL_VARS } from '@/ts/enums/global-vars.enum';

defineProps({
  desktopMode: Boolean,
});

const shrinkedSidebarRef = inject<Ref<boolean>>(GLOBAL_VARS.SHRINKED_SIDEBAR)!;

const route = useRoute();

const router = useRouter();

const emits = defineEmits(['toggle-menu']);

const images = import.meta.glob('@/assets/images/*', { eager: true }) as Record<
  string,
  { default: string }
>;

const menuItemsRef = ref([
  {
    route: ROUTES.HOME,
    isActive: false,
    label: 'Overview',
    image: images['/src/assets/images/icon-nav-overview.svg']?.default || '',
  },
  {
    route: ROUTES.TRANSACTIONS,
    isActive: false,
    label: 'Transactions',
    image: images['/src/assets/images/icon-nav-transactions.svg']?.default || '',
  },
  {
    route: ROUTES.BUDGETS,
    isActive: false,
    label: 'Budgets',
    image: images['/src/assets/images/icon-nav-budgets.svg']?.default || '',
  },
]);

const menuItems = computed(() =>
  menuItemsRef.value.map((item) => ({
    ...item,
    isActive: route.name === item.route,
  })),
);

const navItemClass = computed(
  () =>
    (isActive: boolean, desktopMode: boolean = false) =>
      `${isActive ? `rounded-t-md border-b-4 border-[var(--green)] bg-[var(--beige-100)] ${desktopMode ? 'desktop:rounded-t-none desktop:!rounded-r-md desktop:border-b-0 desktop:border-l-4' : ''}` : ''}
      ${desktopMode ? 'desktop:w-full desktop:gap-4 desktop:max-w-[17.25rem] desktop:py-4 desktop:px-8 desktop:flex-row w-full' : ''}
      pt-2 pb-3 px-6 tablet:h-[4.125rem] tablet:w-[6.5rem] tablet:inline-flex tablet:items-center tablet:space-around tablet:flex-col cursor-pointer`,
);

const navItemLabelClass = computed(
  () =>
    (isActive: boolean, desktopMode: boolean = false) =>
      `${isActive ? 'text-[var(--grey-900)]' : 'text-[var(--grey-300)]'}
      ${desktopMode ? 'desktop:mt-0 desktop:text-[1rem]' : ''}
      hidden leading-[150%] font-bold text-[0.75rem] mt-[0.438rem] whitespace-nowrap tablet:block`,
);

const containerClass = computed(
  () =>
    (desktopMode: boolean = false) =>
      `${desktopMode ? 'desktop:flex-col desktop:p-0 desktop:gap-1 desktop:items-start' : 'desktop:hidden'}
      w-full bg-[var(--grey-900)] rounded-t-md rounded-b-none pt-2 px-4 pb-0 h-[3.25rem] flex justify-around items-center tablet:h-[4.625rem] tablet:px-10`,
);

const onToggleMenu = () => emits('toggle-menu');

const onClickNavItem = (path: ROUTES) => router.push({ path });
</script>

<template>
  <div :class="containerClass(desktopMode)">
    <div
      v-for="{ label, image, isActive, route } in menuItems"
      :key="label"
      @click="onClickNavItem(route)"
      :class="navItemClass(isActive, desktopMode)"
    >
      <img
        :src="image"
        :alt="label.toLowerCase()"
        :class="`tablet:w-6 tablet:h-6 ${isActive ? 'green-filter' : ''}`"
      />

      <span :class="navItemLabelClass(isActive, desktopMode)" v-if="!shrinkedSidebarRef">
        {{ label }}
      </span>
    </div>

    <div
      class="px-8 py-4 gap-4 items-center hidden absolute bottom-[3.625rem] desktop:inline-flex cursor-pointer"
      @click="onToggleMenu"
    >
      <img
        src="@/assets/images/icon-minimize-menu.svg"
        alt="minimize"
        :class="`${!shrinkedSidebarRef ? '' : 'rotate-180'} w-6 h-6`"
      />

      <span
        v-if="!shrinkedSidebarRef"
        class="text-[var(--grey-300)] text-[1rem] leading-[150%] font-bold whitespace-nowrap cursor-pointer left-0 right-[1.5rem]"
      >
        Minimize Menu
      </span>
    </div>
  </div>
</template>
