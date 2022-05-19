<template>
    <div class="todo__header">
      <img src="../assets/todo-img.svg" alt="todo-img" class="todo__img">
      <h2 class="todo__title">Today I need to</h2>
    </div>
</template>
<script lang="ts">
import {defineComponent } from "vue";

export default defineComponent ({
  name: "TodoHeader"
})
</script>
<style lang="scss">
  @import "../assets/style/variables";
	.todo {
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
	}
</style>