<template>
  <div
    className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm"
    v-if="state === 'pending'"
  >
    <div className="loader"></div>
  </div>
  <div class="main-Area ml-60 ">
    <h1 class="text-2xl bg-gray-400 text-black font-serif p-2">
      <i class="fa-solid fa-user-graduate"></i> Graduated Students
    </h1>
    <div class="ml-60 pt-4">
      <p class="text-black-500 font-medium">
        Field of Study:-

        <select
          v-model="selectedField"
          class="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-400 mr-40 py-1 mb-4"
        >
          <option v-for="(field, index) in fields" :key="index" :value="field">{{ field }}</option>
        </select>
        <br />
      </p>

      <p class="text-black-500 font-medium">
        Graduated Year:-

        <select
          v-model="selectedYear"
          class="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-400 mr-40 py-1"
        >
          <option v-for="(year, index) in years" :key="index" :value="year">
            {{ year }}
          </option>
        </select>

        <input
          @click="getList"
          class="bg-transparent hover:bg-black text-black-500 font-semibold hover:text-white py-1 px-4 border border-gray-500 hover:border-transparent rounded"
          type="button"
          value="Search "
        />
      </p>
    </div>

    <div>
      <table
        class="ml-10 mt-4 min-w-max w-11/12 ml-8 text-center bg-black text-yellow-300 shadow-md rounded-lg overflow-hidden"
      >
        <thead>
          <tr class="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
            <th class="py-3 text-center">First Name</th>
            <th class="py-3 text-center">Father Name</th>
            <th class="py-3 text-center">GFather Name</th>
            <th class="py-3 text-center">Sex</th>
            <th class="py-3 text-center">Degree Awarded</th>
            <th class="py-3 text-center">Study Duration</th>
            <th class="py-3 text-center">Graduation Date</th>
          </tr>
        </thead>
        <tbody class="text-yellow-500 text-lg font-light">
          <tr
            v-for="graduate in graduates"
            :key="graduate.id"
            class="border-b border-gray-700 hover:bg-gray-800"
          >
            <td>{{ graduate.FirstName }}</td>
            <td>{{ graduate.FatherName }}</td>
            <td>{{ graduate.GFatherName }}</td>
            <td>{{ graduate.Sex }}</td>
            <td>{{ graduate.DegreeAwarded }}</td>
            <td>{{ graduate.StudyDuration }}</td>
            <td>{{ graduate.GraduationDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '../../api/api'

export default {
  name: 'graduated',
  data() {
    return {
      state: 'free',
      selectedField: '',
      selectedYear: 0,
      graduates: '',
      fields: [
        'Accounting',
        'computer_science',
        'Information_Technology',
        'Software_Engineering',
        'Information_System',
        'Computer_Engineering',
        'Cyber_Security'
      ],
      years: [2020, 2021, 2022, 2022, 2023]
    }
  },
  methods: {
    async getList() {
      this.state = 'pending'
      await api.get(`/graduated/${this.selectedField}/${this.selectedYear}`).then((response) => {
        this.graduates = response.data
        this.state = 'free'
      })
    }
  }
}
</script>

<style></style>
