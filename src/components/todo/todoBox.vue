<template>
  <div v-if="isAdded.state"  data-aos="zoom-in-up" :class="isAdded.class" class="alert my-2 alert-dismissible fade show" role="alert">
  <strong>{{ isAdded.message }}</strong>
  <button type="button" @click="hiddenAlert" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
  <div class="box_task" data-aos="zoom-in-up">
    <div class="box_task_content">
      <h6 class="mb-3">
        Today - <time>{{ dateToday }}</time>
      </h6>
      <form @submit.prevent="postTasks">
        <div class="form-group">
          <input
            type="text"
            maxlength="40"
            size="40"
            class="form-control  d-sm-block"
            placeholder="your task ex: go to gym"
            v-model="task.title"
            required
          />
        </div>
        
        <div class="form-group d-inline-block">
          <input
            type="date"
            id="datePicker"
            class="form-control"
            v-model="task.date"
          />
        </div>
        <div class="form-group ml-4 d-inline-block">
          <div class="dropdown">
            <button
              class="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
            >
              <i class="far fa-flag"></i>
            </button>
            <div class="dropdown-menu">
              <li class="dropdown-item" @click="prioChange(0,'p1')">
                <i class="far fa-flag p1"></i> p1
              </li>
              <li class="dropdown-item" @click="prioChange(1,'p2')">
                <i class="far fa-flag p2"></i> p2
              </li>
              <li class="dropdown-item" @click="prioChange(2,'p3')">
                <i class="far fa-flag p3"></i> p3
              </li>
              <li class="dropdown-item active" @click="prioChange(3,'p4')">
                <i class="far fa-flag p4"></i> p4
              </li>
            </div>
          </div>
        </div>
        <div class="form-group d-flex">
          <input type="submit" class="btn btn_add" value="Add Task" />
          <input type="button"  @click="reset" value="Cancel" class="btn btn_cancel ml-2" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {  computed, reactive,onRenderTriggered } from "vue";
import axios from "axios";
const base = "http://localhost:3000/tasks";
import { tasks } from '@/assets/tasks.js'

export default {
  setup() {
    //   Vars for Date Property
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = String(today.getDate()).padStart(2, "0");
    //   Setup Function Get data
    const getData = async function () {
      let res = await axios.get(base);
      tasks.value = res.data;
      return tasks.value;
    };
    //   Setup Function Post Data
    
    async function postTasks() {
      let get = await getData();
      let found = false;
      //   check if task exist
      for (const t of get) {
        if (t.title === task.title) {
          found = true;
        }
      }
      //   add task or not
      if (!found) {
        let res = await axios.post(base, task).catch(function (error) {
          console.log(error.toJSON());
          showAlert("Something Wrong please try again","alert-danger")
        });
        tasks.value = [...tasks.value,res.data];
        console.log(tasks.value);
        reset();
        showAlert("Task Added","alert-success")
        
        
      } else {
        console.log("exist");
        showAlert("Task is Already Exist","alert-danger")
      }
    }
    //   Computed propertys for date
    let dateToday = computed(() => {
      const today = new Date();
      let monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return (
        monthNames[today.getMonth()] +
        " , " +
        today.getDate() +
        " , " +
        today.getFullYear()
      );
    });

    // task object reactive
    const task = reactive({
      title: "",
  
      priority: "p4",
      date: `${year}-${month}-${day}`,
      class:""
    });
    // Function for remove active link
    function removeActiveLink(){
      const links = document.querySelector(".dropdown-menu");
      
      [...links.children].forEach((link) => {
        link.classList.remove("active");
      });
    }
    // Function for change Priority onclick
    
    function prioChange(e,p) {
      removeActiveLink()
      const links = document.querySelector(".dropdown-menu");
      task.priority = p;
      links.children[e].classList.add("active");
      console.log(task.priority);
    }
    // Reset form function
    function reset() {
      task.title = "";
      
      task.priority = "p4";
      task.date = `${year}-${month}-${day}`;
      //   remove active class from priority selected and add to p4
      removeActiveLink();
      const links = document.querySelector(".dropdown-menu");
      links.children[3].classList.add("active");
    }
    // ALERT
    let isAdded = reactive({
      state:false,
      message:"",
      class:"",
    })
    function showAlert(msg,className){
      isAdded.state = true;
        isAdded.message = msg;
        isAdded.class=className;
    }
    function hideAlert(){
      isAdded.state = false;
        isAdded.message = "";
        isAdded.class="";
    }
    function timeoutAlert() {
     
      setTimeout(function () {
        hideAlert();
        
      }, 2500);
    }
     onRenderTriggered(() => {
      if(isAdded){
        timeoutAlert();
      }
    })
   
    // END
    // Returns
    return {
      dateToday,
      task,
      prioChange,
      postTasks,
      isAdded,
      reset,
      hideAlert
    };
  },
};
</script>

<style>

h6 time {
  font-weight: 300;
  color: var(--dark-color);
  font-size: 0.8rem;
}
.form-control {
  border: none !important;
  color: var(--dark-color) !important;
}
#dropdownMenuButton {
  background-color: var(--redd);
  color: var(--fff);
}
.dropdown-item {
  font-weight: 300;
  transition: var(--transition);
  cursor: pointer;
  padding: 0.25rem 1.5rem;
}

.dropdown-menu {
  border: none;
  padding: 0;
}
.dropdown-item:hover,
.dropdown-item.active {
  background-color: var(--light-color);
}
.dropdown-item.active {
  color: var(--black);
}
.p1 {
  color: var(--red);
}
.p2 {
  color: skyblue;
}
.p3 {
  color: green;
}
.btn_add {
  background-color: var(--red);
  color: var(--fff);
  transition: var(--transition);
  min-width: 150px;
}
.btn_add:hover {
  background-color: transparent;
  color: var(--red);
}
.btn_cancel {
  min-width: 100px;
}
.box_task {
  padding: 30px;
  border-radius: 0.5rem;
  background-color: var(--light-color);
}

@media screen and (max-width:768px){
  .box_task {
    padding: 15px;
   
  }
  .box_task .form-group{
    display: block !important;
    margin-left: 0 !important;
    
  }
  
  
}
@media screen and (max-width:400px){
  
  
  .btn_cancel {
  min-width: 70px;
}
.btn_add {
  
  min-width: 100px;
}
}

</style>
