<script setup lang="ts">
import { computed, ref } from 'vue';
import { useBudgetStore } from '@/stores/budget';
import InputElement from '../ui/InputElement.vue';
import SelectElement from '../ui/SelectElement.vue';
import ButtonElement from '../ui/ButtonElement.vue';

const props = defineProps<{
  heading: string;
  buttonLabel: string;

  preselectedColor: string | null;
  preselectedCategory: string | null;
  preselectedMaxSpending: string | null;
}>();

const categoryDropdown = [
  'Entertainment',
  'Bills',
  'Groceries',
  'Dining Out',
  'Transportation',
  'Personal Care',
  'Education',
].map((item) => ({ label: item, value: item }));

const themeDropdown = [
  {
    label: 'Green',
    color: 'bg-[var(--green)]',
  },
  {
    label: 'Yellow',
    color: 'bg-[var(--yellow)]',
  },
  {
    label: 'Cyan',
    color: 'bg-[var(--cyan)]',
  },
  {
    label: 'Navy',
    color: 'bg-[var(--navy)]',
  },
  {
    label: 'Red',
    color: 'bg-[var(--red)]',
  },
  {
    label: 'Purple',
    color: 'bg-[var(--purple)]',
  },
  {
    label: 'Turquoise',
    color: 'bg-[var(--turquoise)]',
  },
].map((item) => ({ ...item, value: item.color }));

const budgetStore = useBudgetStore();

const emits = defineEmits(['accept']);

const colorRef = ref<string | null>(props.preselectedColor);
const labelRef = ref<string | null>(props.preselectedCategory);
const maxAllowedRef = ref<string | null>(props.preselectedMaxSpending);

const usedColors = computed(() => budgetStore.budgetItems.map(({ color }) => color));
const usedCategories = computed(() => budgetStore.budgetItems.map(({ label }) => label));

const getPreselectedItem = <T,>(
  dropdown: T[],
  preselectedValue: string | null,
  preselectedKey: keyof T,
  usedValues: T[keyof T][],
  fallbackKey: keyof T,
): T | null => {
  if (preselectedValue)
    return dropdown.find((item) => item[preselectedKey] === preselectedValue) || null;

  return dropdown.find((item) => !usedValues.includes(item[fallbackKey])) || null;
};

const preselectedCategoryToUse = computed(() =>
  getPreselectedItem(
    categoryDropdown,
    props.preselectedCategory,
    'value',
    usedCategories.value,
    'label',
  ),
);

const preselectedColorToUse = computed(() =>
  getPreselectedItem(themeDropdown, props.preselectedColor, 'value', usedColors.value, 'color'),
);

const onAccept = () => {
  const color = colorRef.value;
  const label = labelRef.value;
  const maxAllowed = maxAllowedRef.value;

  if (!color || !maxAllowed || !label || !/^[+]?(?!0\d)\d+(\.\d+)?$/.test(maxAllowed.toString()))
    return;

  emits('accept', color, maxAllowed, label);
};
</script>

<template>
  <p class="my-5 text-[0.88rem] text-[var(--grey-500)]">
    {{ heading }}
  </p>

  <SelectElement
    label="Budget Category"
    :used-values="usedCategories"
    :dropdown-values="categoryDropdown"
    :preselected-item="preselectedCategoryToUse"
    @set-value="(value) => (labelRef = value)"
    class="mb-4"
  />

  <InputElement
    class="mb-4"
    type="number"
    label="Maximum Spend"
    v-model="maxAllowedRef"
    placeholder="e.g. 2000"
    custom-input-class="!pl-[45px]"
  >
    <span
      class="absolute top-[50%] translate-y-[-50%] left-[21px] text-[0.88rem] text-[var(--beige-500)] leading-[150%]"
    >
      $
    </span>
  </InputElement>

  <SelectElement
    label="Theme"
    :used-values="usedColors"
    :dropdown-values="themeDropdown"
    :preselected-item="preselectedColorToUse"
    @set-value="(value) => (colorRef = value)"
    class="mb-4"
  />

  <ButtonElement :label="buttonLabel" :click-handler="onAccept" />
</template>
