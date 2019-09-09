import Vue from 'vue'
import Router from 'vue-router'
import Students from './views/Students.vue'
import Courses from './views/Courses.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'students',
      component: Students
    },
    {
      path: '/courses',
      name: 'courses',
      component: Courses
    }
  ]
})
