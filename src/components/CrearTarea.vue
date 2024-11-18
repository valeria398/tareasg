<template>
  <div class="create-task-modal">
    <div class="modal-content">
      <h3 class="left-align">{{ task.id ? 'Editar tarea' : 'Crear tarea' }}</h3>

      <form @submit.prevent="submitForm">

        <!-- NOMBRE TAREA -->
        
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input type="text" id="name" v-model="task.name" class="input-field fixed-width" required />
        </div>
        
        <!-- DESCRIPCION TAREA -->

        <div class="form-group">
          <label for="description">Descripción:</label>
          <textarea id="description" v-model="task.description" class="input-field fixed-width" required></textarea>
        </div>

        <!-- FECHA VENCIMIENTO, HORA VENCIMIENTO -->

        <div class="form-group date-time-group">
          <div class="field-group">
            <label for="date">Fecha de vencimiento:</label>
            <input type="date" id="date" v-model="task.date" class="input-field fixed-width" required />
          </div>
          <div class="field-group">
            <label for="time">Hora:</label>
            <input type="time" id="time" v-model="task.time" class="input-field time-input" required />
          </div>
        </div>

        <!-- ASIGNACION -->

        <div class="form-group">
          <label for="assigned">Asignación:</label>
          <input type="text" id="assigned" v-model="task.assigned" class="input-field fixed-width" placeholder="" required />
        </div>

        <!-- BOTONES DE ACCIONES -->

        <div class="form-buttons">
          <button type="submit" class="submit-button">{{ task.id ? 'Actualizar' : 'Guardar' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CrearTarea",
  props: {
    taskData: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      task: this.taskData ? { ...this.taskData } : { name: "", description: "", date: "", time: "", assigned: "" },
    };
  },
  watch: {
    taskData(newVal) {
      if (newVal) {
        this.task = { ...newVal };  
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit("saveTask", this.task); 
      this.resetForm(); 
    },
    closeModal() {
      this.$emit("close"); // Cerrar el modal
      this.resetForm(); // Limpiar formulario
    },
    resetForm() {
      this.task = { name: "", description: "", date: "", time: "", assigned: "" }; // LIMPIAR FORMULARIO
    }
  }
};
</script>

<style scoped>
.create-task-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  text-align: center;
}

h3 {
  margin-bottom: 20px;
  text-align: left;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

.input-field {
  padding: 8px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.fixed-width {
  width: 200px; 
}

textarea.input-field {
  height: 80px;
  resize: none;
}

.date-time-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
}

.field-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.time-input {
  width: 100px; 
}

.form-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.submit-button {
  background-color: #B0B0B0;
  color: black;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>
