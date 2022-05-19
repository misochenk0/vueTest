export interface Todo {
  text: string;
  isCompleted: boolean;
  id: string;
}
export interface Filter {
  name: string;
  type: string;
  isActive: boolean;
  isShowed: boolean;
  category: string;
}
