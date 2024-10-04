import { createRouter, createWebHistory } from 'vue-router';

// Defina suas rotas
const routes = [
  {
    path: '/',
    component: () => import('layouts/layoutWithoutLogin.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ],
    meta: { requiresAuth: true } // Adiciona meta para proteger a rota
  },
  {
    path: '/login',
    component: () => import('layouts/layoutWithoutLogin.vue'),
    children: [
      { path: '', component: () => import('pages/login.vue') }
    ],
    meta: { requiresAuth: false } // Página de login não precisa de autenticação
  },
  {
    path: '/cadastro/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/cadastro.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/parceiros/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/parceiros.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/cadastro_compras/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/cadastro_compras.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/viagens/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/viagens.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/viagens/milhas',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/milhas.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/viagens/roubo_exterior',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/roubo_exterior.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/viagens/aluguel_carro',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/aluguel_carro.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/viagens/seguro_viagem',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/seguro_viagem.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/dashboard.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/menu',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/menu.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/push',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/push.vue') }
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

// Criação do router
/* const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// Adiciona a lógica de verificação de autenticação
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login'); // Redireciona para a página de login se não estiver autenticado
  } else {
    next(); // Permite a navegação
  }
}); */

export default routes;
