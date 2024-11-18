<template>
  <div class="gestion-tareas-container">

    <!-- INFORMACION DEL USUARIO -->
    
    <div class="user-info">
      <div class="info-box">
        <p><strong>Nombre:</strong></p>
        <p>Carlos Meneses</p>
        <p><strong>Correo:</strong></p>
        <p>Carlos@gmail.com</p>
        <p><strong>Celular:</strong></p>
        <p>3225284455</p>
      </div>
    </div>

    <!-- CONTENEDOR PRINCIPAL -->

    <div class="main-content">
      <div class="header-box">
        <h2>GESTIÓN DE TAREAS</h2>
      </div>

      <!-- CONTENEDOR DE TAREAS -->

      <div class="task-container">
        <div class="board-header">
          <p><strong>Tablero:</strong> Casa</p>
          <p><strong>Descripción:</strong> tareas de la casa</p>
        </div>

        <!-- TABLA DE TAREAS -->

        <table>
          <thead>
            <tr>
              <th>Tareas</th>
              <th>Fecha</th>
              <th>Asignación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in tasks" :key="index">
              <td>{{ task.name }}</td>
              <td>{{ task.date }}</td>
              <td>{{ task.assigned || "No asignada" }}</td>
              <td>

                <!-- CASILLA DE VERIFICACION CUANDO LA TAREA HA SIDO COMPLETADA -->

                <input type="checkbox" :checked="task.assigned" @change="handleCheckboxChange($event)" />

                <!-- BOTON EDITAR TAREA -->

                <button @click="editTask(index)" class="action-button">
                  <img :src="botonEditar" alt="Editar" />
                </button>

                <!-- BOTON ELIMINAR TAREA -->

                <button @click="deleteTask(index)" class="action-button">
                  <img :src="botonEliminar" alt="Eliminar" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- BOTON CREAR TAREA -->

        <div class="buttons">
          <button @click="showCreateTaskModal = true" class="create-button">Crear tarea</button>
        </div>
      </div>
    </div>

    <!-- V MODAL PARA CREAR TAREA -->

    <div v-if="showCreateTaskModal" class="modal-overlay">
      <div class="modal">

        <!-- COMPONENTE PARA CREAR TAREA -->

        <CrearTarea
          :taskData="currentTask"
          @close="showCreateTaskModal = false"
          @saveTask="addTask"
        />
        
        <!-- BOTON GUARDAR TAREA -->

        <button @click="saveTaskAction" class="save-task-button">Crear tarea</button>
      </div>
    </div>

    <!-- V MODAL EDITAR TAREA -->

    <div v-if="showEditTaskModal" class="modal-overlay">
      <div class="modal">

        <!-- COMPONENTE PARA EDITAR TAREA -->

        <CrearTarea
          :taskData="currentTask"
          @close="showEditTaskModal = false"
          @saveTask="editTaskAction"
        />

        <!-- BOTON GUARDAR TAREA LUEGO DE EDITARLA -->

        <button @click="saveEditTaskAction" class="save-task-button">Editar tarea</button>
      </div>
    </div>
  </div>
</template>

<script>
import CrearTarea from "./CrearTarea.vue"; // Importa el componente para crear/editar tareas
import botonEditar from "@/assets/boton-editar.png"; // Importa la imagen para editar
import botonEliminar from "@/assets/eliminar.png"; // Importa la imagen para eliminar

export default {
  name: "GestionTareas",
  components: {
    CrearTarea, // GUARDAR LA TAREA
  },
  data() {
    return {
      tasks: [], // ALMACENAR TAREA
      showCreateTaskModal: false, 
      showEditTaskModal: false, 
      botonEditar, // IMG EDITAR
      botonEliminar, // IMG ELIMINAR
      currentTask: null, // 
    };
  },
  methods: {

    // GUARDAR TAREA

    saveTasks() {
      const errors = []; // ALMACENAR ERRORES EN LA VALIDACION

      for (const task of this.tasks) {
        // Validación de campos obligatorios
        if (!task.name) errors.push("El campo 'Tareas' es obligatorio.");
        if (!task.date) errors.push("El campo 'Fecha' es obligatorio.");
      }
      if (errors.length > 0) {
        alert("Errores:\n" + errors.join("\n")); // MOSTRAR ERRORES
      } else {
        alert("Las tareas han sido guardadas correctamente."); 
      }
    },

    // EDITAR TAREA 

    editTask(index) {
      const taskToEdit = this.tasks[index]; 
      this.currentTask = { ...taskToEdit };  // EDITAR TAREA SIN MODIFICAR
      this.showEditTaskModal = true; 
    },

    // ELIMINAR TAREA

    deleteTask(index) {
      this.tasks.splice(index, 1); // ELIMINA LA TAREA DE LA LISTA
      console.log("La tarea ha sido eliminada.");
    },

    // AGREGAR NUEVA TAREA

    addTask(newTask) {
      this.tasks.push(newTask); // AÑADE NUEVA TAREA A LA LISTA
      this.showCreateTaskModal = false;  
      this.currentTask = null; // LIMPIAR EL V MODAL
    },

    // EDITAR TAREA

    editTaskAction(updatedTask) {
      const taskIndex = this.tasks.findIndex(task => task.name === this.currentTask.name); 
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = updatedTask;  // ACTUALIZAR TAREA
      }
      this.showEditTaskModal = false;  
      this.currentTask = null; // LIMPIAR TAREA
    },

    // ACCION CREAR TAREA

    saveTaskAction() {
      this.addTask(this.currentTask); // METODO CREAR TAREA
    },

    // ACCION EDITAR TAREA

    saveEditTaskAction() {
      this.editTaskAction(this.currentTask); // METODO EDITAR TAREA
    },

    // CASILLA DE VERIFICACION

    handleCheckboxChange(event) {
      event.preventDefault(); 
    },
  },
};
</script>

<style scoped>

/* ESTILO DEL CONTENEDOR PRINCIPAL */

.gestion-tareas-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-image: url('@/assets/fondo.png');
  background-size: cover;
  background-position: center;
  padding: 20px;
}

/* ESTILO INFORMACION DEL USUARIO */

.user-info {
  width: 25%;
  padding: 10px;
}

.info-box {
  background: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

/* ESTILO CONTENEDOR PRINCIPAL */

.main-content {
  width: 40%;
}

/* ESTILO ENCABEZADO */

.header-box {
  background: white;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* ESTILO CONTENEDOR DE TAREAS */

.task-container {
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.board-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

/* ESTILO DE LOS BOTONES */

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.create-button {
  background: #b0b0b0;
  color: black;
  font-weight: bold;
}

button:hover {
  opacity: 0.9;
}

.action-button img {
  width: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>




