<template>
  <div class="menu-bar bg-[#18181b] w-60 left-0 min-h-screen border-solid ml-1 fixed border-t-[1px] border-r-[1px] border-white  text-center p-6" v-show="isSidebarVisible">
    <p className="block rounded-md text-blue-500 text-xl font-bold mb-2">
          Student Info
  </p>
    <hr/>
<router-link
  v-if="!admin"
  v-show="
    ((index != 1 || index !== 2 || index !== 3 || index == 5 || index == 8) && showUserInfo) ||
    index == 0 ||
    index == 4 ||
    index == 6 ||
    index == 7 ||
    index == 9
  "
  v-for="(choice, index) in choices"
  :key="index"
  :to="paths[index]"
  class="block hover:bg-[#4f46e5] pl-4 pr-4 py-4  rounded-md text-white no-underline transition duration-200 mb-4"
  :class="[allClass[index]]"
>
  <div class="text-white font-semibold text-left group-hover:text-black">
    <i class="pr-1" :class="icons[index]"></i> 
    {{ choice }}
  </div>
</router-link>

<router-link
class="mt-4 block hover:bg-[#4f46e5] p-4 rounded-md text-white no-underline transition duration-200 mb-4"
  v-show="admin"
  to="adduser"
>
  <div class="text-white group-hover:text-black font-semibold text-left">
    <i class="fa fa-add pr-1 text-lg"></i> 
    Add User
  </div>
</router-link>

<router-link
class="block hover:bg-[#4f46e5] p-4 rounded-md text-white no-underline transition duration-200 mb-4"
  v-show="admin"
  to="setgrade"
>
  <div class="text-white group-hover:text-black font-semibold text-left">
    <i class="fa-regular fa-circle-check pr-1"></i> Set Grade
  </div>
</router-link>

<router-link
class="block hover:bg-[#4f46e5] p-4 rounded-md text-white no-underline transition duration-200 mb-4"
  v-show="admin"
  to="editgrade"
>
  <div class="text-white group-hover:text-black font-semibold text-left">
    <i class="fa-regular fa-pen-to-square pr-1"></i>
    Edit Grade
  </div>
</router-link>

<router-link
class="block hover:bg-[#4f46e5] p-4 rounded-md text-white no-underline transition duration-200 mb-4"
  v-show="admin"
  class-active="bg-[#4f46e5]"
  to="editcourses"
  exact
>
  <div class="text-white group-hover:text-black font-semibold text-left">
    <i class="fa-solid fa-book pr-1"></i>
    Edit Courses
  </div>
</router-link>

<router-link
class="block hover:bg-[#4f46e5] p-4 rounded-md text-white no-underline transition duration-200 mb-4"
  v-show="admin"
  to="seereports"
>
  <div class="text-white group-hover:text-black font-semibold text-left">
    <i class="fa-solid fa-chart-column pr-1"></i>
    See Reports
  </div>
</router-link>

<router-link
class="block hover:bg-[#4f46e5] p-4 rounded-md text-white no-underline transition duration-200 mb-4"
  v-show="admin"
  to="sendemail"
>
  <div class="text-white group-hover:text-black font-semibold text-left">
    <i class="fa-regular fa-envelope pr-1"></i>
    Send Email
  </div>
</router-link>

    <div
      class="text-center mt-20 pt-8 w-40 content-center h-40 bg-yellow-400 ml-4 rounded"
      v-show="showUserInfo"
    >
      <img src="/images/setting.png" class="w-16 h-16 mt-0 rounded ml-12" v-show="admin" />
      <img src="/images/user.png" class="w-16 h-16 mt-0 rounded ml-12" v-show="user" />
      <!-- <i class="fa-solid fa-user w-16 h-16 mt-0 rounded" v-show="modalStore.userType == 'user'"></i> -->
      <p class="text-red-500 font-semibold font-serif">{{ name }}</p>
      <button
        @click="logout"
        class="bg-[#4f46e5] hover:bg-[#3f35ff] text-white font-bold text-lg rounded p-2 m-4"
      >
        Log Out
      </button>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import userModalStore from '../stores/counter'
import Cookies from 'js-cookie'
export default {
  name: 'side-bar',
  data() {
    return {
      state: 'free',
      showUserInfo: localStorage.getItem('showUserInfo'),
      loggedin: false, // toggle this value if login is successful
      index: 0,
      user: localStorage.getItem('usertype') == 'User',
      admin: localStorage.getItem('usertype') == 'Admin',
      isSidebarVisible: true,
      name: localStorage.getItem('name'),
      choices: [
        'Home',
        'My Courses',
        'My Status',
        'My Grades',
        'Tutorials',
        'Calendar',
        'Graduated Students',
        'Officials',
        'Report Issue'
      ],
      icons:[
        'fa-solid fa-house',
        'fa-solid fa-book',
        'fa-solid fa-chart-column',
        'fa-solid fa-graduation-cap',
        'fa-regular fa-file-video',
        'fa-regular fa-calendar',
        'fa-solid fa-user-graduate',
        'fa-regular fa-address-book',
        'fa-regular fa-flag'
      ],
      paths: [
        '/',
        '/mycourses',
        '/mystatus',
        '/mygrades',
        '/tutorials',
        '/calendar',
        '/graduated',
        '/officials',
        '/complain'
      ],
      allClass: [
        'home',
        'mycourses',
        'mystatus',
        'mygrades',
        'tutorials',
        'calendar',
        'graduated',
        'officials',
        'complain'
      ]
    }
  },

  methods: {
    logout() {
      this.state = 'pending'
      Cookies.remove('token')
      // this.modalStore.showUserInfo = false
      // this.modalStore.showUserInfo = false
      localStorage.clear()

      window.location.reload()
      this.state = 'free'
    }
  },
  computed: {
    ...mapStores(userModalStore),
  }
}
</script>

<style scoped>
a.router-link-active {
background-color:#3f35ff;
}
</style>