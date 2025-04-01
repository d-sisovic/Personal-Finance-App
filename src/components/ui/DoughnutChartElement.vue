<template>
  <DoughnutChart :chartData="data" :options="options" class="w-60 h-60" />
</template>

<script lang="ts">
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import { defineComponent, type PropType } from 'vue';

Chart.register(...registerables);

export default defineComponent({
  name: 'DoughnutChartElement',
  components: { DoughnutChart },
  props: {
    current: { type: String, required: true },
    limit: { type: String, required: true },
    values: { type: Array as PropType<number[]>, required: true },
  },
  setup({ current, limit, values }) {
    const data = {
      labels: ['Entertainment', 'Bills', 'Dining Out', 'Personal Care'],
      datasets: [
        {
          cutout: '60%',
          borderWidth: 0,
          data: values,
          backgroundColor: ['#277C78', '#82C9D7', '#F2CDAC', '#626070'],
        },
        {
          cutout: '70%',
          borderWidth: 0,
          data: values,
          backgroundColor: ['#5D9D9A', '#A1D7E1', '#F5DAC1', '#898894'],
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false },
      },
    };

    const centerTextPlugin = {
      id: 'centerText',
      beforeDraw(chart: Chart) {
        const { width, height, ctx } = chart;

        ctx.save();

        const mainText = current;
        const subText = `of ${limit} limit`;

        const centerX = width / 2;
        const centerY = height / 2;

        // Main Text Styling
        ctx.font = 'bold 32px Public-Sans';
        ctx.fillStyle = '##201F24';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(mainText, centerX, centerY - 10);

        // Sub Text Styling
        ctx.font = '12px Public-Sans';
        ctx.fillStyle = '#696868';
        ctx.fillText(subText, centerX, centerY + 23);

        ctx.restore();
      },
    };

    Chart.register(centerTextPlugin);

    return { data, options };
  },
});
</script>
