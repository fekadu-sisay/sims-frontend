<template>
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm"
        v-if="state === 'pending'">
        <div className="loader"></div>
    </div>
    <div class="main-Area ml-60" v-show="isVisible">
        <div class="main-content relative">
            <div class="mx-auto fixed top-1 right-0" v-show="loginSuccess">
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded text-center"
                    role="alert">
                    <p>Loggedin Successfully!</p>
                </div>
            </div>
            <div class="mx-auto fixed top-1 right-0" v-show="singupSuccess">
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded text-center"
                    role="alert">
                    <p>Registered Successfully!</p>
                </div>
            </div>
            <home_page />
        </div>

        <a v-show="showSignupBtn" id="signupBtn"
            @click="(isLoginFormHidden = !isLoginFormHidden), (isVisible = !isVisible)"
            class="absolute top-[65%] right-[36%] rounded-2xl text-center font-semibold text-2xl bg-[#4f46e5]  text-white py-4 w-60 hover:bg-[#3f35ff] float">Login</a>
    </div>
    <div v-if="!signupStatus" v-show="issignupFormHidden"
        class="flex items-center justify-center h-screen w-screen float fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div class="signup-form text-center w-[30%] bg-[#ccc] mt-8 border pb-40 rounded-3xl h-[60%]">
            <a @click="(isVisible = !isVisible), (issignupFormHidden = !issignupFormHidden)"
                class="top-0 ml-20 right-0 pl-[75%] m-2 text-2xl text-bold text-red-500"><i
                    class="fa-regular fa-circle-xmark"></i></a>
            <h1 class="text-5xl p-8 text-[#480d9b]">Sign Up</h1>
            <form class="px-10">
                <input name="name" v-model="userData.userName" type="text" placeholder="Username"
                    class="ml-18 mt-4 h-10 text-black p-4 rounded outline-none"
                    :class="{ 'border-solid border-2 border-red-400': modalStore.invalidUsername }" />
                <div>
                    <p class="text-red-600" v-show="modalStore.invalidUsername">
                        {{ modalStore.errUsername }}
                    </p>
                </div>
                <input name="email" v-model="userData.userEmail" type="email" placeholder="Email"
                    class="ml-18 mt-4 h-10 text-black p-4 rounded outline-none"
                    :class="{ 'border-solid border-2 border-red-400': modalStore.invalidUsername }" />
                <div>
                    <p class="text-red-600" v-show="modalStore.invalidEmail">{{ modalStore.errEmail }}</p>
                </div>

                <input name="password" v-model="userData.userPassword" type="password" placeholder="password"
                    class="ml-18 mt-4 h-10 text-black p-4 rounded outline-none"
                    :class="{ 'border-solid border-2 border-red-400': modalStore.invalidUsername }" />
                <div>
                    <p class="text-red-600" v-show="modalStore.invalidPassword">
                        {{ modalStore.errPassword }}
                    </p>
                </div>
                <input name="password_confirmation" v-model="userData.confirm_password" type="password"
                    placeholder="Confirm Password" class="ml-18 mt-4 h-10 text-black p-4 rounded outline-none"
                    :class="{ 'border-solid border-2 border-red-400': modalStore.invalidUsername }" />
                <div class="mb-4">
                    <p class="text-red-600" v-show="modalStore.invalidConfirmpassword">
                        {{ modalStore.errConfirmpassword }}
                    </p>
                </div>
                <button @click.prevent="sendSignUpData"
                    class="signup-btn mt-4 mx-2 bg-[#4f46e5] hover:bg-[#3f35ff]  text-white px-16 py-3 rounded-lg font-semibold">
                    Sign Up
                </button>
                <p>
                    Already a user?
                    <a class="text-blue-500" @click="
            (issignupFormHidden = !issignupFormHidden), (isLoginFormHidden = !isLoginFormHidden)
            "><u>Login</u></a>
                </p>
            </form>
        </div>
    </div>

    <div v-show="isLoginFormHidden"
        class="flex items-center justify-center h-screen w-screen float fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div class="login-form text-center w-[25%] bg-[#ccc] mt-8 border pb-40 rounded-3xl">
            <a @click="(isVisible = !isVisible), (isLoginFormHidden = !isLoginFormHidden)"
                class="top-0 ml-20 right-0 pl-[75%] m-2 text-2xl text-bold text-red-500"><i
                    class="fa-regular fa-circle-xmark"></i></a>
            <h1 class="text-5xl p-8 text-[#480d9b]">Log In</h1>
            <form>
                <input name="name" v-model="loginData.name" type="text" placeholder="username"
                    class="ml-18 mt-4 h-10 text-black p-4 rounded outline-none" />
                <br />
                <input name="passcode" v-model="loginData.password" type="password" placeholder="password"
                    class="ml-18 mt-4 h-10 text-black p-4 rounded outline-none" /><br />
                <div>
                    <p v-show="modalStore.loginstatus === 'no'" class="text-red-700 mb-4">
                        Loggedin Failed!!! Incorrect username or password.
                    </p>
                </div>
                <button @click.prevent="login"
                    class="login-btn mt-4 mx-2 bg-[#4f46e5]  text-white px-16 py-3 rounded-lg font-semibold hover:bg-[#3f35ff]">
                    Log In
                </button>
                <p>
                    Are you a new User?
                    <a class="text-blue-500" @click="
            (issignupFormHidden = !issignupFormHidden), (isLoginFormHidden = !isLoginFormHidden)
            "><u>Sign Up</u></a>
                </p>
            </form>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
import api from '../../api/api'
import { mapStores } from 'pinia'
import userModalStore from '../stores/counter'
import HomePage from '../subcomponents/HomePage.vue'
export default {
    components: {
        home_page: HomePage
    },
    data() {
        return {
            singupSuccess: false,
            showSignupBtn: localStorage.length === 0,
            loginSuccess: false,
            issignupFormHidden: false,
            isLoginFormHidden: false,
            isVisible: true,
            userName: '',
            userData: {
                userName: null,
                userEmail: null,
                userPassword: null,
                confirm_password: null,
                state: 'free'
            },
            loginData: {
                name: null,
                password: null
            },
            signupStatus: null
        }
    },
    computed: {
        ...mapStores(userModalStore)
    },
    methods: {
        stringMatchesKey(object, searchString) {
            return Object.keys(object).some((key) => key.includes(searchString))
        },
        toggleUserInfo() {
            this.modalStore.showUserInfo = !this.modalStore.showUserInfo
            this.modalStore.username = this.userName
        },
        async sendSignUpData() {
            this.state = 'pending'
            const response = await api.post('/create', this.userData)
            const response2 = await api.get('/userinfo')
            if (response.data.status === true) {
                this.signupSuccess = true
                this.signupStatus = response.data.status
                this.modalStore.signupSuccess = response.data.status
                this.issignupFormHidden = true
                this.modalStore.hideSignupBtn = true
                this.isVisible = true
                this.userName = response.data.user
                this.modalStore.loggedUser = response.data.name
                document.getElementById('signupBtn').classList.add('opacity-0')
                const userinformation = response2.data.filter(
                    (info) => info['Username'] === response.data.user
                )
                this.toggleUserInfo()
                const token = response.data.token
                Cookies.set('token', token, { sameSite: 'None', secure: true })
                window.location.reload()
                const userInfo = {
                    field: userinformation[0]['Field of study'],
                    dos: userinformation[0]['Duration of study'],
                    idno: userinformation[0]['idno'],
                    email: userinformation[0]['Email']
                }
                const showUserInfo = Cookies.get('token') !== undefined && Cookies.get('token') !== ''
                localStorage.setItem('showUserInfo', showUserInfo.toString())
                localStorage.setItem('field', userInfo.field.toString())
                localStorage.setItem('dos', userInfo.dos.toString())
                localStorage.setItem('idno', userInfo.idno.toString())
                localStorage.setItem('usertype', 'User')
                localStorage.setItem('name', response.data.user)
                localStorage.setItem('email', userInfo.email)
            } else if (response.data.status === false) {
                if (!this.stringMatchesKey(response.data.fieldStatus, 'userName')) {
                    this.modalStore.invalidUsername = false
                } else {
                    this.modalStore.invalidUsername = true
                    this.modalStore.errUsername = response.data.fieldStatus.userName.errors[0]
                }
                if (!this.stringMatchesKey(response.data.fieldStatus, 'userEmail')) {
                    this.modalStore.invalidEmail = false
                } else {
                    this.modalStore.invalidEmail = true
                    this.modalStore.errEmail = response.data.fieldStatus.userEmail.errors[0]
                }
                if (!this.stringMatchesKey(response.data.fieldStatus, 'userPassword')) {
                    this.modalStore.invalidPassword = false
                } else {
                    this.modalStore.invalidPassword = true
                    this.modalStore.errPassword = response.data.fieldStatus.userPassword.errors[0]
                }
                if (!this.stringMatchesKey(response.data.fieldStatus, 'confirm_password')) {
                    this.modalStore.invalidConfirmpassword = false
                } else {
                    this.modalStore.invalidConfirmpassword = true
                    this.modalStore.errConfirmpassword = response.data.fieldStatus.confirm_password.errors[0]
                }
            }
            this.state = 'free'
        },
        async login() {
            this.state = 'pending'
            const response = await api.post('/login', this.loginData)
            const response2 = await api.get('/userinfo')
            if (response.data.userType == 1) {
                if (response.data.loggedin === 'yes') {
                    this.isLoginFormHidden = false
                    this.modalStore.hideSignupBtn = true
                    this.userName = response.data.name
                    this.isVisible = true
                    this.modalStore.loginstatus = 'yes'
                    document.getElementById('signupBtn').classList.add('opacity-0')
                    const token = response.data.token
                    Cookies.set('token', token, { sameSite: 'None', secure: true })
                    window.location.reload()
                    const showUserInfo = Cookies.get('token') !== undefined && Cookies.get('token') !== ''
                    localStorage.setItem('showUserInfo', showUserInfo.toString())
                    localStorage.setItem('usertype', 'Admin')
                    localStorage.setItem('name', 'Admin')
                    this.state = 'free'
                    this.loginSuccess = true
                    setTimeout(() => {
                        this.loginSuccess = false
                    }, 3000)
                } else if (response.data.loggedin === 'no') {
                    this.modalStore.loginstatus = 'no'
                }
            } else if (response.data.userType == 0) {
                if (response.data.loggedin === 'yes') {
                    this.state = 'pending'
                    console.log(response.data.userType)
                    console.log(response.data.loggedin)
                    this.isLoginFormHidden = false
                    this.isVisible = true
                    this.modalStore.hideSignupBtn = true
                    this.userName = response.data.name
                    this.modalStore.loginstatus = 'yes'
                    document.getElementById('signupBtn').classList.add('opacity-0')
                    const userinformation = response2.data.filter(
                        (info) => info['Username'] === response.data.name
                    )
                    const userInfo = {
                        field: userinformation[0]['Field of study'],
                        dos: userinformation[0]['Duration of study'],
                        idno: userinformation[0]['idno'],
                        email: userinformation[0]['Email']
                    }
                    this.toggleUserInfo()
                    const token = response.data.token
                    Cookies.set('token', token, { sameSite: 'None', secure: true })
                    window.location.reload()
                    const showUserInfo = Cookies.get('token') !== undefined && Cookies.get('token') !== ''
                    localStorage.setItem('showUserInfo', showUserInfo.toString())
                    localStorage.setItem('field', userInfo.field.toString())
                    localStorage.setItem('dos', userInfo.dos.toString())
                    localStorage.setItem('idno', userInfo.idno.toString())
                    localStorage.setItem('usertype', 'User')
                    localStorage.setItem('name', response.data.name)
                    localStorage.setItem('email', userInfo.email)
                    this.state = 'free'
                    this.loginSuccess = true
                    setTimeout(() => {
                        this.loginSuccess = false
                    }, 3000)
                } else if (response.data.loggedin === 'no') {
                    this.modalStore.loginstatus = 'no'
                }
            }
        }
    }
}
</script>
