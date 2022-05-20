<template>
  <form
    :class="inputValue.length < 2 ? 'form' : 'form show-btn'"
    @submit="submitTodo"
  >
    <input
      type="text"
      class="input"
      placeholder="Add new todo..."
      v-model="inputValue"
    />
    <TodoBtn
      title="Submit"
      btnClass="btn_form"
      :isDisabled="inputValue.length >= 2 ? false : true"
    />
  </form>
</template>
<script lang="ts">
import TodoBtn from "./TodoBtn.vue";
import { defineComponent } from "vue";
import type { Todo } from "../types";
export default defineComponent({
  name: "TodoForm",
  components: {
    TodoBtn,
  },
  data() {
    return {
      isHiddenBtn: true,
      inputValue: "",
    };
  },
  methods: {
    submitTodo(e: Event): void {
      e.preventDefault();
      let todo: Todo = {
        text: this.inputValue,
        isCompleted: false,
        id: `id-${new Date().getTime()}`,
      };
      this.$emit("submit-form", todo);
      this.inputValue = "";
    },
  },
});
</script>
<style lang="scss">
@import "../assets/style/variables";
.form {
  display: flex;
  overflow-x: hidden;
  max-width: 317px;
  margin: 0 auto;
  transition: 0.5s all;
  &.show-btn {
    max-width: 410px;
    .btn {
      transform: none;
    }
  }
}
.input {
  border: 1px solid #c7ccd1;
  border-radius: 8px;
  flex-shrink: 0;
  font-size: 14px;
  padding: 12px;
  width: 317px;
  &:focus {
    outline: none;
    border: 1px solid $color-blue;
  }
}

@media (max-width: 576px) {
  .input {
    width: 160px;
  }
  .form {
    max-width: 160px;
    &.show-btn {
      max-width: 250px;
    }
  }
}
</style>
