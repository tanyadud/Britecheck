const userRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/user/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/user/Register.vue')
  },
  {
    path: '/resetpassword',
    name: 'ResetPassword',
    component: () => import('../views/user/ResetPassword.vue')
  },
  {
    path: '/policy',
    name: 'Policy',
    component: () => import('../views/Policy.vue'),
    meta: {
      breadcrumbs: [{ name: 'Policy' }]
    }
  },
  {
    path: '/passwordForgot',
    name: 'passwordForgot',
    component: () => import('../views/user/ForgotPassword.vue'),
    meta: {
      breadcrumbs: [{ name: 'Forgot Password' }]
    }
  },
  {
    path: '/setPassword',
    name: 'SetPassword',
    component: () => import('../views/user/SetPassword.vue'),
    meta: {
      breadcrumbs: [{ name: 'Set Password' }]
    }
  }
]

export default userRoutes
