<script setup lang="ts">
import { computed } from 'vue';
import { formatToNiceNumber } from '@/util';
import { useHomeStore } from '@/stores/home';
import InfoCardElement from '@/components/ui/InfoCardElement.vue';
import CardContentElement from '@/components/ui/CardContentElement.vue';
import InfoCardBillElement from '@/components/ui/InfoCardBillElement.vue';
import InfoColorCardElement from '@/components/ui/InfoColorCardElement.vue';
import DoughnutChartElement from '@/components/ui/DoughnutChartElement.vue';
import TransactionCardElement from '@/components/ui/TransactionCardElement.vue';

const homeStore = useHomeStore();

const formatStoreSection = <T extends Record<string, number>>(
  section: T,
  minimumFractionDigits: number = 0,
) =>
  computed(() =>
    Object.entries(section).reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key]: formatToNiceNumber(value, minimumFractionDigits),
      }),
      {} as { [K in keyof T]: string },
    ),
  );

const transactionsRef = homeStore.transactions;

const budgetChartsRef = computed(() => {
  const { values, current, limit } = homeStore.budgetsChart;

  return { values, current: formatToNiceNumber(current, 0), limit: formatToNiceNumber(limit, 0) };
});

const potsRef = formatStoreSection(homeStore.pots);
const budgetsRef = formatStoreSection(homeStore.budgets);
const recurringRef = formatStoreSection(homeStore.recurring, 2);
const balanceRef = formatStoreSection(homeStore.balanceOverview, 2);
</script>

<template>
  <div class="py-6 px-4 tablet:py-8 tablet:px-10 desktop:py-8 desktop:px-10">
    <h1
      class="leading-[120%] font-bold text-[2rem] text-[var(--grey-900)] mb-8 tablet:mb-[2.625rem] desktop:mb-8 desktop:leading-[3.5rem]"
    >
      Overview
    </h1>

    <div class="flex flex-wrap gap-3 tablet:justify-between tablet:flex-nowrap desktop:gap-6">
      <InfoCardElement
        label="Current Balance"
        :value="balanceRef.currentBalance"
        :isLightMode="false"
        class="w-full"
      />

      <InfoCardElement label="Income" :value="balanceRef.income" class="w-full" />

      <InfoCardElement label="Expenses" :value="balanceRef.expenses" class="w-full" />
    </div>

    <div class="desktop:flex desktop:gap-6 desktop:mt-6">
      <div class="desktop:flex-1">
        <CardContentElement heading="Pots" class="mt-8 desktop:mt-0">
          <div class="tablet:flex tablet:items-center gap-5">
            <div
              class="p-4 rounded-xl bg-[var(--beige-100)] flex items-center mt-5 gap-4 min-w-[15.438rem]"
            >
              <img src="@/assets/images/icon-pot.svg" alt="pot" class="w-10 h-10" />

              <div>
                <h3 class="leading-[150%] font-normal text-[0.88rem] text-[var(--grey-500)]">
                  Total Saved
                </h3>

                <p
                  class="mt-[0.688rem] leading-[120%] font-bold text-[2rem] text-[var(--grey-900)]"
                >
                  {{ potsRef.totalSaved }}
                </p>
              </div>
            </div>

            <div class="mt-5 flex flex-wrap gap-4">
              <InfoColorCardElement
                label="Savings"
                :value="potsRef.savings"
                color="bg-[var(--green)]"
              />

              <InfoColorCardElement label="Gift" :value="potsRef.gift" color="bg-[var(--cyan)]" />

              <InfoColorCardElement
                label="Concert Ticket"
                :value="potsRef.concertTicket"
                color="bg-[var(--navy)]"
              />

              <InfoColorCardElement
                label="New Laptop"
                :value="potsRef.newLaptop"
                color="bg-[var(--yellow)]"
              />
            </div>
          </div>
        </CardContentElement>

        <CardContentElement heading="Transactions" actionLabel="View All" class="mt-6">
          <div class="mt-8 flex flex-col gap-6">
            <TransactionCardElement
              v-for="(transactionItem, index) in transactionsRef"
              :key="transactionItem.name"
              v-bind="transactionItem"
              :show-line="transactionsRef.length !== index + 1"
            />
          </div>
        </CardContentElement>
      </div>

      <div class="desktop:flex-1 desktop:max-w-[26.75rem] desktop:flex desktop:flex-col">
        <CardContentElement heading="Budgets" class="mt-6 desktop:mt-0 desktop:h-full">
          <div class="mt-7 tablet:mt-[3.188rem]">
            <div
              class="justify-center items-center flex flex-col tablet:flex-row tablet:gap-[9.375rem] tablet:justify-end desktop:gap-[1.2rem]"
            >
              <DoughnutChartElement v-bind="budgetChartsRef" />

              <div class="mt-4 flex flex-wrap gap-4 tablet:mt-0 tablet:flex-col">
                <InfoColorCardElement
                  label="Entertainment"
                  :value="budgetsRef.entertainment"
                  color="bg-[var(--green)]"
                />

                <InfoColorCardElement
                  label="Bills"
                  :value="budgetsRef.bills"
                  color="bg-[var(--cyan)]"
                />

                <InfoColorCardElement
                  label="Dining Out"
                  :value="budgetsRef.diningOut"
                  color="bg-[var(--yellow)]"
                />

                <InfoColorCardElement
                  label="Personal Care"
                  :value="budgetsRef.personalCare"
                  color="bg-[var(--navy)]"
                />
              </div>
            </div>
          </div>
        </CardContentElement>

        <CardContentElement heading="Recurring Bills" class="mt-4 tablet:mt-6">
          <div class="mt-8 flex flex-col gap-3">
            <InfoCardBillElement
              label="Paid Bills"
              color="var(--green)"
              :value="recurringRef.paid"
            />

            <InfoCardBillElement
              label="Total Upcoming"
              color="var(--yellow)"
              :value="recurringRef.totalUpcoming"
            />

            <InfoCardBillElement
              label="Due Soon"
              color="var(--cyan)"
              :value="recurringRef.dueSoon"
            />
          </div>
        </CardContentElement>
      </div>
    </div>
  </div>
</template>
