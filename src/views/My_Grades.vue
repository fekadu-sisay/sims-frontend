<template>
  <div
    className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm"
    v-if="state === 'pending'"
  >
    <div className="loader"></div>
  </div>
  <div class="main-Area ml-60">
    <h1 class="text-2xl bg-gray-400 text-black font-serif p-2">
      <i class="fa-solid fa-medal"></i> My Grades
    </h1>
    <div class="ml-60 pt-4">
      <p class="text-black-500 font-medium">
        Choose Your Option:-

        <select
          v-model="selectedOption"
          class="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-400 mr-40 py-1"
        >
          <option value="all">All Taken Courses</option>
          <option value="incomplete">Incomplete Courses</option>
          <option value="f">Not Removed F Couses</option>
          <option value="unregistered">Remaining Unregistered Courses</option>
          <option value="exempted">Exempted Courses</option>
          <option value="waived">Waived Courses</option>
        </select>

        <input
          class="bg-transparent hover:bg-black text-black-500 font-semibold hover:text-white py-1 px-4 border border-gray-500 hover:border-transparent rounded"
          type="button"
          @click.prevent="seeResults()"
          value="Search"
        />
      </p>
    </div>

    <div>
      <table
        class="ml-10 mt-8 min-w-max w-11/12 text-center bg-black text-yellow-300 shadow-md rounded-lg overflow-hidden"
      >
        <thead>
          <tr class="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
            <th class="py-3 px-2 text-center">Course</th>
            <th class="py-3 px-2 text-center">Course Title</th>
            <th class="py-3 px-2 text-center">Credit</th>
            <th class="py-3 px-2 text-center">Year</th>
            <th class="py-3 px-2 text-center">Semester</th>
            <th class="py-3 px-2 text-center">Grade</th>
          </tr>
        </thead>
        <tbody class="text-yellow-500 text-lg font-light">
          <tr
            v-for="grade in grades"
            :key="grade.grades"
            class="border-b border-gray-700 hover:bg-gray-800"
          >
            <td>{{ grade.Course }}</td>
            <td>{{ grade.Course_Title }}</td>
            <td>{{ grade.Credit }}</td>
            <td>{{ grade.Year }}</td>
            <td>{{ grade.Semester }}</td>
            <td>{{ grade.Grade }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import userModalStore from '../stores/counter'
import api from '../../api/api'
export default {
  data() {
    return {
      grades: null,
      selectedOption: 'all',
      state: 'free'
    }
  },
  mounted() {
    this.state = 'pending'
    setTimeout(() => {
      this.state = 'free'
    }, 3000)
    this.seeResults(this.modalStore.loggedUser)
  },
  computed: {
    ...mapStores(userModalStore)
  },
  methods: {
    async seeResults() {
      await api
        .get(
          `${localStorage.getItem('field')}/${localStorage.getItem('name')}/${this.selectedOption}`
        )
        .then((response) => {
          const filteredGrades = response.data.filter(
            (item) => item.idno === localStorage.getItem('idno')
          )
          this.grades = filteredGrades
        })
    }
  }
}
</script>

<style></style>
