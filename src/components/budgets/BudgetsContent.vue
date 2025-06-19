<script setup lang="ts">
import { computed, ref } from 'vue';
import { formatToNiceNumber } from '@/util';
import { useBudgetStore } from '@/stores/budget';
import ModalElement from '../ui/ModalElement.vue';
import ButtonElement from '../ui/ButtonElement.vue';
import CardContentElement from '../ui/CardContentElement.vue';
import CreateEditBudgetModal from './CreateEditBudgetModal.vue';
import DoughnutChartElement from '../ui/DoughnutChartElement.vue';
import BudgetInfoCardElement from '../ui/BudgetInfoCardElement.vue';
import BudgetInfoCardDetailElement from '../ui/BudgetInfoCardDetailElement.vue';

const budgetStore = useBudgetStore();

const showModalRef = ref<boolean>(false);

const onAddBudget = (color: string, maxAllowed: number, label: string) => {
  budgetStore.addNewBudget(color, maxAllowed, label);

  onToggleModalVisibility();
};

const budgetChartsRef = computed(() => {
  const { values, current, limit } = budgetStore.budgetsChart;

  return { values, current: formatToNiceNumber(current, 0), limit: formatToNiceNumber(limit, 0) };
});

const onToggleModalVisibility = () => (showModalRef.value = !showModalRef.value);
</script>

<template>
  <ModalElement
    heading="Add New Budget"
    :show-modal="showModalRef"
    @close-modal="onToggleModalVisibility"
  >
    <CreateEditBudgetModal
      @accept="onAddBudget"
      :buttonLabel="'Add Budget'"
      :preselected-color="null"
      :preselected-category="null"
      :preselectedMaxSpending="null"
      :heading="'Choose a category to set a spending budget. These categories can help you monitor spending.'"
    />
  </ModalElement>

  <div class="py-6 px-4 tablet:py-8 tablet:px-10 desktop:py-8 desktop:px-10">
    <div class="flex justify-between items-center flex-wrap mb-8 tablet:mb-[2.625rem] desktop:mb-8">
      <h1
        class="leading-[120%] font-bold text-[2rem] text-[var(--grey-900)] desktop:leading-[3.5rem]"
      >
        Budgets
      </h1>

      <div>
        <ButtonElement label="+ Add New Budget" :click-handler="onToggleModalVisibility" />
      </div>
    </div>

    <div class="desktop:flex desktop:gap-6" v-if="budgetStore.budgetItems.length">
      <div class="flex-1 desktop:max-w-[26.75rem]">
        <CardContentElement heading="" actionLabel="">
          <div
            class="mt-7 tablet:flex tablet:justify-between tablet:items-center tablet:mt-0 tablet:gap-8 desktop:flex-col"
          >
            <div class="flex justify-center tablet:p-8">
              <DoughnutChartElement v-bind="budgetChartsRef" />
            </div>

            <div class="flex-1 desktop:w-full">
              <h3
                class="mt-[3.25rem] mb-6 leading-[120%] font-bold text-[1.25rem] text-[var(--grey-900)] tablet:mt-0"
              >
                Spending Summary
              </h3>

              <div class="flex flex-col">
                <template
                  :key="uuid"
                  v-for="(
                    { uuid, label, color, spent, maxAllowed }, index
                  ) in budgetStore.budgetItems"
                >
                  <BudgetInfoCardElement
                    :label="label"
                    :color="color"
                    :current="formatToNiceNumber(spent, 2)"
                    :total="formatToNiceNumber(maxAllowed, 2)"
                  />

                  <div
                    class="my-[0.906rem] w-full h-[1px] bg-[var(--grey-100)]"
                    v-if="budgetStore.budgetItems.length - 1 !== index"
                  ></div>
                </template>
              </div>
            </div>
          </div>
        </CardContentElement>
      </div>

      <div class="flex-1">
        <BudgetInfoCardDetailElement
          :key="uuid"
          :label="label"
          :color="color"
          :spent="formatToNiceNumber(spent, 2)"
          :maximum="formatToNiceNumber(maxAllowed, 2)"
          :spendings="spendings"
          :spacing-top-class="index === 0 ? 'desktop:mt-0' : ''"
          v-for="(
            { uuid, label, color, spent, maxAllowed, spendings }, index
          ) in budgetStore.budgetItems"
        />
      </div>
    </div>

    <p class="text-[var(--grey-500)] text-[0.88rem]" v-else>
      There are no budgets defined yet. Please add a new budget.
    </p>
  </div>
</template>
