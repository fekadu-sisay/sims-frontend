<template>
  <div>
    <div id="chart">
    </div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts';
import { mapStores } from 'pinia'
import userModalStore from '../stores/counter'
export default {
  data(){
    return{
      grade:null,
      chart :null
    }
  },
  mounted() {
    if(this.grade === null){
      this.grade = this.modalStore.grade
    }
    this.renderChart()
  },
  computed: {
    ...mapStores(userModalStore)
  },
  methods: {
    renderChart() {
    var options = {
      chart: {
        type: 'bar'
      },
      series: [
        {
          name: 'Grades',
          data: this.grade
        }
      ],
      xaxis: {
        categories: ['Y1S1', 'Y1S2', 'Y1S1', 'Y1S2','Y3S1', 'Y3S2', 'Y4S1', 'Y4S2','Y5S1','Y5S2']
      }
    };

    this.chart = new ApexCharts(document.querySelector('#chart'), options);
    this.chart.render();
  }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');

body {
  font-family: Roboto, sans-serif;
}

#chart {
  max-width: 650px;
  margin: 35px auto;
}
</style>
