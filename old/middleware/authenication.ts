export default defineNuxtRouteMiddleware((to, from) => {
  const toLogin = to.path === '/login'

  // is authed and going to auth pages
  // if (!!user.value && toLogin) return navigateTo('/account')

  // is not authed and not going to auth pages
  // if (!user.value && !toLogin) return navigateTo('/login')
})
