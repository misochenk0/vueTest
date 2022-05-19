<template>
  <form :class="inputValue.length < 2 ? 'form' : 'form show-btn'" @submit="submitTodo">
    <input type="text" class="input" placeholder="Add new todo..." v-model="inputValue">
    <Btn title="Submit" btnClass="btn_form" :isDisabled="inputValue.length > 2 ? false : true"/>
  </form>
</template>
<script lang="ts">
import Btn from "./Btn.vue";
import {defineComponent } from "vue";
import type {Todo} from "../types"
export default defineComponent ({
  name: "TodoForm",
  components: {
      Btn
  },
  data() {
    return{
      isHiddenBtn: true,
      inputValue: "",
    }
  },
  methods: {
    submitTodo(e: Event):void {
      e.preventDefault();
      let todo:Todo = {
        text: this.inputValue,
        isCompleted: false,
        id: `id-${new Date().getTime()}`
      }
      this.$emit("submit-form", todo)
      this.inputValue = "";
      
    }
  }
})
</script>
<style lang="scss">
  @import "../assets/style/variables";
  .form {
    display: flex;
    overflow-x: clip;
    max-width: 317px;
    margin: 0 auto;
    transition: .5s all;
    &.show-btn {
      max-width: 410px;
      .btn {
        transform: none;
      }
    }
  }
  .input {
    border: 1px solid #C7CCD1;
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
</style>