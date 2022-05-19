<template>
  <div class="todo__grid">
    <InfoBlock
      blockName="Completed"
      color="#5D5FEF"
      :tasksAmount="
        list.reduce((prev, item) => (item.isCompleted ? (prev += 1) : prev), 0)
      "
      :totalTasks="list.length"
    />
    <InfoBlock
      blockName="To be finished"
      color="#EF5DA8"
      :tasksAmount="
        list.reduce((prev, item) => (!item.isCompleted ? (prev += 1) : prev), 0)
      "
      :totalTasks="list.length"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import InfoBlock from "./InfoBlock.vue";
import type { Todo } from "../types";

export default defineComponent({
  name: "TodoInfo",
  components: {
    InfoBlock,
  },
  props: {
    list: Array as () => Todo[],
  },
});
</script>
<style lang="scss">
.todo {
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-top: 32px;
  }
}
</style>
