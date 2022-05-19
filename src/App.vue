<template>
  <div class="todo">
    <TodoHeader/>
    <div class="todo__body">
      <div class="todo__wrapper">
        <TodoForm @submit-form="getTodo"/>
        <div class="todo-block" v-if="todoList.length > 0">
          <TodoList 
            :list="todoList" 
            :displayedList="displayedTodos" 
            @update-state="updateState"
          />
          <TodoInfo 
            :list="todoList" 
            :displayedList="displayedTodos"
          />
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
    <TodoFooter v-if="todoList.length === 0"/>
  </div>
</template>
<script lang="ts">
import {defineComponent } from "vue";

import filtersData from "./data/filterData.json"

import type {Todo, Filter} from "./types";

import TodoHeader from "./components/TodoHeader.vue";
import TodoForm from "./components/TodoForm.vue";
import TodoInfo from "./components/TodoInfo.vue";
import TodoList from "./components/TodoList.vue";
import Btn from "./components/Btn.vue";
import TodoFooter from "./components/TodoFooter.vue";



export default defineComponent({
  name: "App",
  components: {
    TodoHeader,
    TodoForm,
    TodoList,
    TodoInfo,
    Btn,
    TodoFooter,
  },
  data():{todoList: Todo[] | [], displayedTodos: Todo[] | [], onlyAll: Boolean, currentFilter: String, filters: Filter[] | []} {
    return {
      todoList: [],
      displayedTodos: [],
      currentFilter: "show-all",
      onlyAll: false,
      filters: filtersData
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
    updateState(list: Todo[]) {
      this.todoList = list
    },
    useFilter(type: String) {     
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

    &__body {
      flex: 1;
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
  }
</style>