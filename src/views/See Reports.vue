<template>
  <div class="main-Area ml-60">
    <h1 class="text-2xl bg-gray-400 text-black font-serif p-2 overflow-hidden">
      <i class="fa-solid fa-eye"></i> See Reports
    </h1>
    <div
      class="bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded text-center mx-96 mt-8"
      role="alert"
      v-show="showRemovalSuccess"
    >
      <p>Report Removed Successfully!</p>
    </div>
    <div class="mx-40 mt-20 border-2 bg-[#131b2e] rounded-[30px]" v-if="showModal">
      <div
        class="p-6 max-w-sm border-2 bg-white rounded-xl shadow-md flex items-center space-x-4 my-10 mx-auto hover:border-blue-500"
        v-for="(name, i) in names"
        :key="i"
        @click="showDetail(name, i)"
      >
        <div class="shrink-0">
          <svg class="h-12 w-12" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
                <stop stop-color="#2397B3" offset="0%"></stop>
                <stop stop-color="#13577E" offset="100%"></stop>
              </linearGradient>
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="b">
                <stop stop-color="#73DFF2" offset="0%"></stop>
                <stop stop-color="#47B1EB" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g fill="none" fill-rule="evenodd">
              <path
                d="M28.872 22.096c.084.622.128 1.258.128 1.904 0 7.732-6.268 14-14 14-2.176 0-4.236-.496-6.073-1.382l-6.022 2.007c-1.564.521-3.051-.966-2.53-2.53l2.007-6.022A13.944 13.944 0 0 1 1 24c0-7.331 5.635-13.346 12.81-13.95A9.967 9.967 0 0 0 13 14c0 5.523 4.477 10 10 10a9.955 9.955 0 0 0 5.872-1.904z"
                fill="url(#a)"
                transform="translate(1 1)"
              ></path>
              <path
                d="M35.618 20.073l2.007 6.022c.521 1.564-.966 3.051-2.53 2.53l-6.022-2.007A13.944 13.944 0 0 1 23 28c-7.732 0-14-6.268-14-14S15.268 0 23 0s14 6.268 14 14c0 2.176-.496 4.236-1.382 6.073z"
                fill="url(#b)"
                transform="translate(1 1)"
              ></path>
              <path
                d="M18 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM24 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM30 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                fill="#FFF"
              ></path>
            </g>
          </svg>
        </div>
        <div>
          <div class="text-xl font-medium text-black">{{ name }}</div>
          on {{ moment(dates[i+1]).format('LLLL') }}
        </div>
        <div
          class="bg-red-300 px-2 rounded-lg float-right hover:border-red-500 border-2"
          @click="remove(name)"
        >
          <i class="fa-solid fa-trash"></i>
        </div>
      </div>
    </div>
    <div class="mx-40 mt-20 rounded-lg" v-if="!showModal">
      <div class="report-form mt-28 mx-40">
        <section class="bg-white dark:bg-gray-900 rounded-[30px]">
          <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <button
              class="float-right text-white text-lg py-2 px-4 hover:bg-blue-700 bg-blue-500 rounded-md"
              @click="showModal = !showModal"
            >
              Back
            </button>
            <h2
              class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"
            >
              Issue Reported
            </h2>
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
                    v-model="detailInfo.FirstName"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
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
                    v-model="detailInfo.LastName"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    readonly
                  />
                </div>
              </div>
              <br />
              <br />
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="detailInfo.Email"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
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
                  v-model="detailInfo.Title"
                  class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="What issue would you like to report?"
                  readonly
                />
              </div>
              <div class="sm:col-span-2">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >Complain</label
                >
                <textarea
                  id="message"
                  v-model="detailInfo.Report"
                  readonly
                  rows="6"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                ></textarea>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import api from '../../api/api'
export default {
  data() {
    return {
      moment: moment,
      showModal: true,
      showRemovalSuccess: false,
      names: [],
      dates: ['2023-09-06 09:38:06'],
      detailInfo: {}
    }
  },
  mounted() {
    this.getReports()
  },
  methods: {
    async getReports() {
      const response = await api.get('/seereports')
      let i = 0
      const length = response.data.length
      for (i = 0; i < length; i++) {
        this.names.push(response.data[i].FirstName)
        this.dates.push(response.data[i].created_at)
      }
    },
    async showDetail(name, i) {
      this.showModal = !this.showModal
      const response = await api.get('/seereports')
      this.detailInfo = response.data[i]
    },
    async remove(name) {
      this.showModal = !this.showModal
      const bool = confirm('Are you sure you want to remove the selected Report?')
      if (bool) {
        const response = await api.post('/removeReport', { name })
        if (response.data.status === true) {
          this.showRemovalSuccess = true
          setTimeout(() => {
            this.showRemovalSuccess = false
          }, 3000)
          this.getReports()
          window.location.reload()
        }
      }
    }
  }
}
</script>
