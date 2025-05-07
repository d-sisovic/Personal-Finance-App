<script lang="ts" setup>
const props = defineProps<{
  transactions: Array<{
    date: string;
    name: string;
    image: string;
    value: number;
    category: string;
  }>;
  headers: string[];
}>();

const images = import.meta.glob('@/assets/images/avatars/*', { eager: true });

const formatValue = (value: number) => {
  const absValue = Math.abs(value).toFixed(2);

  return value > 0 ? `+$${absValue}` : `-$${absValue}`;
};
</script>

<template>
  <table class="text-left overflow-auto">
    <thead>
      <tr>
        <th
          class="py-[1.313rem] text-[0.75rem] text-[var(--grey-500)] border-b-2 border-[var(--grey-100)]"
          v-for="header of headers"
          :key="header"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(transaction, index) in props.transactions"
        :key="index"
        class="border-b border-gray-200 hover:bg-gray-50"
      >
        <td class="py-4">
          <span
            class="flex flex-wrap gap-4 items-center leading-[150%] font-bold text-[0.88rem] text-[var(--grey-900)]"
          >
            <img
              :src="
                (
                  images[`/src/assets/images/avatars/${transaction.image}`] as Record<
                    string,
                    string
                  >
                )?.default || ''
              "
              class="rounded-full h-8 w-8 tablet:h-10 tablet:w-10"
              :alt="transaction.name"
            />
            {{ transaction.name }}
          </span>
        </td>
        <td class="py-4 text-[0.75rem] text-[#696868]">{{ transaction.category }}</td>
        <td class="py-4 text-[0.75rem] text-[#696868]">{{ transaction.date }}</td>
        <td
          :class="`py-4 leading-[150%] font-bold text-[0.88rem] ${transaction.value > 0 ? 'text-[var(--green)]' : ''}`"
        >
          {{ formatValue(transaction.value) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
