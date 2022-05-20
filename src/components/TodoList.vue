<template>
  <draggable class="todo__list" tag="ul" :list="todoList" :disabled="filter === 'show-all' ? false : true" @change="changeList" handle=".task__drag">
    <TodoTask
      v-for="task in displayedList"
      :text="task.text"
      :key="task.id"
      :isCompleted="task.isCompleted"
      :id="task.id"
      :isDraggable="filter === 'show-all' ? true : false"
      @check-item="checkTodo"
      @remove-item="removeTodo"
      @edit-item="editTodo"
    />
  </draggable>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import TodoTask from "./TodoTask.vue";
import type { Todo } from "../types";

import { VueDraggableNext } from 'vue-draggable-next';

export default defineComponent({
  name: "TodoInfo",
  components: {
    TodoTask,
    draggable: VueDraggableNext
  },
  props: {  
    displayedList: {
      type: Array as () => Todo[] | [],
      required: true,
    },
    list: {
      type: Array as () => Todo[] | [],
      required: true,
    },
    filter: String
  },
  data(): { todoList: Todo[] | [] } {
    return {
      todoList: this.list
    };
  },
  watch: {
    todoList: function () {
      this.$emit("update-state", this.todoList);
    },
    list: function() {
      this.todoList = this.list
    }
  },
  mounted() {   
    this.todoList = [...this.list];
  },
  methods: {
    checkTodo(id: string, isChecked: boolean): void {
      this.todoList = this.list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isCompleted: isChecked,
          };
        }
        return item;
      });
    },
    changeList() {
      this.$emit("update-state", this.todoList)
    },
    removeTodo(id: string) {
      this.todoList = this.list.filter((item) => {
        if (item.id === id) {
          return null;
        }
        return item;
      });
    },
    editTodo(id: string, text: string) {
      this.todoList = this.list.filter((item) => {
        if (item.id === id) {
          return {
            ...item,
            text: text,
          };
        }
        return item;
      });
    },
  },
});
</script>
<style lang="scss">
@import "../assets/style/mixins";

.todo {
  &__list {
    margin-top: 40px;
    height: 92px;
    overflow-x: clip;
    @include scrollbar;
  }
}
</style>
