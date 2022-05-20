<template>
  <li :class="isCompleted ? 'task checked' : 'task'">
    <button class="task__drag" v-if="isDraggable">
      <img src="../assets/dots.svg" alt="drag-dots">
    </button>
    <label class="fake">
      <input type="checkbox" :checked="isCompleted" @input="checkTask" />
      <span class="fake-checkbox"></span>
    </label>
    <form class="task__form" @submit="editTask">
      <input
        type="text"
        :disabled="isDisabled ? true : false"
        class="task__input"
        v-model="inputData"
        ref="input"
        :key="id"
      />
      <button class="task__submit" v-if="!isDisabled">
        <img src="../assets/submit.svg" alt="submit-btn" />
      </button>
    </form>
    <button class="task__reset" v-if="!isDisabled" @click="resetForm">✕</button>
    <button class="task__edit" @click="removeDisabled" v-if="isDisabled">
      <img src="../assets/pencil.svg" alt="edit-btn" />
    </button>
    <button class="task__remove" @click="removeTask">
      <img src="../assets/bin.svg" alt="remove-btn" />
    </button>
  </li>
</template>
<script lang="ts">
import { defineComponent } from "vue";

interface data {
  isDisabled: boolean;
  inputData: string;
  currentText: string;
}

export default defineComponent({
  name: "TodoTask",
  props: {
    text: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
    id: { type: String, required: true },
    isDraggable: {type: Boolean, required: true}
  },
  data(): data {
    return {
      isDisabled: true,
      inputData: this.text,
      currentText: "",
    };
  },
  methods: {
    checkTask(e: Event): void {
      if ((e.target as HTMLInputElement).checked) {
        this.$emit("check-item", this.id, true);
      } else {
        this.$emit("check-item", this.id, false);
      }
    },
    removeTask(): void {
      this.$emit("remove-item", this.id);
    },
    removeDisabled(): void {
      this.isDisabled = false;
      this.currentText = this.inputData;
      if (!this.isDisabled) {
        this.$nextTick(() => (this.$refs.input as HTMLInputElement).focus());
      }
    },
    editTask(e: Event): void {
      e.preventDefault();
      (this.$refs.input as HTMLInputElement).blur();
      this.$emit("edit-item", this.id, this.inputData);
      this.isDisabled = true;
    },
    resetForm(): void {
      this.inputData = this.currentText;
      this.isDisabled = true;
    },
  },
});
</script>
<style lang="scss">
@import "../assets/style/variables";
.task {
  display: flex;
  column-gap: 10px;
  align-items: center;
  width: 100%;
  padding: 0 12px 0 24px;
  position: relative;
  & + & {
    margin-top: 20px;
  }
  &.checked {
    .task__input {
      opacity: 0.5;
    }
  }
  &:hover {
    .task__drag {
      opacity: 1;
      visibility: visible;
    }
  }
  &__drag {
    position: absolute;
    left: 0;
    top: 50%;
    opacity: 0;
    transition: .5s all;
    visibility: hidden;
    transform: translateY(-50%);
  }
  &__edit,
  &__remove,
  &__submit,
  &__reset,
  &__drag {
    background: none;
    border: none;
    cursor: pointer;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
    }
    font-weight: 700;
  }
  &__form {
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 10px;
  }

  &__input {
    font-size: 14px;
    line-height: 1.14;
    background: none;
    color: $color-black;
    width: 100%;
    &[disabled] {
      border-color: transparent;
    }
    &:focus {
      outline: none;
      border-color: $color-blue;
    }
  }
}
.fake {
  flex-shrink: 0;
  input {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    width: 0;
    height: 0;
    &:checked {
      & ~ .fake-checkbox {
        background: $color-blue;
        border-color: $color-blue;
        &::after {
          display: block;
        }
      }
    }
  }
  &-checkbox {
    width: 16px;
    height: 16px;
    border: 2px solid #c7ccd1;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:after {
      content: url("../assets/checkmark.svg");
      display: none;
    }
  }
}
</style>
