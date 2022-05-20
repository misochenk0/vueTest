<template>
  <div class="todo__body">
    <div class="todo__wrapper">
      <TodoForm @submit-form="getTodo" />
      <div class="todo-block" v-if="list.length > 0">
        <TodoList
          :list="list"
          :displayedList="displayed"
          @update-state="updateState"
        />
        <TodoInfo :list="list" :displayedList="displayed" />
        <TodoFilters
          :list="list"
          :displayedList="displayed"
          @update-state="updateState"
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
    displayed: Todo[] | [];
  } {
    return {
      list: this.todoList,
      displayed: [],
    };
  },
  mounted() {
    this.displayed = this.list;
  },
  props: {
    todoList: { type: Array as () => Todo[] | [], required: true },
  },
  watch: {
    list: function () {
      this.displayed = this.list;
    },
  },
  methods: {
    getTodo(todo: Todo): void {
      this.list = [...this.list, todo];
      this.$emit("update-state", this.list);
    },
    updateState(list: Todo[], displayedList?: Todo[]) {
      if (displayedList) {
        this.displayed = displayedList;
        return;
      }
      this.list = list;
      this.displayed = this.todoList;
      this.$emit("update-state", this.list);
    },
  },
});
</script>
<style lang="scss">
.todo {
  &__body {
    flex: 1;
  }
  &__wrapper {
    max-width: 410px;
    overflow: hidden;
    margin: 3.25rem auto 0;
  }
}
</style>
