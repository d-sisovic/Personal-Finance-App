<script setup lang="ts">
import { computed, ref } from 'vue';
import ModalElement from './ModalElement.vue';
import DropdownMenu from './DropdownMenu.vue';
import { formatStringToNumber } from '@/util';
import ButtonElement from './ButtonElement.vue';
import { useBudgetStore } from '@/stores/budget';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import ProgressBarElement from './ProgressBarElement.vue';
import CardContentElement from './CardContentElement.vue';
import { useClickOutside } from '@/hooks/useClickOutside';
import type { IListItem } from '@/ts/interfaces/list.model';
import TransactionCardElement from './TransactionCardElement.vue';
import CreateEditBudgetModal from '../budgets/CreateEditBudgetModal.vue';

enum MODAL_ACTION {
  EDIT = 'edit',
  DELETE = 'delete',
}

const props = defineProps<{
  spent: string;
  label: string;
  color: string;
  maximum: string;
  spendings: IListItem[];
  spacingTopClass?: string;
}>();

const dropdownActions = [
  {
    label: 'Edit Budget',
    value: MODAL_ACTION.EDIT,
  },
  {
    label: 'Delete Budget',
    value: MODAL_ACTION.DELETE,
    color: 'text-[var(--red)]',
  },
];

const { isDesktop } = useIsDesktop();
const budgetStore = useBudgetStore();

const dotActionRef = ref<HTMLElement | null>(null);
const selectedModalRef = ref<MODAL_ACTION | null>(null);

const { onToggleDropdown, dropdownVisibleRef } = useClickOutside(dotActionRef);

const preselectedMaxSpending = computed(() => props.maximum.replace('$', ''));

const spentPercentage =
  (formatStringToNumber(props.spent) / formatStringToNumber(props.maximum)) * 100;

const closeModal = () => (selectedModalRef.value = null);

const onSelectAction = (value: MODAL_ACTION) => (selectedModalRef.value = value);

const onDeleteBudget = () => {
  budgetStore.deleteBudget(props.label);

  closeModal();
};

const onEditBudget = (color: string, maxAllowed: number, label: string) => {
  budgetStore.editBudget(color, maxAllowed, label);

  closeModal();
};
</script>

<template>
  <ModalElement
    heading="Edit Budget"
    :show-modal="selectedModalRef === MODAL_ACTION.EDIT"
    @close-modal="closeModal"
  >
    <CreateEditBudgetModal
      @accept="onEditBudget"
      :buttonLabel="'Save Changes'"
      :preselected-color="color"
      :preselected-category="label"
      :preselectedMaxSpending="preselectedMaxSpending"
      :heading="'As your budgets change, feel free to update your spending limits.'"
    />
  </ModalElement>

  <ModalElement
    :heading="`Delete '${label}'?`"
    :show-modal="selectedModalRef === MODAL_ACTION.DELETE"
    @close-modal="closeModal"
  >
    <p class="my-5 text-[0.88rem] text-[var(--grey-500)]">
      Are you sure you want to delete this budget? This action cannot be reversed, and all the data
      inside it will be removed forever.
    </p>

    <ButtonElement
      label="Yes, Confirm Deletion"
      :class="'bg-[var(--red)]'"
      :click-handler="onDeleteBudget"
      class="mb-2"
    />

    <ButtonElement
      label="No, Go Back"
      :class="'bg-transparent !text-[var(--grey-500)]'"
      :click-handler="closeModal"
    />
  </ModalElement>

  <div class="mt-6 bg-[var(--white)] p-6 rounded-xl tablet:p-8" :class="spacingTopClass">
    <div class="flex justify-between flex-wrap items-center mb-[1.25rem] relative">
      <div class="flex gap-4 items-center flex-wrap">
        <span class="w-4 h-4 rounded-full block" :class="color"></span>

        <h3 class="text-[var(--grey-900)] font-bold text-[1.25rem] leading-6">{{ label }}</h3>
      </div>

      <img
        src="@/assets/images/icon-ellipsis.svg"
        alt="dots"
        ref="dotActionRef"
        class="cursor-pointer py-1"
        @click="onToggleDropdown"
      />

      <div class="absolute top-[1.5rem] right-0" v-if="dropdownVisibleRef">
        <DropdownMenu
          :heading="''"
          :selectedValue="''"
          :items="dropdownActions"
          @select="onSelectAction"
          v-if="dropdownVisibleRef"
        />
      </div>
    </div>

    <h3 class="mb-5 text-[var(--grey-500)] text-[0.88rem]">Maximum of {{ maximum }}</h3>

    <ProgressBarElement :progress="spentPercentage" :progress-color="color" />

    <div class="flex flex-wrap gap-4 items-center mt-4">
      <div class="inline-flex items-center gap-4 flex-1">
        <span class="w-1 h-[2.688rem] block rounded-lg" :class="color"></span>

        <div class="inline-flex flex-col">
          <span class="text-[var(--grey-500)] text-[0.75rem] mb-1">Spent</span>

          <span class="font-bold text-[0.88rem]">{{ spent }}</span>
        </div>
      </div>

      <div class="inline-flex items-center gap-4 flex-1">
        <span class="w-1 h-[2.688rem] block bg-[var(--beige-100)] rounded-lg"></span>

        <div class="inline-flex flex-col">
          <span class="text-[var(--grey-500)] text-[0.75rem] mb-1">Free</span>

          <span class="font-bold text-[0.88rem]">{{ maximum }}</span>
        </div>
      </div>
    </div>

    <CardContentElement
      heading="Latest Spending"
      actionLabel="See All"
      class="mt-5 !bg-[var(--beige-100)] !p-4"
    >
      <div class="mt-8 flex flex-col gap-6">
        <TransactionCardElement
          v-for="(item, index) in spendings"
          :key="item.name"
          :list-item="item"
          :show-line="spendings.length !== index + 1"
          :hide-image="!isDesktop"
          borderClass="!bg-[#69686826]"
        />
      </div>
    </CardContentElement>
  </div>
</template>
