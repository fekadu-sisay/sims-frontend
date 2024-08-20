import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export default defineStore('modal', {
  state: () => ({
    showUserInfo: Cookies.get('token') === 'true',
    loginstatus: '',
    grade: [],
    hideSignupBtn: false,
    invalid: false,
    errUsername: null,
    errEmail: null,
    errPassword: null,
    errConfirmpassword: null,
    invalidUsername: false,
    invalidEmail: false,
    invalidPassword: false,
    invalidConfirmpassword: false,
    signupSuccess: false,
    data: [],
    editCourse: null
  })
})
