<template>
		<ul class="todo__list">
			<Task 
				v-for="task in displayedList" 
				:text="task.text" 
				:key="task.id" 
				:isCompleted="task.isCompleted"
				:id="task.id"
				@check-item="checkTodo"
				@remove-item="removeTodo"
				@edit-item="editTodo"
				/> 
		</ul>
</template>
<script lang="ts">
import {defineComponent } from "vue";
import Task from './Task.vue';
import type {Todo} from "../types";

export default defineComponent ({
  name: "TodoInfo",
	components: {
		Task
	},
	props: {
		displayedList: {
			type: Array as () => Todo[] | [],
			required: true
		},
		list: {
			type: Array as () => Todo[] | [],
			required: true
		}
	},
	data(): {todoList: Todo[] | []} {
		return {
			todoList: this.list
		}
	},
	watch: {
		todoList:function() {
			this.$emit("update-state", this.todoList)
		}
	},
	mounted() {
		this.todoList = [...this.list]
	},
	methods: {
		checkTodo(id:String, isChecked: Boolean):void {
      this.todoList = this.list.map(item => {
        if(item.id === id) {
          return {
            ...item,
            isCompleted: isChecked
          }
        } 
        return item
        
      })
    },
    removeTodo(id:String) {
      this.todoList = this.list.filter(item => {
        if(item.id === id) {
          return null
        }
        return item
      })
    },
    editTodo(id:String, text: String) {
      this.todoList = this.list.filter(item => {
        if(item.id === id) {
          return {
            ...item,
            text: text
          }
        }
        return item
      })
    },
	}
})
</script>
<style lang="scss">
	.todo {
		&__list {
      margin-top: 40px;
      height: 92px;
      overflow-y: auto;
    }
	}
</style>