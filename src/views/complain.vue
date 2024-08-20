<template>
  <div
    className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm"
    v-if="sendingStatus === 'pending'"
  >
    <div className="loader"></div>
  </div>
  <div class="main-Area ml-60" v-if="sendingStatus !== 'pending'">
    <h1 class="text-2xl bg-gray-400 text-black font-serif p-2">
      <i class="fas fa-flag"></i>
      Report Issue
    </h1>
    <div
      v-show="sendingStatus === 'success'"
      class="bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded text-center mx-80 mt-10"
      role="alert"
    >
      <p>Report Sent!</p>
    </div>
    <div class="report-form mt-28 mx-40">
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2
            class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"
          >
            Report Issue
          </h2>
          <p
            class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl"
          >
            Got any issue? Want to send feedback to the administrators? fill the following form and
            send.
          </p>
          <form action="#" class="space-y-8">
            <div class="mb-4">
              <div class="float-left">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >First Name</label
                >
                <input
                  type="text"
                  id="fname"
                  v-model="Report.name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  required
                  readonly
                />
              </div>
              <div class="float-right">
                <label
                  for="text"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Last Name</label
                >
                <input
                  type="text"
                  id="lname"
                  v-model="Report.lname"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="John"
                  required
                />
              </div>
            </div>
            <br />
            <div>
              <br />
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Your email</label
              >
              <input
                type="email"
                id="email"
                v-model="Report.email"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                required
                readonly
              />
            </div>
            <div>
              <label
                for="subject"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Title</label
              >
              <input
                type="text"
                id="title"
                v-model="Report.title"
                class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="What issue would you like to report?"
                required
              />
            </div>
            <div class="sm:col-span-2">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >Your complain</label
              >
              <textarea
                id="message"
                rows="6"
                v-model="Report.complain"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave your complain here..."
              ></textarea>
            </div>
            <button
              @click="sendReport"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded w-full focus:outline-none focus:shadow-outline"
              type="button"
            >
              Report
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
      Report: {
        lname: null,
        title: null,
        complain: null,
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        id: localStorage.getItem('idno')
      },
      sendingStatus: 'yet'
    }
  },
  methods: {
    async sendReport() {
      this.sendingStatus = 'pending'
      const response = await api.post('/sendreport', this.Report)
      if (response.data.status) {
        this.sendingStatus = 'success'
        this.Report = {}
        setTimeout(() => {
          this.sendingStatus = 'yet'
        }, 3000)
      }
    }
  }
}
</script>

<style></style>
