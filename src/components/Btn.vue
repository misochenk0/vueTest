<template>
  <button :class="'btn ' + btnClass + (isActive ? ' active' : '') + (isShowed ? '' : ' hidden') + (category ?  ' ' + category : '')" :disabled="isDisabled" @click="btnType ? pressBtn() : null">{{title}}</button>
</template>
<script lang="ts">
import {defineComponent } from "vue";
export default defineComponent ({
  name: "Btn",
  props: {
    title: String,
    btnClass: String,
    isDisabled: Boolean,
    btnType: String,
    isShowed: Boolean,
    isActive: Boolean,
    category: String
  },
  methods: {
    pressBtn():void {
      this.$emit("press-btn", this.btnType)
    }
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
    transition: .5s all;
    cursor: pointer;
    &.filter.hidden {
      display: none;
    }
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
    &_filter {
      padding: 8px 12px;
      background: none;
      &.active {
        background: $color-blue;
        color: #fff;
        cursor: default;
        &:hover {
          color: #fff;
        }
      }
      &.hidden {
        opacity: 0;
        pointer-events: none;
      }
      &:hover {
        color: $color-blue;
      }
    }
  }
</style>