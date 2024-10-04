import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: 'hash', // Define o modo como 'hash'
    base: '/' // Define o caminho base, ajuste conforme necessário
  })

  Router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Verifica se a rota requer autenticação e se o usuário não está autenticado
    console.log(to)
    if (to.meta.requiresAuth && !isLoggedIn) {
      next('/login'); // Redireciona para a página de login se não estiver autenticado
    } else {
      next(); // Permite a navegação
    }
  });

  return Router
}
