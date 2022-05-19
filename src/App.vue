<template>
  <div class="todo">
    <div class="todo__body">
      <img src="./assets/todo-img.svg" alt="todo-img" class="todo__img">
      <h2 class="todo__title">Today I need to</h2>
      <div class="todo__wrapper">
        <TodoForm @submit-form="getTodo"/>
        <div class="todo-block" v-if="todoList.length > 0">
          <ul class="todo__list">
            <Task 
              v-for="task in displayedTodos" 
              :text="task.text" 
              :key="task.id" 
              :isCompleted="task.isCompleted"
              :id="task.id"
              @check-item="checkTodo"
              @remove-item="removeTodo"
              @edit-item="editTodo"
              /> 
          </ul>
          <div class="todo__grid">
            <InfoBlock blockName="Completed" color="#5D5FEF" :tasksAmount="todoList.reduce((prev, item) => item.isCompleted ? prev+=1 : prev,0)" :totalTasks="todoList.length"/>
            <InfoBlock blockName="To be finished" color="#EF5DA8" :tasksAmount="todoList.reduce((prev, item) => !item.isCompleted ? prev+=1 : prev,0)" :totalTasks="todoList.length"/>
          </div>
          <div :class="'todo__btns ' + (onlyAll ? 'only-all' : '') ">
            <Btn v-for="btn in filters" 
                :key="btn.name" 
                :title="btn.name" 
                btnClass="btn_filter"
                :btnType="btn.type" 
                :category="btn.category"
                :isShowed="btn.isShowed" 
                :isActive="btn.isActive"
                @press-btn="useFilter"/>
          </div>
        </div>
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
import type {Todo, Filter} from "./types";
import TodoForm from "./components/TodoForm.vue";
import Task from "./components/Task.vue";
import Btn from "./components/Btn.vue";
import InfoBlock from './components/InfoBlock.vue';

export default defineComponent({
  name: "App",
  components: {
    TodoForm,
    Btn,
    InfoBlock,
    Task
  },
  data():{todoList: Todo[] | [], displayedTodos: Todo[] | [], onlyAll: Boolean, currentFilter: String, filters: Filter[] | []} {
    return {
      todoList: [],
      displayedTodos: [],
      currentFilter: "show-all",
      onlyAll: false,
      filters: [
        {
          name: "Check all",
          type: "check-all",
          isActive: false,
          isShowed: true,
          category: "check-all"
        },
        {
          name: "All",
          type: "show-all",
          isActive: true,
          isShowed: true,
          category: "filter"

        },
        {
          name: "Active",
          type: "show-active",
          isActive: false,
          isShowed: true,
          category: "filter"
        },
        {
          name: "Completed",
          type: "show-completed",
          isActive: false,
          isShowed: true,
          category: "filter"
        },
        {
          name: "Clear completed",
          type: "clear-completed",
          isActive: false,
          isShowed: true,
          category: "clear"
        },

      ]
    }
  },
  mounted() {
    this.todoList = [{
      text: "test",
      id: "1",
      isCompleted: false
    }];
    this.displayedTodos = this.todoList
  },
  watch: {
    currentFilter:function() {
      this.filters = this.filters.map(item => {
        if(item.type === this.currentFilter) {
          return {
            ...item,
            isActive: true
          }
        } else {
          return {
            ...item,
            isActive: false
          }
        }
      })
    },
    todoList:function() {
      this.displayedTodos = this.todoList;
      this.filters = this.filters.map(item => {
        if(item.type === "check-all") {
          this.currentFilter = "show-all";
          return {
            ...item,
            isShowed: this.todoList.some(item => item.isCompleted === false)
          }
        }
        if(item.type === "clear-completed") {
          this.currentFilter = "show-all";
          return{
            ...item,
            isShowed: this.todoList.some(item => item.isCompleted === true)
          }
        }
        if(item.type !== "show-all") {
          if(this.todoList.every(item => item.isCompleted === true) || this.todoList.every(item => item.isCompleted === false)) {
            this.onlyAll = true
          } else {
            this.onlyAll = false
          }
          return {
            ...item,
            isShowed: this.todoList.some(item => item.isCompleted === true) && !this.todoList.every(item => item.isCompleted === true)
          }
        } else {
          return item
        }
      })
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
    },
    useFilter(type: String) {
      console.log(type);
      
      if(type === "check-all") {
        this.todoList = this.todoList.map(item => {
          if(!item.isCompleted) {
            return {
              ...item,
              isCompleted: true
            }
          }
          return item
        })
      } 
      if(type === "clear-completed") {
        this.todoList = this.todoList.filter(item => {
          if(item.isCompleted) {
            return null
          }
          return item
        })
      }
      if(type==="show-all") {
        this.currentFilter = type;
        this.displayedTodos = this.todoList
      }
      if(type==="show-active") {
        this.currentFilter = type;
        this.displayedTodos = this.todoList.filter(item => {
          if(!item.isCompleted) {
            return item
          }
          return null
        })
      } 
      if(type==="show-completed") {
        this.currentFilter = type
        this.displayedTodos = this.todoList.filter(item => {
          if(item.isCompleted) {
            return item
          }
          return null
        })
      }
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
    &__btns {
      margin-top: 32px;
      display: flex;
      justify-content: space-between;
      position: relative;
      &.only-all {
        .filter.active {
          position: absolute;
          right: 50%;
          transform: translateX(50%);
        }
      }
    }
    &__grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
      margin-top: 32px;
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