<template>
  <DoughnutChart :chartData="data" :options="options" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default defineComponent({
  name: 'DoughnutChartElement',
  components: { DoughnutChart },
  setup() {
    const data = {
      labels: ['Entertainment', 'Bills', 'Dining Out', 'Personal Care'],
      datasets: [
        {
          cutout: '60%',
          borderWidth: 0,
          data: [50, 750, 75, 100],
          backgroundColor: ['#277C78', '#82C9D7', '#F2CDAC', '#626070'],
        },
        {
          cutout: '70%',
          borderWidth: 0,
          data: [50, 750, 75, 100],
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

        const mainText = '$338';
        const subText = 'of $975 limit';

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
