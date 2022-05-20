<template>
  <div :class="'todo__btns ' + (onlyAll ? 'only-all' : '')">
    <TodoBtn
      v-for="btn in filters"
      :key="btn.name"
      :title="btn.name"
      btnClass="btn_filter"
      :btnType="btn.type"
      :category="btn.category"
      :isShowed="btn.isShowed"
      :isActive="btn.isActive"
      @press-btn="useFilter"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import TodoBtn from "./TodoBtn.vue";

import type { Filter, Todo } from "../types";

import filtersData from "../data/filterData.json";

export default defineComponent({
  name: "TodoFilters",
  components: {
    TodoBtn,
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
  },
  data(): {
    filters: Filter[] | [];
    onlyAll: boolean;
    todoList: Todo[] | [];
    displayed: Todo[] | [];
    currentFilter: string;
  } {
    return {
      filters: filtersData,
      currentFilter: "show-all",
      onlyAll: false,
      displayed: this.displayedList,
      todoList: this.list,
    };
  },
  watch: {
    currentFilter: function () {
      this.filters = this.filters.map((item) => {
        if (item.type === this.currentFilter) {
          return {
            ...item,
            isActive: true,
          };
        } else {
          return {
            ...item,
            isActive: false,
          };
        }
      });
    },
    list: function () {
      this.displayed = this.todoList;
      this.filters = this.filters.map((item) => {
        if (item.type === "check-all") {
          this.currentFilter = "show-all";
          return {
            ...item,
            isShowed: this.list.some((item) => item.isCompleted === false),
          };
        }
        if (item.type === "clear-completed") {
          this.currentFilter = "show-all";
          return {
            ...item,
            isShowed: this.list.some((item) => item.isCompleted === true),
          };
        }
        if (item.type !== "show-all") {
          if (
            this.list.every((item) => item.isCompleted === true) ||
            this.list.every((item) => item.isCompleted === false)
          ) {
            this.onlyAll = true;
          } else {
            this.onlyAll = false;
          }
          return {
            ...item,
            isShowed:
              this.list.some((item) => item.isCompleted === true) &&
              !this.list.every((item) => item.isCompleted === true),
          };
        } else {
          return item;
        }
      });
    },
  },
  methods: {
    useFilter(type: string) {
      if (type === "check-all") {
        this.todoList = this.list.map((item) => {
          if (!item.isCompleted) {
            return {
              ...item,
              isCompleted: true,
            };
          }
          return item;
        });
      }
      if (type === "clear-completed") {
        this.todoList = this.list.filter((item) => {
          if (item.isCompleted) {
            return null;
          }
          return item;
        });
      }
      if (type === "show-all") {
        this.currentFilter = type;
        this.todoList = this.list;
      }

      if (type === "show-active") {
        this.currentFilter = type;
        this.displayed = this.list.filter((item) => {
          if (!item.isCompleted) {
            return item;
          }
          return null;
        });
        this.$emit("update-state", this.todoList, this.displayed);
        return;
      }
      if (type === "show-completed") {
        this.currentFilter = type;
        this.displayed = this.list.filter((item) => {
          if (item.isCompleted) {
            return item;
          }
          return null;
        });
        this.$emit("update-state", this.todoList, this.displayed);
        return;
      }
      this.$emit("update-state", this.todoList);
    },
  },
});
</script>
<style lang="scss">
.todo {
  &__btns {
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    position: relative;
    &.only-all {
      .filter.active {
        position: absolute;
        right: 50%;
        transform: translateX(50%);
      }
    }
  }
}
</style>
