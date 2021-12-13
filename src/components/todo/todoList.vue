<template>
  <section>
    <div class="todolist">
      <h2   data-aos="zoom-in">Tasks</h2>
      <div class="tasks">
        <!--  -->
        <todoItem v-for="task in tasks" :task="task" :key="task.id" />
        <!--  -->
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
const base = "http://localhost:3000/tasks";
import todoItem from "./todoItem.vue";
import { tasks } from '@/assets/tasks.js'
export default {
  components: {
    todoItem,
  },
  setup() {
    
    async function getData() {
      let res = await axios.get(base);
      tasks.value = res.data;
      console.log(tasks.value);
    }
    getData();
    
    return {
      tasks,
    };
  },
};
</script>

<style>
.todolist {
  width: 100%;
  margin: 3rem 0;
}
.todolist h2 {
  letter-spacing: 1px;
}
.tasks {
  width: 100%;
  margin-top: 1rem;
  height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
