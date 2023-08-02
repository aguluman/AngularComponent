import {SignalService} from "./SignalService";
import {Signal} from "@angular/core";

export class TodoService extends SignalService {
  getTodos(): Signal<Todo> {
    return  this.getObject<Todo>('/todos');
  }

  async addTodo(todo: Todo) {
    const result = await this.fetchService.post('/todos', todo);
    this.contentChanged();
    return result;
  }
}

export interface Todo {
  userId: number;
  id?: number;
  title: string;
  completed: boolean;
}
