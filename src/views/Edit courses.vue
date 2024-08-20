<template>
  <div class="ml-60">
    <h1 class="text-2xl bg-gray-400 text-black font-serif p-2">Edit Courses</h1>

    <div class="mt-40">
      <table
        v-if="showModal"
        class="ml-10 min-w-max w-11/12 text-center bg-black text-yellow-300 shadow-md rounded-lg overflow-hidden"
      >
        <thead>
          <tr class="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
            <th class="py-3 text-center">Courses</th>
            <th class="py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody class="text-yellow-500 text-lg font-light">
          <tr
            class="border-b border-gray-700 hover:bg-gray-800"
            v-for="(course, i) in Courses"
            :key="i"
          >
            <td>{{ course }}</td>
            <td class="py-2 px-4">
              <button
                @click="add(course)"
                type="button"
                class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded m-2"
              >
                Add
              </button>
              <button
                @click="remove(course)"
                type="button"
                class="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <button
        v-if="this.showBtn === 'add'"
        @click="sendAddData"
        class="absolute left-0 top-0 mr-24 mt-20 ml-64 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Course
      </button>
      <button
        v-if="this.showBtn === 'remove'"
        @click="sendRemoveData"
        class="absolute left-0 top-0 mr-24 mt-20 ml-64 bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
      >
        Remove Course
      </button>
      <button
        v-if="!showModal"
        @click="(showModal = !showModal), (showBtn = null)"
        class="absolute right-0 top-0 mr-24 mt-20 ml-64 bg-black hover:bg-black text-white font-bold py-2 px-4 rounded"
      >
        Back
      </button>
      <div
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded text-center mx-96 mb-8 mt-4"
        role="alert"
        v-if="showAddSuccess"
      >
        <p>Course Added Successfully!</p>
      </div>
      <div
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded text-center mx-96 mb-8 mt-4"
        role="alert"
        v-if="showRemovalSuccess"
      >
        <p>Course Removed Successfully!</p>
      </div>
      <table
        v-if="!showModal"
        class="ml-10 mt-4 min-w-max w-11/12 text-center bg-black text-yellow-300 shadow-md rounded-lg overflow-hidden"
      >
        <thead>
          <tr class="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
            <th class="py-3 px-2 text-center" v-if="showBtn == 'remove'">Select</th>
            <th class="py-3 px-2 text-center">Course</th>
            <th class="py-3 px-2 text-center">Course Title</th>
            <th class="py-3 px-2 text-center">Credit</th>
            <th class="py-3 px-2 text-center">Year</th>
            <th class="py-3 px-2 text-center">Semester</th>
            <th class="py-3 px-2 text-center">Course Category</th>
          </tr>
        </thead>
        <tbody class="text-yellow-500 text-lg font-light">
          <tr
            v-for="course in courses"
            :key="course.Course"
            class="border-b border-gray-700 hover:bg-gray-800"
          >
            <td v-if="showBtn == 'remove'">
              <input type="checkbox" v-model="selectedCourse" :value="course.Course" />
            </td>
            <td>{{ course.Course }}</td>
            <td>{{ course.CourseTitle }}</td>
            <td>{{ course.Credit }}</td>
            <td>{{ course.Year }}</td>
            <td>{{ course.Semester }}</td>
            <td>{{ course.CourseCategory }}</td>
          </tr>

          <tr class="border-b border-gray-700 hover:bg-gray-800" v-if="showBtn == 'add'">
            <td>
              <input
                required
                type="text"
                v-model="courseData.course"
                class="w-20 px-2 bg-gray-500 text-yellow-300 text-center border rounded focus:outline-none focus:border-blue-500 m-2"
              />
            </td>
            <td>
              <input
                required
                type="text"
                v-model="courseData.course_title"
                class="w-46 px-2 bg-gray-500 text-yellow-300 text-center border rounded focus:outline-none focus:border-blue-500 m-2"
              />
            </td>
            <td>
              <input
                required
                type="number"
                v-model="courseData.credit"
                class="w-20 px-2 bg-gray-500 text-yellow-300 text-center border rounded focus:outline-none focus:border-blue-500 m-2"
              />
            </td>
            <td>
              <input
                required
                type="number"
                v-model="courseData.year"
                class="w-20 px-2 bg-gray-500 text-yellow-300 text-center border rounded focus:outline-none focus:border-blue-500 m-2"
              />
            </td>
            <td>
              <input
                required
                type="number"
                v-model="courseData.semester"
                class="w-20 px-2 bg-gray-500 text-yellow-300 text-center border rounded focus:outline-none focus:border-blue-500 m-2"
              />
            </td>
            <td>
              <input
                required
                type="text"
                v-model="courseData.category"
                class="w-20 px-2 bg-gray-500 text-yellow-300 text-center border rounded focus:outline-none focus:border-blue-500 m-2"
              />
            </td>
          </tr>
        </tbody>
      </table>
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
      showAddSuccess: false,
      showRemovalSuccess: false,
      selectedCourse: [],
      showBtn: null,
      courses: null,
      showModal: true,
      Courses: [
        'Accounting',
        'computer_science',
        'Information_Technology',
        'Software_Engineering',
        'Information_System',
        'Computer_Engineering',
        'Cyber_Security'
      ],
      courseData: {
        course: null,
        course_title: null,
        credit: null,
        year: null,
        semester: null,
        category: null,
        field: null
      }
    }
  },
  computed: {
    ...mapStores(userModalStore)
  },
  methods: {
    add(field) {
      this.modalStore.editCourse = field
      this.getData(field)
      this.addCourse = true
      this.showModal = false
      this.showBtn = 'add'
    },
    remove(field) {
      this.modalStore.editCourse = field
      this.getData(field)
      this.removeCourse = true
      this.showModal = false
      this.showBtn = 'remove'
    },
    async getData(field) {
      await api.get(`/courses/${field}`).then((response) => {
        this.courses = response.data
        console.log(response.data)
      })
    },
    async sendAddData() {
      this.courseData.field = this.modalStore.editCourse
      const response = await api.post('/addcourse', this.courseData)
      if (response.data.status === true) {
        this.showAddSuccess = true
        this.courseData = {}
        setTimeout(() => {
          this.showAddSuccess = false
        }, 3000)
        this.getData(this.modalStore.editCourse)
      }
    },
    async sendRemoveData() {
      let response = ''
      const check = confirm('Are you sure you want to remove the selected courses?')
      if (check) {
        this.selectedCourse.push(this.modalStore.editCourse)
        response = await api.post('/removecourse', this.selectedCourse)
      }
      if (response.data.status === true) {
        this.showRemovalSuccess = true
        setTimeout(() => {
          this.showRemovalSuccess = false
        }, 3000)
        this.getData(this.modalStore.editCourse)
      }
    }
  }
}
</script>
