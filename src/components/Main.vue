<template>
  <main>
      <div class="container">
          <div class="hero">
              <div class="hero_content  mx-auto">
                  <todoBox />
                  <todoList />
              </div>
          </div>
      </div>
  </main>
</template>

<script>
import todoBox from "../components/todo/todoBox.vue"
import todoList from "../components/todo/todoList.vue"
export default {
    components:{
        todoBox,
        todoList
    }
}
</script>

<style>
.hero_content{
    
    margin-top: 3rem;
}

</style>