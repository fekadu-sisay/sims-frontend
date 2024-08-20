<template>
  <div class="main-Area ml-60">
    <h1 class="text-2xl bg-gray-400 text-black font-serif p-2">
      <i class="fa-solid fa-calendar-days"></i> Calendar
    </h1>
    <div
      class="bg-[#598aee] mt-4 mx-8 h-16 pt-3 text-center text-3xl text-white font-bold hover:bg-[#0d5ff6] rounded"
      @click="(module1vis = !module1vis), (module3vis = false), (module2vis = false)"
    >
      <h1>2022 - 2023</h1>
    </div>
    <div class="mx-60 mt-4 border-b-lg" v-show="module1vis">
      <div class="bg-[#e0eafb] h-12 text-center pt-3 font-bold">
        <h1 class="text-xl">2022 - 2023 Academic Calendar</h1>
      </div>
      <calendar />
    </div>
    <div
      class="bg-[#598aee] mt-4 mx-8 h-16 pt-3 text-center text-3xl text-white font-bold hover:bg-[#0d5ff6] rounded"
      @click="(module2vis = !module2vis), (module3vis = false), (module1vis = false)"
    >
      <h1>2021 - 2022</h1>
    </div>
    <div class="mx-60 mt-4 border-b-lg" v-show="module2vis">
      <div class="bg-[#e0eafb] h-12 text-center pt-3 font-semibold">
        <h1>2022 - 2023 Academic Calendar</h1>
      </div>
      <calendar />
    </div>

    <div
      class="bg-[#598aee] mt-4 mx-8 h-16 pt-3 text-center text-3xl text-white font-bold hover:bg-[#0d5ff6] rounded"
      @click="(module3vis = !module3vis), (module2vis = false), (module1vis = false)"
    >
      <h1>2020 - 2021</h1>
    </div>
    <div class="mx-60 mt-4 border-b-lg" v-show="module3vis">
      <div class="bg-[#e0eafb] h-12 text-center pt-3 font-semibold">
        <h1>2022 - 2023 Academic Calendar</h1>
      </div>
      <calendar />
    </div>
  </div>
</template>

<script>
import api from '../../api/api'
import { mapStores } from 'pinia'
import userModalStore from '../stores/counter'
import calendar from '../components/calendar.vue'
export default {
  data() {
    return {
      module1vis: true,
      module2vis: false,
      module3vis: false
    }
  },
  components: {
    calendar
  },
  computed: {
    ...mapStores(userModalStore)
  },
  methods: {
    showUserName() {
      console.log(this.modalStore.username)
    },
    showGrades() {
      api.get(`grades/${this.modalStore.username}`).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>
