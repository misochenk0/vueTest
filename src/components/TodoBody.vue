<template>
  <div class="todo__body">
    <div class="todo__wrapper">
      <TodoForm @submit-form="getTodo" />
    </div>
    <div class="todo-block" v-if="list.length > 0">
      <TodoList
        :list="list"
        :filter="currentFilter"
        @update-state="updateState"
      />
      <div class="todo__wrapper">
        <TodoInfo :list="list"/>
        <TodoFilters
          :list="list"
          :filter="currentFilter"
          @update-state="updateState"
          @change-filter="changeFilter"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import type { Todo } from "../types";

import TodoForm from "./TodoForm.vue";
import TodoInfo from "./TodoInfo.vue";
import TodoList from "./TodoList.vue";
import TodoFilters from "./TodoFilters.vue";

export default defineComponent({
  name: "TodoBody",
  components: {
    TodoForm,
    TodoList,
    TodoInfo,
    TodoFilters,
  },
  data(): {
    list: Todo[] | [];
    currentFilter: string;
  } {
    return {
      list: this.todoList,
      currentFilter: "show-all"
    };
  },
  props: {
    todoList: { type: Array as () => Todo[] | [], required: true },
  },
  watch: {
    currentFilter:function() {
      this.$emit("update-state", this.list);
    },
    list:function() {
      if(this.list.every(item => item.isCompleted === true) || this.list.every(item => item.isCompleted === false)) {
        this.currentFilter = "show-all"
      }
    }
  },
  methods: {
    getTodo(todo: Todo): void {
      this.list = [...this.list, todo];
      this.$emit("update-state", this.list);
    },
    updateState(list: Todo[]) {
      this.list = list;
      this.$emit("update-state", this.list);
    },
    changeFilter(filter: string) {
      this.currentFilter = filter
    }
  },
});
</script>
<style lang="scss">
.todo {
  &__body {
    flex: 1;
  }
  &-block {
    max-width: 458px;
    margin: 0 auto;
    .todo__wrapper {
      margin-top: 0;
    }
  }
  &__wrapper {
    max-width: 410px;
    overflow: hidden;
    margin: 3.25rem auto 0;
  }
}
</style>
