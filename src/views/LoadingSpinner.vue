<template>
  <div class="lds-facebook h-screen w-screen flex items-center justify-center">
    <div class="lds-facebook-div"></div>
    <div class="lds-facebook-div"></div>
    <div class="lds-facebook-div"></div>
  </div>
</template>

<style>
.lds-facebook-div {
 @apply inline-block absolute left-2 w-4 h-16 bg-black animate-lds-facebook;
}
.lds-facebook-div:nth-child(1) {
 @apply left-2 animate-delay-240;
}
.lds-facebook-div:nth-child(2) {
 @apply left-8 animate-delay-120;
}
.lds-facebook-div:nth-child(3) {
 @apply left-14;
}
@keyframes lds-facebook {
 0% {
   top-2 h-48;
 }
 50%,
 100% {
   top-6 h-32;
 }
}
</style>
