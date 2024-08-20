import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import courses from '../views/My_Courses.vue'
import grades from '../views/My_Grades.vue'
import status from '../views/My_Status.vue'
import tutorials from '../views/Tutorials.vue'
import calendar from '../views/calendar.vue'
import graduated from '../views/graduated.vue'
import officials from '../views/officials.vue'
import complain from '../views/complain.vue'
import AddUser from '../views/Add User.vue'
import SetGrade from '../views/Set Grade.vue'
import EditGrade from '../views/Edit Grade.vue'
import EditCourses from '../views/Edit Courses.vue'
import SendEmail from '../views/send Email.vue'
import seereports from '../views/See Reports.vue'
import Cookies from 'js-cookie'
import { mapStores } from 'pinia'
import userModalStore from '../stores/counter'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/mycourses',
      name: 'mycourses',
      component: courses
    },
    {
      path: '/mystatus',
      name: 'mystatus',
      component: status,
      beforeEnter: (to, from, next) => {
        if (!Cookies.get('token')) {
          return next({
            name: 'home'
          })
        }
        next()
      }
    },
    {
      path: '/mygrades',
      name: 'mygrades',
      component: grades,
      beforeEnter: (to, from, next) => {
        if (!Cookies.get('token')) {
          return next({
            name: 'home'
          })
        }
        next()
      }
    },
    {
      path: '/tutorials',
      name: 'tutorials',
      component: tutorials
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: calendar,
      beforeEnter: (to, from, next) => {
        if (!Cookies.get('token')) {
          return next({
            name: 'home'
          })
        }
        next()
      }
    },
    {
      path: '/graduated',
      name: 'graduated-students',
      component: graduated
    },
    {
      path: '/officials',
      name: 'officials',
      component: officials
    },
    {
      path: '/complain',
      name: 'complain',
      component: complain,
      beforeEnter: (to, from, next) => {
        if (!Cookies.get('token')) {
          return next({
            name: 'home'
          })
        }
        next()
      }
    },
    {
      path: '/adduser',
      name: 'adduser',
      component: AddUser,
      beforeEnter: (to, from, next) => {
        if (!Cookies.get('token')) {
          return next({
            name: 'home'
          })
        }
        next()
      }
    },
    {
      path: '/setgrade',
      name: '',
      component: SetGrade,
      beforeEnter: (to, from, next) => {
        if (!Cookies.get('token')) {
          return next({
            name: 'home'
          })
        }
        next()
      }
    },
    {
      path: '/editgrade',
      name: '',
      component: EditGrade,
      beforeEnter: (to, from, next) => {
        if (!Cookies.get('token')) {
          return next({
            name: 'home'
          })
        }
        next()
      }
    },
    {
      path: '/editcourses',
      name: 'addcourses',
      component: EditCourses,
      beforeEnter: (to, from, next) => {
        if (!Cookies.get('token')) {
          return next({
            name: 'home'
          })
        }
        next()
      }
    },
    {
      path: '/sendemail',
      name: 'sendemail',
      component: SendEmail,
      beforeEnter: (to, from, next) => {
        if (!Cookies.get('token')) {
          return next({
            name: 'home'
          })
        }
        next()
      }
    },
    {
      path: '/seereports',
      name: 'seereports',
      component: seereports,
      beforeEnter: (to, from, next) => {
        if (!Cookies.get('token')) {
          return next({
            name: 'home'
          })
        }
        next()
      }
    }
  ]
})

export default router
