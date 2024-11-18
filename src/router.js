import { createRouter, createWebHistory } from 'vue-router';
import GestionTareas from './components/GestionTareas.vue';
import CrearTarea from './components/CrearTarea.vue';

const routes = [
  { path: '/', name: 'GestionTareas', component: GestionTareas },
  { path: '/crear-tarea', name: 'CrearTarea', component: CrearTarea },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
