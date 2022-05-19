<template>
  <div class="todo">
    <div class="todo__body">
      <img src="./assets/todo-img.svg" alt="todo-img" class="todo__img">
      <h2 class="todo__title">Today I need to</h2>
      <div class="todo__wrapper">
        <TodoForm @submit-form="getTodo"/>
        <ul class="todo__list" v-if="todoList.length > 0">
          <Task 
            v-for="task in todoList" 
            :text="task.text" 
            :key="task.id" 
            :isCompleted="task.isCompleted"
            :id="task.id"
            @check-item="checkTodo"
            @remove-item="removeTodo"
            @edit-item="editTodo"
            /> 
        </ul>
      </div>
    </div>
    <div class="todo__footer" v-if="todoList.length === 0">
      <img src="./assets/check.svg" alt="">
      Congrat, you have no more tasks to do
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent } from "vue";
import type {Todo} from "./types";
import TodoForm from "./components/TodoForm.vue";
import Task from "./components/Task.vue";

export default defineComponent({
  name: "App",
  components: {
    TodoForm,
    Task
  },
  data():{todoList: Todo[] | []} {
    return {
      todoList: [{
        text: "test",
        id: "1",
        isCompleted: false
      }]
    }
  },
  methods: {
    getTodo(todo: Todo):void {
      this.todoList = [...this.todoList, todo] 
    },
    checkTodo(id:String, isChecked: Boolean):void {
      this.todoList = this.todoList.map(item => {
        if(item.id === id) {
          return {
            ...item,
            isCompleted: isChecked
          }
        } 
        return item
        
      })
    },
    removeTodo(id:String) {
      this.todoList = this.todoList.filter(item => {
        if(item.id === id) {
          return null
        }
        return item
      })
    },
    editTodo(id:String, text: String) {
      this.todoList = this.todoList.filter(item => {
        if(item.id === id) {
          return {
            ...item,
            text: text
          }
        }
        return item
      })
    }
  }
})
</script>
<style lang="scss">
  @import "./assets/style/base.scss";

  .todo {
    max-width: 730px;
    width: 100%;
    margin: 0 15px;
    padding: 2rem;
    height: 719px;
    background: #fff;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &__list {
      margin-top: 40px;
      height: 92px;
      overflow-y: auto;
    }
    &__img {
      display: block;
      margin: 0 auto;
    }
    &__title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-top: 2em;
      text-align: center;
    }
    &__wrapper {
      max-width: 410px;
      overflow: hidden;
      margin: 3.25rem auto 0;
    }
    &__footer {
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 11px;
      color: #8F99A3;
      font-size: 14px;
      line-height: 1.14;
    }
  }
</style>