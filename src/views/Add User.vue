<template>
  <div class="main-Area ml-60">
    <h1 class="text-2xl bg-gray-400 text-black font-serif p-2">
      <i class="fa-solid fa-pen-nib"></i> Register Students
    </h1>
    <button
      class="absolute right-0 py-2.5 px-5 mr-4 mt-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      @click="showRegisteredStudents"
    >
      {{ showTable? 'Hide Students' : 'Show Registered Students' }}
    </button>
    <div>
      <div class="flex items-center justify-center h-4/6 mt-16 mb-8">
        <div class="flex w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/3 rounded-lg shadow-xl overflow-hidden">
          <div class="w-1/2 bg-white">
            <img
              src="/images/register.jpg"
              alt="Image"
              class="w-full h-full object-cover rounded-lg"
            />
          </div>

          <form class="w-1/2 p-12 bg-[#ccc]" id="user-form">
            <div class="mb-4">
              <label class="block text-black font-bold text-lg mb-2" for="id-number"
                >ID Number</label
              >
              <input
              class="ml-18 mt-4 h-10 text-black p-4 rounded outline-none w-[80%]" 
                type="text"
                id="id-number"
                v-model="userData.idno"
              />
            </div>
            <div class="mb-4">
              <label class="block text-black font-bold text-lg mb-2" for="id-number"
                >Username</label
              >
              <input
              class="ml-18 mt-4 h-10 text-black p-4 rounded outline-none w-[80%]" 
                type="text"
                id="username"
                v-model="userData.username"
              />
            </div>
            <div class="mb-4">
              <label class="block text-black font-bold text-lg mb-2" for="id-number">Email</label>
              <input
              class="ml-18 mt-4 h-10 text-black p-4 rounded outline-none w-[80%]" 
                type="email"
                id="email"
                v-model="userData.email"
              />
            </div>
            <div class="mb-4">
              <label class="block text-black font-bold text-lg mb-2" for="id-number"
                >Field of Study</label
              >
              <select
                v-model="userData.fos"
                id="fos"
                @input="fillDos"
                @change="autofillDuration"
                class="ml-18 mt-4 h-10 text-black px-2 rounded outline-none w-[80%]" 
              >
                <option value="Accounting">Accounting</option>
                <option value="computer_science">Computer Science</option>
                <option value="Information_Technology">Information Technology</option>
                <option value="Software_Engineering">Software Engineering</option>
                <option value="Information_System">Information System</option>
                <option value="Computer_Engineering">Computer Engineering</option>
                <option value="Cyber_Security">Cyber Security</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-black font-bold text-lg mb-2" for="id-number"
                >Duration of Study</label
              >
              <input
                readonly
                class="ml-18 mt-4 h-10 text-black p-4 rounded outline-none w-[80%]" 
                type="number"
                id="dos"
                v-model="userData.dos"
              />
            </div>
            <div class="text-center">
              <button
                @click="sendUserData"
                class="signup-btn mt-4 mx-2 bg-[#4f46e5]  text-white px-16 py-3 rounded-lg w-full font-semibold hover:bg-[#4a41f5]"
                type="button"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div
      class="bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded text-center mx-96 mb-8"
      role="alert"
      v-if="isRegistered"
    >
      <p>User Registered Successfully!</p>
    </div>

    <table
      class="ml-10 min-w-max w-11/12 text-center bg-black text-yellow-300 shadow-md rounded-lg overflow-hidden"
      v-if="showTable"
    >
      <thead>
        <tr class="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
          <th class="py-3 text-center">ID Number</th>
          <th class="py-3 text-center">Username</th>
          <th class="py-3 text-center">Field of Study</th>
          <th class="py-3 text-center">Duration of Study</th>
        </tr>
      </thead>
      <tbody class="text-yellow-500 text-lg font-light">
        <tr v-for="user in users" :key="user.id" class="border-b border-gray-700 hover:bg-gray-800">
          <td>{{ user.idno }}</td>
          <td>{{ user.Username }}</td>
          <td>{{ user['Field of study'] }}</td>
          <td>{{ user['Duration of study'] }}</td>
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
      isRegistered: false,
      gname: '',
      showTable: false,
      users: null,
      userData: {
        idno: null,
        username: null,
        fos: null,
        dos: null,
        email: null
      }
    }
  },
  computed: {
    ...mapStores(userModalStore)
  },
  methods: {
    autofillDuration() {
      if (this.userData.fos === 'computer_science') {
        this.userData.dos = '4'
      } else if (this.userData.fos === 'Information_Technology') {
        this.userData.dos = '4'
      } else if (this.userData.fos === 'Software_Engineering') {
        this.userData.dos = '5'
      } else if (this.userData.fos === 'Information_System') {
        this.userData.dos = '4'
      } else if (this.userData.fos === 'Computer_Engineering') {
        this.userData.dos = '5'
      } else if (this.userData.fos === 'Cyber_Security') {
        this.userData.dos = '4'
      } else if (this.userData.fos === 'Accounting') {
        this.userData.dos = '3'
      }
    },
    async sendUserData() {
      const response = await api.post('/adduser', this.userData)
      if (response.data.message === 'Success') {
        this.isRegistered = true
        this.modalStore.data = [this.userData.username, this.userData.idno, this.userData.fos]
        this.userData.idno = null
        this.userData.email = null
        this.userData.username = null
        this.userData.fos = null
        this.userData.dos = null
        this.showRegisteredStudents()
        setTimeout(() => {
          this.isRegistered = false
        }, 3000)
      }
    },
    async showRegisteredStudents() {
      this.showTable = !this.showTable
      await api.get('/showusers').then((response) => {
        this.users = response.data
      })
    },
    fillDos() {
      const fos = document.getElementById('fos')
      const dos = document.getElementById('dos')
      if (fos.value === 'computer_science') {
        dos.innerHTML = '4'
      }
    }
  }
}
</script>
