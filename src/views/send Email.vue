<template>
  <div class="main-area ml-60">
    <h1 class="text-2xl bg-gray-400 text-black font-serif p-2">
      <i class="fa-solid fa-envelope"></i> Send Email
    </h1>
    <div class="email-form mt-28 mx-60">
      <div
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded text-center mx-96 mt-8 mb-8"
        role="alert"
        v-show="showEmailSuccess"
      >
        <p>Email Sent Successfully!</p>
      </div>
      <section class="bg-white dark:bg-gray-900 rounded-xl">
        <div class="py-4 lg:py-8 px-4 mx-auto max-w-screen-md">
          <h2
            class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"
          >
            Contact Student
          </h2>
          <p
            class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl"
          >
            Got something for the student? Want to send email?
          </p>
          <form action="#" class="space-y-8">
            <div>
              <label
                for="student"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Student Name
              </label>
              <select
                v-model="selectedUser"
               me="student"
                @change="autoFillEmail"
                id="student"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              >
                <option v-for="(user, i) in users" :key="i" class="text-gray-900 dark:text-white">
                  {{ user }}
                </option>
              </select>
            </div>

            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Email</label
              >
              <input
                type="email"
                id="email"
                v-model="emailData.email"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                readonly
              />
            </div>
            <div>
              <label
                for="subject"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Subject</label
              >
              <input
                v-model="emailData.subject"
                type="text"
                id="subject"
                class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder=""
                required
              />
            </div>
            <div class="sm:col-span-2">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >Message</label
              >
              <textarea
                v-model="emailData.body"
                id="message"
                rows="6"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a message..."
              ></textarea>
            </div>Your
            <button
              @click="sendEmail()"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded w-full focus:outline-none focus:shadow-outline"
              type="button"
            >
              Send Email
            </button>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import api from '../../api/api'
export default {
  data() {
    return {
      users: [],
      selectedUser: null,
      email: null,
      emailData: {
        email: null,
        subject: null,
        body: null
      },
      showEmailSuccess: false
    }
  },
  mounted() {
    this.showRegisteredStudents()
  },
  methods: {
    async showRegisteredStudents() {
      const response = await api.get('/showusers')
      let i = 0
      const length = response.data.length
      for (i = 0; i < length; i++) this.users.push(response.data[i].Username)
    },
    async autoFillEmail() {
      const emailField = document.getElementById('email')
      const response = await api.get('/showusers')
      let i = 0
      const length = response.data.length
      for (i = 0; i < length; i++) {
        if (response.data[i].Username === this.selectedUser) {
          emailField.value = response.data[i].Email
          this.email = emailField.value
          this.emailData.email = this.email
        }
      }
    },
    async sendEmail() {
      const response = await api.post('/sendemail', this.emailData)
      if (response.data.status === true) {
        this.showEmailSuccess = true
        this.emailData = {}
        setTimeout(() => {
          this.showEmailSuccess = false
        }, 3000)
      }
    }
  }
}
</script>
