<script setup lang="ts">
import { computed } from 'vue';
import { formatToNiceNumber } from '@/util';
import { useBudgetStore } from '@/stores/budget';
import ButtonElement from '../ui/ButtonElement.vue';
import CardContentElement from '../ui/CardContentElement.vue';
import DoughnutChartElement from '../ui/DoughnutChartElement.vue';
import BudgetInfoCardElement from '../ui/BudgetInfoCardElement.vue';
import BudgetInfoCardDetailElement from '../ui/BudgetInfoCardDetailElement.vue';

const budgetStore = useBudgetStore();

const budgetChartsRef = computed(() => {
  const { values, current, limit } = budgetStore.budgetsChart;

  return { values, current: formatToNiceNumber(current, 0), limit: formatToNiceNumber(limit, 0) };
});

const spendingsRef = computed(
  () =>
    Object.entries(budgetStore.summary).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: formatToNiceNumber(value, 2),
      }),
      {},
    ) as Record<keyof typeof budgetStore.summary, string>,
);

const onAddNewBudget = () => {};
</script>

<template>
  <div class="py-6 px-4 tablet:py-8 tablet:px-10 desktop:py-8 desktop:px-10">
    <div class="flex justify-between items-center flex-wrap mb-8 tablet:mb-[2.625rem] desktop:mb-8">
      <h1
        class="leading-[120%] font-bold text-[2rem] text-[var(--grey-900)] desktop:leading-[3.5rem]"
      >
        Budgets
      </h1>

      <div>
        <ButtonElement label="+ Add New Budget" :click-handler="onAddNewBudget" />
      </div>
    </div>

    <div class="desktop:flex desktop:gap-6">
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
                <BudgetInfoCardElement
                  label="Bills"
                  color="bg-[var(--cyan)]"
                  :current="spendingsRef.billsCurrent"
                  :total="spendingsRef.billsTotal"
                />

                <div class="my-[0.906rem] w-full h-[1px] bg-[var(--grey-100)]"></div>

                <BudgetInfoCardElement
                  label="Dining Out"
                  color="bg-[var(--yellow)]"
                  :current="spendingsRef.diningOutCurrent"
                  :total="spendingsRef.dinningOutTotal"
                />

                <div class="my-[0.906rem] w-full h-[1px] bg-[var(--grey-100)]"></div>

                <BudgetInfoCardElement
                  label="Personal Care"
                  color="bg-[var(--navy)]"
                  :current="spendingsRef.personalCareCurrent"
                  :total="spendingsRef.personalCareTotal"
                />

                <div class="my-[0.906rem] w-full h-[1px] bg-[var(--grey-100)]"></div>

                <BudgetInfoCardElement
                  label="Entertainment"
                  color="bg-[var(--green)]"
                  :current="spendingsRef.entertainmentCurrent"
                  :total="spendingsRef.entertainmentTotal"
                />
              </div>
            </div>
          </div>
        </CardContentElement>
      </div>

      <div class="flex-1">
        <BudgetInfoCardDetailElement
          label="Entertainment"
          color="bg-[var(--green)]"
          :spent="spendingsRef.entertainmentCurrent"
          :maximum="spendingsRef.entertainmentTotal"
          :spendings="budgetStore.spendings"
          spacing-top-class="desktop:mt-0"
        />

        <BudgetInfoCardDetailElement
          label="Bills"
          color="bg-[var(--cyan)]"
          :spent="spendingsRef.billsCurrent"
          :maximum="spendingsRef.billsTotal"
          :spendings="budgetStore.spendings"
        />

        <BudgetInfoCardDetailElement
          label="Dining Out"
          color="bg-[var(--yellow)]"
          :spent="spendingsRef.diningOutCurrent"
          :maximum="spendingsRef.dinningOutTotal"
          :spendings="budgetStore.spendings"
        />

        <BudgetInfoCardDetailElement
          label="Personal Care"
          color="bg-[var(--navy)]"
          :spent="spendingsRef.personalCareCurrent"
          :maximum="spendingsRef.personalCareTotal"
          :spendings="budgetStore.spendings"
        />
      </div>
    </div>
  </div>
</template>
