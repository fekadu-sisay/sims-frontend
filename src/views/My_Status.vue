<template>
  <div
    className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm"
    v-if="state === 'pending'"
  >
    <div className="loader"></div>
  </div>
  <div class="main-Area ml-60">
    <h1 class="text-2xl bg-gray-400 text-black font-serif p-2">
      <i class="fa-solid fa-clipboard"></i> My Status
    </h1>
    <label class="absolute right-0 mr-4 inline-flex items-center cursor-pointer mt-4">
      <button
        class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        @click="showModule = !showModule"
      >
        <i class="fa-solid fa-chart-simple"></i> {{ showModule? 'Hide Graph' : 'Show Graphically' }}
      </button>
    </label>

    <div class="w-full">
      <table
        class="mt-20 min-w-max w-11/12 ml-8 text-center bg-black text-yellow-300 shadow-md rounded-lg overflow-hidden"
      >
        <thead>
          <tr class="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
            <th class="py-3 text-center">Year</th>
            <th class="py-3 text-center">Semester</th>
            <th class="py-3 text-center">GPA</th>
            <th class="py-3 text-center">Aggregate</th>
          </tr>
        </thead>
        <tbody class="text-yellow-500 text-lg font-light" id="tableBody"></tbody>
      </table>
      <div class="h-120 bg-white mt-8 mx-60 mb-8 rounded-lg border-4 border-indigo-500/100">
        <chart v-bind:class="{ hidden: !showModule, block: showModule }"></chart>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/api'
