<script setup lang="ts">
import { computed } from 'vue';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import DropdownElement from '../ui/DropdownElement.vue';
import { useTransactionStore } from '@/stores/transaction';
import PaginationElement from '../ui/PaginationElement.vue';
import CardContentElement from '../ui/CardContentElement.vue';
import InputFilterElement from '../ui/InputFilterElement.vue';
import TransactionCardElement from '../ui/TransactionCardElement.vue';
import TransactionTableElement from '../ui/TransactionTableElement.vue';

const { isDesktop } = useIsDesktop();

const transactionStore = useTransactionStore();

const tableHeaders = ['Recipient/Sender', 'Category', 'Transaction Date', 'Amount'];

const sortDropdownItems = ['Latest', 'Oldest', 'A to Z', 'Z to A', 'Highest', 'Lowest'];

const filterDropdownItems = [
  'All transactions',
  'Entertainment',
  'Bills',
  'Groceries',
  'Dining Out',
  'Transportation',
  'Personal Care',
];

const filteredTransactions = computed(() => transactionStore.filteredTransactions);

const onPageChange = (page: number) => console.log('Selected page:', page);

const onSortSelect = (sort: string) => transactionStore.onSetSort(sort);

const onCategorySelect = (category: string) => transactionStore.onSetCategory(category);
</script>

<template>
  <div class="py-6 px-4 tablet:py-8 tablet:px-10 desktop:py-8 desktop:px-10">
    <h1
      class="leading-[120%] font-bold text-[2rem] text-[var(--grey-900)] mb-8 tablet:mb-[2.625rem] desktop:mb-8 desktop:leading-[3.5rem]"
    >
      Transactions
    </h1>

    <CardContentElement heading="" actionLabel="" class="mt-8">
      <div class="flex flex-wrap items-center justify-between gap-6">
        <InputFilterElement
          input-class="desktop:min-w-[20rem]"
          placeholder="Search transaction"
          @update-filter-input="transactionStore.onSetSearchFilter"
        />

        <div class="flex gap-6">
          <DropdownElement
            imagePath="icon-sort-mobile.svg"
            :heading="'Sort by'"
            :dropdownItems="sortDropdownItems"
            :onSelectItem="onSortSelect"
          />

          <DropdownElement
            imagePath="icon-filter-mobile.svg"
            :heading="'Category'"
            :dropdownItems="filterDropdownItems"
            :onSelectItem="onCategorySelect"
          />
        </div>
      </div>

      <div class="mt-8 flex flex-col gap-6 overflow-x-auto">
        <template v-if="isDesktop">
          <TransactionTableElement :transactions="filteredTransactions" :headers="tableHeaders" />
        </template>

        <TransactionCardElement
          v-else
          v-for="(transactionItem, index) in filteredTransactions"
          :key="transactionItem.uuid"
          :list-item="transactionItem"
          :show-line="filteredTransactions.length !== index + 1"
        />

        <PaginationElement :total-items="15" @selected-page="onPageChange" />
      </div>
    </CardContentElement>
  </div>
</template>
