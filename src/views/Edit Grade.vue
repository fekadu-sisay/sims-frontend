<template>
  <div class="ml-60">
    <h1 class="text-2xl bg-gray-400 text-black font-serif p-2">Edit Grades</h1>
    <div class="pt-24">
      <table
        v-if="showTable"
        class="ml-10 min-w-max w-11/12 text-center bg-black text-yellow-300 shadow-md rounded-lg overflow-hidden"
      >
        <thead>
          <tr class="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
            <th class="py-3 text-center">ID Number</th>
            <th class="py-3 text-center">Username</th>
            <th class="py-3 text-center">Field of Study</th>
            <th class="py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody class="text-yellow-500 text-lg font-light">
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-b border-gray-700 hover:bg-gray-800"
          >
            <td>{{ user.idno }}</td>
            <td>{{ user.Username }}</td>
            <td>{{ user['Field of study'] }}</td>
            <td>
              <button
                @click="edit(user.idno, user['Field of study'], user.Username)"
                type="button"
                class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded m-2"
              >
                Edit
              </button>
              <button
                @click="remove(user.idno)"
                type="button"
                class="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded text-center mx-96 mb-8 mt-4"
        role="alert"
        v-if="isRemoved"
      >
        <p>User Removed Successfully!</p>
      </div>
    </div>
    <div v-if="!showTable">
      <div
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded text-center mx-96 mb-8"
        role="alert"
        v-if="showSuccessMessage"
      >
        <p>Grade Updated Successfully!</p>
      </div>
      <button
        @click="showTable = true"
        class="absolute right-0 top-0 mr-24 mt-20 border-2 border-black text-white bg-black hover:bg-white hover:text-black font-bold py-2 px-4 rounded"
      >
        Back
      </button>
      <button
        @click="updateGrade"
        class="absolute left-0 top-0 mr-24 mt-20 ml-64 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Edit Grade
      </button>
      <div>
        <table
          class="ml-10 min-w-max w-11/12 text-center bg-black text-yellow-300 shadow-md rounded-lg overflow-hidden"
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
            <tr
              v-for="(grade, i) in grades"
              :key="i"
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
                  v-model="grade.Grade"
                  class="w-20 px-2 bg-gray-500 text-white font-semibold text-center border rounded focus:outline-none focus:border-blue-500"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../api/api'
import { mapStores } from 'pinia'
import userModalStore from '../stores/counter'
export default {
  data() {
    return {
      showTable: true,
      showForm: false,
      users: '',
      username: '',
      id: '',
      grades: [],
      results: [],
      isRemoved: false,
      showSuccessMessage: false
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapStores(userModalStore)
  },
  methods: {
    edit(id, field) {
      this.field = field
      this.id = id
      this.showTable = !this.showTable
      this.seeResults()
    },
    async remove(id) {
      if (confirm('Are you sure you want to remove the user?')) {
        const response = await api.delete(`/removeuser/${id}`)
        if (response.data.status === true) {
          this.isRemoved = true
          setTimeout(() => {
            this.isRemoved = false
          }, 3000)
          this.getData()
        }
      }
    },
    async updateGrade() {
      let gradesArray = []
      this.data = [...this.grades]
      for (const item of this.data) {
        gradesArray.push(item.Grade)
      }
      gradesArray.push(this.id)
      gradesArray.push(this.field)
      const response = await api.put('/updategrades', gradesArray)
      if (response.data.status === true) {
        // this.gradesArray.length = 0
        this.showSuccessMessage = true
        setTimeout(() => {
          this.showSuccessMessage = false
        }, 3000)
      }
    },
    async getData() {
      await api.get('/showusers').then((response) => {
        this.users = response.data
      })
    },
    async seeResults() {
      if (this.field == 'Accounting') {
        this.username = 'useracc'
        this.idno = 'acc1'
      } else if (this.field == 'computer_science') {
        this.username = 'usercs'
        this.idno = 'cs1'
      } else if (this.field == 'Information_Technology') {
        this.username = 'userit'
        this.idno = 'it1'
      } else if (this.field == 'Software_Engineering') {
        this.username = 'userse'
        this.idno = 'se1'
      } else if (this.field == 'Information_System') {
        this.username = 'useris'
        this.idno = 'is1'
      } else if (this.field == 'Computer_Engineering') {
        this.username = 'userce'
        this.idno = 'ce1'
      } else {
        this.username = 'usercy'
        this.idno = 'cy1'
      }
      await api.get(`${this.field}/${this.username}/all`).then((response) => {
        const filteredGrades = response.data.filter((item) => item.idno == this.id)
        this.grades = filteredGrades
      })
    }
  }
}
</script>
