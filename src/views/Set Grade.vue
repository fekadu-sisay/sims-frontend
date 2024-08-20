<template>
  <div class="ml-60">
    <h1 class="text-2xl bg-gray-400 text-black font-serif p-2">Set Grades</h1>
    <div class="pt-8 text-lg font-semibold mb-4 ml-8"></div>
    <select
      id="user-select"
      class="ml-16 w-30 text-black border border-gray-300 rounded py-2 px-4 text-lg focus:outline-none focus:border-blue-700"
    >
      <option selected>{{ this.modalStore.data[1] }}</option>
    </select>
    <button
      @click="showForm"
      class="ml-20 py-2.5 px-5 mr-4 mt-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >
      Insert Grade
    </button>

    <button
      @click="submitGrades"
      class="absolute right-0 mr-24 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Submit Grades
    </button>

    <div
      class="bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded text-center mx-96 mb-8"
      role="alert"
      v-if="showSuccessMessage"
    >
      <p>Data entered Successfully!</p>
    </div>
    <table
      class="ml-10 mt-8 min-w-max w-11/12 text-center bg-black text-yellow-300 shadow-md rounded-lg overflow-hidden"
      v-if="showTable"
    >
      <thead>
        <tr class="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
          <th class="py-3 text-center">Course</th>
          <th class="py-3 text-center">Course Title</th>
          <th class="py-3 text-center">Credit</th>
          <th class="py-3 text-center">Year</th>
          <th class="py-3 text-center">Semester</th>
          <th class="py-3 text-center">Grade</th>
        </tr>
      </thead>
      <tbody class="text-yellow-500 text-lg font-light" id="formtable">
        <!-- <tr class="border-b border-gray-700 hover:bg-gray-800">
          <td class="py-2 px-4">SE101</td>
          <td class="py-2 px-4">Introduction to Software Engineering</td>
          <td class="py-2 px-4">3</td>
          <td class="py-2 px-4">1</td>
          <td class="py-2 px-4">1</td>
          <td class="py-2 px-4">
            <input
              type="text"
              v-model="this.grades[grade.id]"
              class="w-20 px-2 py-1 bg-gray-500 text-white font-semibold text-center border rounded focus:outline-none focus:border-blue-500"
            />
          </td>
        </tr> -->
        <tr
          v-for="(grade, i) in grades"
          :key="grade.id"
          class="border-b border-gray-700 hover:bg-gray-800"
        >
          <td>{{ grade.Course }}</td>
          <td>{{ grade.Course_Title }}</td>
          <td>{{ grade.Credit }}</td>
          <td>{{ grade.Year }}</td>
          <td>{{ grade.Semester }}</td>
          <td class="py-2 px-4">
            <input
              maxlength="2"
              type="text"
              v-model="this.results[i]"
              class="text-transform: uppercase w-20 px-2 bg-gray-500 text-white font-semibold text-center border rounded focus:outline-none focus:border-blue-500"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../../api/api'
import { mapStores } from 'pinia'
import userModalStore from '../stores/counter'
export default {
  data() {
    return {
      username: null,
      idno: null,
      field: null,
      grades: null,
      results: [],
      users: null,
      showTable: false,
      id: null,
      data: [],
      showSuccessMessage: false
    }
  },
  computed: {
    ...mapStores(userModalStore)
  },
  methods: {
    async showRegisteredStudents() {
      const response = await api.get('/showusers')
      this.users = response.data
    },
    async submitGrades() {
      this.data = [...this.results]
      this.data.push(this.modalStore.data[1])
      this.data.push(this.modalStore.data[2])

      const response = await api.post('/setgrades', this.data)

      if (response.data.status === true) {
        this.data.length = 0
        this.showSuccessMessage = true
        setTimeout(() => {
          this.showSuccessMessage = false
        }, 3000)
      }
    },
    showForm() {
      this.showTable = true
      this.seeResults()
    },
    async seeResults() {
      if (this.modalStore.data[2] == 'Accounting') {
        this.username = 'useracc'
        this.idno = 'acc1'
      } else if (this.modalStore.data[2] == 'computer_science') {
        this.username = 'usercs'
        this.idno = 'cs1'
      } else if (this.modalStore.data[2] == 'Information_Technology') {
        this.username = 'userit'
        this.idno = 'it1'
      } else if (this.modalStore.data[2] == 'Software_Engineering') {
        this.username = 'userse'
        this.idno = 'se1'
      } else if (this.modalStore.data[2] == 'Information_System') {
        this.username = 'useris'
        this.idno = 'is1'
      } else if (this.modalStore.data[2] == 'Computer_Engineering') {
        this.username = 'userce'
        this.idno = 'ce1'
      } else {
        this.username = 'usercy'
        this.idno = 'cy1'
      }

      await api.get(`${this.modalStore.data[2]}/${this.username}/all`).then((response) => {
        const filteredGrades = response.data.filter((item) => item.idno == this.idno)
        this.grades = filteredGrades
      })
    }
  },
  mounted() {
    this.showRegisteredStudents()
  }
}
</script>
