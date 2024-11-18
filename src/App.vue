<template>
  <div id="app">

    <!-- COMPONENTE PRINCIPAL "GESTION DE TAREAS" -->
    <GestionTareas />
  </div>
</template>

<script>

// IMPORTAR EL COMPONENTE 

import GestionTareas from './components/GestionTareas.vue';

export default {
  name: 'App',
  components: {
    GestionTareas,
  },
};
</script>

<style>

#app {
  background-image: url('./assets/fondo.png');
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  padding: 20px;
}
</style>

