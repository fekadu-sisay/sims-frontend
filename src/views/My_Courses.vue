<template>
  <div
    className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm"
    v-if="state === 'pending'"
  >
    <div className="loader"></div>
  </div>
  <div class="main-Area ml-60">
    <h1 class="text-2xl bg-gray-400 text-black font-serif p-2">
      <i class="fa-solid fa-book"></i> My Courses
    </h1>
    <div class="ml-60 pt-4">
      <p class="text-black-500 font-medium">
        Student's Curriculum:-

        <select
          v-model="selectedCourse"
          class="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-400 mr-40 py-1"
        >
          <option value="Accounting">Accounting</option>
          <option value="computer_science">Computer Science</option>
          <option value="Information_Technology">Information Technology</option>
          <option value="Software_Engineering">Software Engineering</option>
          <option value="Information_System">Information System</option>
          <option value="Computer_Engineering">Computer Engineering</option>
          <option value="Cyber_Security">Cyber Security</option>
        </select>

        <input
          class="bg-transparent hover:bg-black text-black-500 font-semibold hover:text-white py-1 px-4 border border-gray-500 hover:border-transparent rounded"
          type="button"
          value="Search Courses"
          @click="getData"
        />
      </p>
    </div>
    <div>
      <table
        class="ml-10 mt-4 min-w-max w-11/12 text-center bg-black text-yellow-300 shadow-md rounded-lg overflow-hidden"
      >
        <thead>
          <tr class="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
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
            <td>{{ course.Course }}</td>
            <td>{{ course.CourseTitle }}</td>
            <td>{{ course.Credit }}</td>
            <td>{{ course.Year }}</td>
            <td>{{ course.Semester }}</td>
            <td>{{ course.CourseCategory }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '../../api/api'
export default {
  data() {
    return {
      courses: null,
      selectedCourse: null,
      state: 'free'
    }
  },
  // created() {
  //   this.getData()
  // },
  methods: {
    async getData() {
      this.state = 'pending'
      await api.get(`/courses/${this.selectedCourse}`).then((response) => {
        this.courses = response.data
        this.state = 'free'
      })
    }
  }
}
</script>
