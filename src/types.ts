export interface Todo {
  text: String,
  isCompleted: Boolean,
  id:String
}
export interface Filter {
	name: String, 
	type: String, 
	isActive: Boolean, 
	isShowed: Boolean,
	category: String
}