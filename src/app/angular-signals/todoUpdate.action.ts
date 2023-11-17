import {ChangeDetectionStrategy, Component, effect} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Todo, TodoService} from "./TodoService";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'update-action',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input type="text" [(ngModel)]="title" name="title"/>
    <input type="checkbox" [(ngModel)]="completed" name="completed"/>
    <button (click)="edit()">Edit</button>
  `
})

export class TodoUpdateAction {
  id: number;
  title: string;
  completed: boolean;

  constructor(
    activatedRoute: ActivatedRoute,
    private todoService: TodoService
  ) {
    const params = toSignal(activatedRoute.params);
    effect(() => {
      const todo = decide<Todo>(params()?.data);
      this.id = todo.id;
      this.title = todo.title
      this.completed = todo.completed;
    });
  }

  async edit() {
    await this.todoService.updateTodo(this.id, {
      title: this.title,
      completed: this.completed,
    });
  }
}
