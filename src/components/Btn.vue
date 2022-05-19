<template>
  <button :class="'btn ' + btnClass" :disabled="isDisabled">{{title}}</button>
</template>
<script>
import {defineComponent } from "vue";
export default defineComponent ({
  name: "Btn",
  props: {
    title: String,
    btnClass: String,
    isDisabled: Boolean
  }
})
</script>
<style lang="scss">
  @import "../assets/style/variables";
  .btn {
    border: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.23;
    padding: 11px 16px;
    cursor: pointer;
    &_form {
      margin-left: 16px;
      background: $color-blue;
      color: #fff;
      transition: .5s all;
      transform: translateX(100%);
      &:hover {
        opacity: .7;
      }
      &.active {
        transform: none;
      }
    }
  }
</style>