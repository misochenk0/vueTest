<template>
  <div class="todo">
    <img src="./assets/todo-img.svg" alt="todo-img" class="todo__img">
  </div>
</template>
<script lang="ts">
export default {
  
}
</script>
<style lang="scss">
  @import "./assets/style/base.scss";

  .todo {
    max-width: 730px;
    width: 100%;
    margin: 0 15px;
    padding: 32px;
    background: #fff;
    border-radius: 24px;
    &__img {
      display: block;
      margin: 0 auto;
    }
  }
</style>