<template>
  <div class="main-Area ml-60">
    <h1 class="text-2xl bg-gray-400 text-black font-serif p-2">
      <i class="fa-solid fa-chalkboard-user"></i> Officials
    </h1>
    <p class="text-blue-400 mt-4 ml-8 text-3xl">
      Find departmental information and contact details of officials.
    </p>

    <div class="mt-44 ml-48 flex content-center">
      <div class="text-white font-sans">
        <h1
          @click="(showModule = !showModule), (dept = 'Department of Accounting and Finance')"
          class="my-4 bg-[#011627] w-80 hover:bg-black hover:text-[#3a7ff2] border border-black border-1 rounded-md p-2"
        >
          Department of Accounting or School of Business/Commerce
        </h1>
        <h1
          @click="(showModule = !showModule), (dept = 'Department of Computer Science')"
          class="my-4 bg-[#011627] w-80 hover:bg-black hover:text-[#3a7ff2] border border-black border-1 rounded-md p-2"
        >
          Department of Computer Science or School of Computer Science
        </h1>
        <h1
          @click="(showModule = !showModule), (dept = 'Department of information technology')"
          class="my-4 bg-[#011627] w-80 hover:bg-black hover:text-[#3a7ff2] border border-black border-1 rounded-md p-2"
        >
          Department of Information Technology or School of Information Technology
        </h1>
        <h1
          @click="(showModule = !showModule), (dept = 'Department of Software Engineering')"
          class="my-4 bg-[#011627] w-80 hover:bg-black hover:text-[#3a7ff2] border border-black border-1 rounded-md p-2"
        >
          Department of Software Engineering or School of Engineering
        </h1>
        <h1
          @click="(showModule = !showModule), (dept = 'Department of information systems')"
          class="my-4 bg-[#011627] w-80 hover:bg-black hover:text-[#3a7ff2] border border-black border-1 rounded-md p-2"
        >
          Department of Information Systems or School of Information
        </h1>
        <h1
          @click="(showModule = !showModule), (dept = 'Department of Computer Engineering')"
          class="my-4 bg-[#011627] w-80 hover:bg-black hover:text-[#3a7ff2] border border-black border-1 rounded-md p-2"
        >
          Department of Computer Engineering
        </h1>
        <h1
          @click="(showModule = !showModule), (dept = 'Department of Cyber security')"
          class="my-4 bg-[#011627] w-80 hover:bg-black hover:text-[#3a7ff2] border border-black border-1 rounded-md p-2"
        >
          Department of Cyber Security
        </h1>
      </div>

      <div
        class="w-96 h-108 mx-auto my-16 bg-[#011627] rounded-md shadow-md flex flex-col justify-center p-6 space-y-6 text-white"
      >
        <div class="flex items-center space-x-4">
          <i class="fas fa-user text-4xl text-blue-500 ml-8"></i>
          <div class="flex flex-col">
            <a href="#" class="text-blue-500 text-xl font-semibold">Don John</a>
            <a href="#" class="text-sm">Head of {{ dept }}</a>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <i class="fas fa-envelope text-4xl text-blue-500 ml-8"></i>
          <a href="#" class="text-blue-500 text-xl font-semibold">imaginary@gmail.com</a>
        </div>

        <div class="flex items-center space-x-4">
          <i class="fas fa-phone-volume text-4xl text-blue-500 ml-8"></i>
          <a href="#" class="text-blue-500 text-xl font-semibold">+2519000000</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModule: false,
      dept: null
    }
  }
}
</script>
