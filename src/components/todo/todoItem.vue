<template>
  <div class="task" :class="task.class">
    <!--  -->
    
      <div
        class=" task-res
          row
          justify-content-between
          align-items-center
        "
      >
        <div class="form-group  form-check-inline  form-check">
          <input
            type="radio"
            class="form-check-input"
            @click="deleteTask(task.id)"
            id="task"
          />
          <label for="task" class="form-check-label ml-4">
            <p class="task_info">
              (<i class="far fa-flag" :class="task.priority"></i>
              {{ task.priority }} , {{ task.date }})
            </p>
            <h5 class="mt-2">
              <b>{{ task.title }}</b>
            </h5>
          </label>
        </div>
        <div class="bgs">
          <div class="red c" @click="changeBg('red', $event, task.id)"></div>
          <div
            class="green c"
            @click="changeBg('green', $event, task.id)"
          ></div>
          <div class="bleu c" @click="changeBg('bleu', $event, task.id)"></div>
        </div>

        <!--  -->
      </div>
    
  </div>
</template>

<script>
import axios from "axios";
import { tasks } from "@/assets/tasks.js";
import { ref } from "vue";

export default {
  props: ["task"],
  setup(props) {
    // get
    async function getTasks() {
      const res = await axios.get("http://localhost:3000/tasks");
      tasks.value = res.data;
    }
    // delete
    async function deleteTask(id) {
      let res = await axios.delete(`http://localhost:3000/tasks/${id}`);
      getTasks();
    }
    // change background comor
    async function changeBg(color, e, id) {
      e.target.parentElement.parentElement.classList.remove(
        "task-red",
        "task-green",
        "task-bleu"
      );
      e.target.parentElement.parentElement.classList.add("task-" + color);
      let res = await axios.put(`http://localhost:3000/tasks/${id}`, {
        class: "task-" + color,
        title: props.task.title,
        priority: props.task.priority,
        date: props.task.date,
      });
      console.log(res.data);
      // getTasks();
    }

    return {
      deleteTask,
      changeBg,
    };
  },
};
</script>

<style scoped>
.task {
  padding: 0.8rem 2rem;
  border-radius: 1rem;
  background-color: var(--light-color);
  margin-bottom: 5px;
}
.task .btn {
  color: var(--black);
}
.task .form-group {
  margin-bottom: 0;
}
.c {
  height: 25px;
  display: inline-block;
  width: 25px;
  border-radius: 50%;
  margin: 0 7px;
  cursor: pointer;
  border: 1px solid #ccc;
}

.red,
.task-red {
  color: #fff;
  background-color: #ff3838;
}
.green,
.task-green {
  color: #fff;
  background-color: green;
}
.bleu,
.task-bleu {
  color: #fff;
  background-color: #1b9cfc;
}
.task_info {
  opacity: 0.7;
  font-size: 0.8rem;
}
h5 small {
  opacity: 0.7;
}
.form-group {
  overflow: hidden;
}
h5 {
  width: 350px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.form-check-input{
  width: 3rem;
    height: 3rem;
}
@media screen and (max-width:768px){
  
  .form-check-input{
  width: 2.5rem;
    height: 2.5rem;
}
.c {
  height: 15px;
  
  width: 15px;
  
  margin: 0 5px;
  
}
h5 {
  width: 200px;
  
}
}
@media screen and (max-width:400px){
  
  .form-check-input{
  width: 2rem;
    height: 2rem;
}
  .bgs{
    display:none;
  }
  .task-res{
    display:block !important;
    overflow: hidden;
  }
  h5 {
  width: 150px;
  
}
}
</style>