import { mapStores } from 'pinia'
import userModalStore from '../stores/counter'
import chart from '../views/chart.vue'
export default {
  data() {
    return {
      showModule: false,
      grades: '',
      years: null,
      state: 'free',
      gradePointScale: {
        'A+': 4.0,
        A: 4.0,
        'A-': 3.75,
        'B+': 3.5,
        B: 3.0,
        'B-': 2.75,
        'C+': 2.5,
        C: 2.0,
        'C-': 1.75,
        D: 1.0,
        F: 0.0
      }
    }
  },
  mounted() {
    this.state = 'pending'
    setTimeout(() => {
      this.state = 'free'
    }, 3000)
    this.seeResults()
  },
  computed: {
    ...mapStores(userModalStore)
  },
  components: {
    chart
  },
  methods: {
    async seeResults() {
      const response = await api.get(
        `${localStorage.getItem('field')}/${localStorage.getItem('name')}/all`
      )
      const response2 = await api.get(`/graduated/${localStorage.getItem('field')}/2023`)
      const years = parseInt(response2.data[0].StudyDuration)
      this.years = years
      const gpa = []

      for (let year = 1; year <= localStorage.getItem('dos'); year++) {
        gpa[year] = []

        for (let semester = 1; semester <= 2; semester++) {
          let totalCredit = 0
          let totalPoint = 0

          const yearSemesterCourses = response.data.filter(
            (course) =>
              course.Year === year.toString() &&
              course.Semester === semester.toString() &&
              course.idno === localStorage.getItem('idno')
          )

          for (const course of yearSemesterCourses) {
            totalCredit += Number(course.Credit)
            totalPoint += course.Credit * this.gradePointScale[course.Grade]
          }
          gpa[year][semester] = (totalPoint / totalCredit).toFixed(2)
        }
      }
      this.grades = gpa
      this.fillTable()
    },
    fillTable() {
      let tableHtml = ''
      if (localStorage.getItem('dos') >= 1) {
        tableHtml += `
            <tr class="border-b border-gray-700 hover:bg-gray-800">
            <td rowspan="2" class="border-gray-700 border-2 p-2">1</td>
            <td class="p-2">I</td>
            <td class="p-2">${isNaN(this.grades[1][1]) ? '' : this.grades[1][1]}</td>
            <td  rowspan="2" class="p-2  border-2 border-gray-700">${
              !isNaN(this.grades[1][1]) && isNaN(this.grades[1][2])
                ? (
                    (Number(isNaN(this.grades[1][1]) ? 0 : this.grades[1][1]) +
                      Number(isNaN(this.grades[1][2]) ? this.grades[1][1] : this.grades[1][2])) /
                    2
                  ).toFixed(2)
                : (
                    (Number(isNaN(this.grades[1][1]) ? 0 : this.grades[1][1]) +
                      Number(isNaN(this.grades[1][2]) ? 0 : this.grades[1][2])) /
                    2
                  ).toFixed(2)
            }</td>
          </tr>
          <tr class="border-b border-gray-700 hover:bg-gray-800">
            <td class="p-2">II</td>
            <td class="p-2">${isNaN(this.grades[1][2]) ? '' : this.grades[1][2]}</td>
          </tr>`
        this.modalStore.grade[0] = this.grades[1][1]
        this.modalStore.grade[1] = this.grades[1][2]
      }
      if (localStorage.getItem('dos') >= 2) {
        tableHtml += `
            <tr class="border-b border-gray-700 hover:bg-gray-800">
            <td rowspan="2" class="border-gray-700 border-2 p-2">2</td>
            <td class="p-2">I</td>
            <td class="p-2">${isNaN(this.grades[2][1]) ? '' : this.grades[2][1]}</td>
            <td  rowspan="2" class="p-2  border-2 border-gray-700">${
              !isNaN(this.grades[2][1]) && isNaN(this.grades[2][2])
                ? (
                    (Number(isNaN(this.grades[2][1]) ? 0 : this.grades[2][1]) +
                      Number(isNaN(this.grades[2][2]) ? this.grades[2][1] : this.grades[2][2])) /
                    2
                  ).toFixed(2)
                : (
                    (Number(isNaN(this.grades[2][1]) ? 0 : this.grades[2][1]) +
                      Number(isNaN(this.grades[2][2]) ? 0 : this.grades[2][2])) /
                    2
                  ).toFixed(2)
            }</td>
          </tr>
          <tr class="border-b border-gray-700 hover:bg-gray-800">
            <td class="p-2">II</td>
            <td class="p-2">${isNaN(this.grades[2][2]) ? '' : this.grades[2][2]}</td>
          </tr>`
        this.modalStore.grade[2] = this.grades[2][1]
        this.modalStore.grade[3] = this.grades[2][2]
      }
      if (localStorage.getItem('dos') >= 3) {
        tableHtml += `
            <tr class="border-b border-gray-700 hover:bg-gray-800">
            <td rowspan="2" class="border-gray-700 border-2 p-2">3</td>
            <td class="p-2">I</td>
            <td class="p-2">${isNaN(this.grades[3][1]) ? '' : this.grades[3][1]}</td>
            <td  rowspan="2" class="p-2  border-2 border-gray-700">${
              !isNaN(this.grades[2][1]) && isNaN(this.grades[2][2])
                ? (
                    (Number(isNaN(this.grades[3][1]) ? 0 : this.grades[3][1]) +
                      Number(isNaN(this.grades[3][2]) ? this.grades[3][1] : this.grades[3][2])) /
                    2
                  ).toFixed(2)
                : (
                    (Number(isNaN(this.grades[3][1]) ? 0 : this.grades[3][1]) +
                      Number(isNaN(this.grades[3][2]) ? 0 : this.grades[3][2])) /
                    2
                  ).toFixed(2)
            }</td>
          </tr>
          <tr class="border-b border-gray-700 hover:bg-gray-800">
            <td class="p-2">II</td>
            <td class="p-2">${isNaN(this.grades[3][2]) ? '' : this.grades[3][2]}</td>
          </tr>`
        this.modalStore.grade[4] = this.grades[3][1]
        this.modalStore.grade[5] = this.grades[3][2]
      }
      if (localStorage.getItem('dos') >= 4) {
        tableHtml += `
            <tr class="border-b border-gray-700 hover:bg-gray-800">
            <td rowspan="2" class="border-gray-700 border-2 p-2">4</td>
            <td class="p-2">I</td>
            <td class="p-2">${isNaN(this.grades[4][1]) ? '' : this.grades[4][1]}</td>
            <td  rowspan="2" class="p-2  border-2 border-gray-700">${
              !isNaN(this.grades[4][1]) && isNaN(this.grades[4][2])
                ? (
                    (Number(isNaN(this.grades[4][1]) ? 0 : this.grades[4][1]) +
                      Number(isNaN(this.grades[4][2]) ? this.grades[4][1] : this.grades[4][2])) /
                    2
                  ).toFixed(2)
                : (
                    (Number(isNaN(this.grades[4][1]) ? 0 : this.grades[4][1]) +
                      Number(isNaN(this.grades[4][2]) ? 0 : this.grades[4][2])) /
                    2
                  ).toFixed(2)
            }</td>
          </tr>
          <tr class="border-b border-gray-700 hover:bg-gray-800">
            <td class="p-2">II</td>
            <td class="p-2">${isNaN(this.grades[4][2]) ? '' : this.grades[4][2]}</td>
          </tr>`
        this.modalStore.grade[6] = this.grades[4][1]
        this.modalStore.grade[7] = this.grades[4][2]
      }
      if (localStorage.getItem('dos') == 5) {
        tableHtml += `
            <tr class="border-b border-gray-700 hover:bg-gray-800">
            <td rowspan="2" class="border-gray-700 border-2 p-2">5</td>
            <td class="p-2">I</td>
            <td class="p-2">${isNaN(this.grades[5][1]) ? '' : this.grades[5][1]}</td>
            <td  rowspan="2" class="p-2  border-2 border-gray-700">${
              !isNaN(this.grades[2][1]) && isNaN(this.grades[2][2])
                ? (
                    (Number(isNaN(this.grades[5][1]) ? 0 : this.grades[5][1]) +
                      Number(isNaN(this.grades[5][2]) ? this.grades[5][1] : this.grades[5][2])) /
                    2
                  ).toFixed(2)
                : (
                    (Number(isNaN(this.grades[5][1]) ? 0 : this.grades[5][1]) +
                      Number(isNaN(this.grades[5][2]) ? 0 : this.grades[5][2])) /
                    2
                  ).toFixed(2)
            }</td>
          </tr>
          <tr class="border-b border-gray-700 hover:bg-gray-800">
            <td class="p-2">II</td>
            <td class="p-2">${isNaN(this.grades[5][2]) ? '' : this.grades[5][2]}</td>
          </tr>`
        this.modalStore.grade[8] = this.grades[5][1]
        this.modalStore.grade[9] = this.grades[5][2]
      }
      document.getElementById('tableBody').innerHTML = tableHtml
    }
  }
}
</script>
