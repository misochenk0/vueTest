<template>
  <div class="todo">
    <TodoHeader />
    <TodoBody :todoList="todoList" @update-state="updateState" />
    <TodoFooter v-if="todoList.length === 0" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import type { Todo } from "./types";

import TodoHeader from "./components/TodoHeader.vue";
import TodoBody from "./components/TodoBody.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default defineComponent({
  name: "App",
  components: {
    TodoHeader,
    TodoBody,
    TodoFooter,
  },
  data(): {
    todoList: Todo[] | [];
  } {
    return {
      todoList: this.getTodos(),
    };
  },
  methods: {
    getTodos(): Todo[] {
      return [
        {
          text: "test",
          id: "1",
          isCompleted: false,
        },
      ];
    },
    updateState(list: Todo[]) {
      this.todoList = list;
    },
  },
});
</script>
<style lang="scss">
@import "./assets/style/base.scss";
</style>
