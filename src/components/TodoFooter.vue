<template>
  <div class="todo__footer">
    <img src="../assets/check.svg" alt="" />
    Congrats, you have no more tasks to do
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TodoFooter",
});
</script>
<style lang="scss">
.todo {
  &__footer {
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    column-gap: 11px;
    color: #8f99a3;
    font-size: 14px;
    line-height: 1.14;
  }
}
</style>
