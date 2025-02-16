<template>
  <div
    class="w-full bg-[var(--grey-900)] rounded-t-md rounded-b-none pt-2 px-4 pb-0 h-[3.25rem] flex justify-around items-center tablet:h-[4.625rem] tablet:px-10"
  >
    <div
      class="pt-2 pb-3 px-6 rounded-t-md border-b-4 border-[var(--green)] bg-[var(--beige-100)] tablet:h-[4.125rem] tablet:w-[6.5rem] tablet:inline-flex tablet:items-center tablet:space-around tablet:flex-col"
    >
      <img
        src="@/assets/images/icon-nav-overview.svg"
        alt="overview"
        class="green-filter tablet:w-6 tablet:h-6"
      />

      <span
        class="hidden leading-[150%] font-bold text-[0.75rem] tablet:block mt-[0.438rem] whitespace-nowrap text-[var(--grey-900)]"
        >Overview</span
      >
    </div>

    <div
      class="pt-2 pb-3 px-6 tablet:h-[4.125rem] tablet:w-[6.5rem] tablet:inline-flex tablet:items-center tablet:space-around tablet:flex-col"
    >
      <img
        src="@/assets/images/icon-nav-transactions.svg"
        alt="transactions"
        class="tablet:w-6 tablet:h-6"
      />

      <span
        class="hidden leading-[150%] font-bold text-[0.75rem] tablet:block mt-[0.438rem] whitespace-nowrap text-[var(--grey-300)]"
        >Transactions</span
      >
    </div>

    <div
      class="pt-2 pb-3 px-6 tablet:h-[4.125rem] tablet:w-[6.5rem] tablet:inline-flex tablet:items-center tablet:space-around tablet:flex-col"
    >
      <img src="@/assets/images/icon-nav-budgets.svg" alt="budgets" class="tablet:w-6 tablet:h-6" />

      <span
        class="hidden leading-[150%] font-bold text-[0.75rem] tablet:block mt-[0.438rem] whitespace-nowrap text-[var(--grey-300)]"
        >Budgets</span
      >
    </div>

    <div
      class="pt-2 pb-3 px-6 tablet:h-[4.125rem] tablet:w-[6.5rem] tablet:inline-flex tablet:items-center tablet:space-around tablet:flex-col"
    >
      <img src="@/assets/images/icon-nav-pots.svg" alt="pots" class="tablet:w-6 tablet:h-6" />

      <span
        class="hidden leading-[150%] font-bold text-[0.75rem] tablet:block mt-[0.438rem] whitespace-nowrap text-[var(--grey-300)]"
        >Pots</span
      >
    </div>

    <div
      class="pt-2 pb-3 px-6 tablet:h-[4.125rem] tablet:w-[6.5rem] tablet:inline-flex tablet:items-center tablet:space-around tablet:flex-col"
    >
      <img
        src="@/assets/images/icon-nav-recurring-bills.svg"
        alt="recurring-bills"
        class="tablet:w-6 tablet:h-6"
      />

      <span
        class="hidden leading-[150%] font-bold text-[0.75rem] text-[var(--grey-300)] mt-[0.438rem] whitespace-nowrap tablet:block"
      >
        Recurring bills</span
      >
    </div>
  </div>
</template>
