<template>
  <div class="todo-info">
		<div class="todo-info__total">
			{{tasksAmount}}
			{{tasksAmount === 1 ? 'task' : tasksAmount.toString().split("")[tasksAmount.toString().length - 1] === "1" && tasksAmount > 11 ? 'task' : "tasks"}}
		</div>
		<div class="todo-info__title">{{blockName}}</div>
		<div class="todo-info__progress">
			<div class="todo-info__scale" :style="'width: ' + (tasksAmount*100/totalTasks === 0 ? '1' : tasksAmount*100/totalTasks) + '%;' + 'background: ' + (color ? color : '#5D5FEF')"></div>
		</div>
	</div>
</template>
<script lang="ts">
import {defineComponent } from "vue";

export default defineComponent ({
  name: "InfoBlock",
  props: {
    blockName: {type: String, required: true},
    tasksAmount: {type: Number, required: true},
		totalTasks: {type: Number, required: true},
		color: String
  },
  data() {
    return {
			
		}
  },
	methods: {
	}
})
</script>
<style lang="scss">
  @import "../assets/style/variables";
	.todo {
		&-info {
			background: rgba(32, 36, 39, 0.05);
			border-radius: .5rem;
			padding: 1rem;
			&__total {
				font-size: 12px;
				line-height: 1.33;
				color: $color-black;
				opacity: .5;
				font-weight: 600;
			}
			&__title {
				font-size: 14px;
				line-height: 1.2;
				letter-spacing: -0.02em;
				color: $color-black;
				margin-top: 4px;
				font-weight: 700;
			}
			&__progress {
				width: 100%;
				background: rgba(32, 36, 39, 0.07);
				height: 4px;
				position: relative;
				margin-top: 12px;
				border-radius: 8px;
			}
			&__scale {
				transition: .5s all;
				height: 100%;
				position: absolute;
				border-radius: 8px;
				top: 0;
				left: 0;
			}

		}
	}
</style>