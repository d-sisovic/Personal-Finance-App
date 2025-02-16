<script setup lang="ts">
import InfoCardElement from '@/components/ui/InfoCardElement.vue';
import CardContentElement from '@/components/ui/CardContentElement.vue';
import InfoCardBillElement from '@/components/ui/InfoCardBillElement.vue';
import InfoColorCardElement from '@/components/ui/InfoColorCardElement.vue';
import DoughnutChartElement from '@/components/ui/DoughnutChartElement.vue';
import TransactionCardElement from '@/components/ui/TransactionCardElement.vue';
</script>

<template>
  <div class="py-6 px-4 bg-[var(--beige-100)] min-h-screen tablet:py-8 tablet:px-10">
    <h1
      class="leading-[120%] font-bold text-[2rem] text-[var(--grey-900)] mb-8 tablet:mb-[2.625rem]"
    >
      Overview
    </h1>

    <div class="flex flex-wrap gap-3 tablet:justify-between">
      <InfoCardElement
        label="Current Balance"
        value="$4,836.00"
        :isLightMode="false"
        class="w-full tablet:max-w-[13.313rem]"
      />

      <InfoCardElement label="Income" value="$3,814.25" class="w-full tablet:max-w-[13.313rem]" />

      <InfoCardElement label="Expenses" value="$1,700.50" class="w-full tablet:max-w-[13.313rem]" />
    </div>

    <CardContentElement heading="Pots" class="mt-8">
      <div class="tablet:flex tablet:items-center gap-5">
        <div
          class="p-4 rounded-xl bg-[var(--beige-100)] flex items-center mt-5 gap-4 min-w-[15.438rem]"
        >
          <img src="@/assets/images/icon-pot.svg" alt="pot" class="w-10 h-10" />

          <div>
            <h3 class="leading-[150%] font-normal text-[0.88rem] text-[var(--grey-500)]">
              Total Saved
            </h3>

            <p class="mt-[0.688rem] leading-[120%] font-bold text-[2rem] text-[var(--grey-900)]">
              $850
            </p>
          </div>
        </div>

        <div class="mt-5 flex flex-wrap gap-4">
          <InfoColorCardElement label="Savings" value="$159" color="bg-[var(--green)]" />

          <InfoColorCardElement label="Gift" value="$40" color="bg-[var(--cyan)]" />

          <InfoColorCardElement label="Concert Ticket" value="$110" color="bg-[var(--navy)]" />

          <InfoColorCardElement label="New Laptop" value="$10" color="bg-[var(--yellow)]" />
        </div>
      </div>
    </CardContentElement>

    <CardContentElement heading="Transactions" actionLabel="View All" class="mt-6">
      <div class="mt-8 flex flex-col gap-6">
        <TransactionCardElement
          image="emma-richardson.jpg"
          name="Emma Richardson"
          :value="75.5"
          date="19 Aug 2024"
        />

        <TransactionCardElement
          image="savory-bites-bistro.jpg"
          name="Savory Bites Bistro"
          :value="-55.5"
          date="19 Aug 2024"
        />

        <TransactionCardElement
          image="daniel-carter.jpg"
          name="Daniel Carter"
          :value="-42.3"
          date="18 Aug 2024"
        />

        <TransactionCardElement
          image="sun-park.jpg"
          name="Sun Park"
          :value="120.0"
          date="17 Aug 2024"
        />

        <TransactionCardElement
          :showLine="false"
          image="urban-services-hub.jpg"
          name="Urban Services Hub"
          :value="-65"
          date="17 Aug 2024"
        />
      </div>
    </CardContentElement>

    <CardContentElement heading="Budgets" class="mt-6">
      <div class="mt-7 tablet:mt-[3.188rem]">
        <div class="tablet:flex tablet:justify-end tablet:gap-[9.375rem] tablet:items-center">
          <DoughnutChartElement />

          <div class="mt-4 flex flex-wrap gap-4 tablet:mt-0 tablet:flex-col">
            <InfoColorCardElement label="Entertainment" value="$50" color="bg-[var(--green)]" />

            <InfoColorCardElement label="Bills" value="$750" color="bg-[var(--cyan)]" />

            <InfoColorCardElement label="Dining Out" value="$75" color="bg-[var(--yellow)]" />

            <InfoColorCardElement label="Personal Care" value="$100" color="bg-[var(--navy)]" />
          </div>
        </div>
      </div>
    </CardContentElement>

    <CardContentElement heading="Recurring Bills" class="mt-4 tablet:mt-6">
      <div class="mt-8 flex flex-col gap-3">
        <InfoCardBillElement label="Paid Bills" color="var(--green)" value="$190.00" />

        <InfoCardBillElement label="Total Upcoming" color="var(--yellow)" value="$194.98" />

        <InfoCardBillElement label="Due Soon" color="var(--cyan)" value="$59.98" />
      </div>
    </CardContentElement>
  </div>
</template>
