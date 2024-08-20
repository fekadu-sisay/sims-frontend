<template>
    <div class="align-content-center bg-[#18181b] h-16 w-screen m-w-screen ml-1 rounded-tl-2xl font-serif text-white">
    <div class="flex justify-between items-center">
      <div class="flex">
        <img
          src="/public/images/logo.png"
          alt="Student Logo"
          class="h-16 w-20 ml-4"
        />
        <h2 class="pl-8 text-center pt-4 text-3xl font-serif">Student Information Management System</h2>
      </div>
      <div class="text-center pr-2 text-blue-300 flex gap-4">
        <p class="text-blue-500 pr-4">{{ formattedDate }}</p>
      </div>
    </div>
  </div>
  
</template>

<script>
import { format } from 'date-fns'
export default{
    data(){
    return{
        date: new Date()
    }
    },
    computed: {
    formattedDate() {
      return format(this.date, 'EEEE, MMMM d, yyyy')
    }
  }
}
</script>