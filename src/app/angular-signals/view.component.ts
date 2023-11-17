import {ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, signal} from "@angular/core";
import {Todo, TodoService} from "./TodoService";

@Component({
  selector: 'todos-views',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="!isLoading; else loadingIndicator" class="main">
      {{ todos() | json }}
      <button type="button" (click)="reload()">Reload</button>
    </div>
    <ng-template #loadingIndicator>loading...</ng-template>
  `,
})

export class TodosView {
  constructor(private todoService: TodoService,
              private userService: UserService) {
    effect(
      () => {
        const _ = this.trigger();
        this.isLoading.set(true);
        this.todoService.contentChanged();
        this.userService.contentChanged();
      },
      {allowSignalWrites: true}
    );

    effect(
      () => {
        const todos = this.todoService.getTodos()();
        const users = this.userService.getAllUsers()();

        if (!todos || !users) {
          this.isLoading.set(false);
          this.todos.set([]);
          return;
        }

        const result = todos.map<AugmentedTodo>((t) => {
          const user = users.find((u) => u.id === t.userId)!;
          return {
            id: t.id!,
            completed: t.completed,
            title: t.title,
            username: user.username,
          };
        })
          .slice(0, 10);

        this.isLoading = false;
        this.todos.set(result);
      },
      { allowSignalWrites: true}
    );
  }

  todos: Signal<AugmentedTodo[]>([]);
  trigger = signal(createGuid());
  isLoading = signal(true);

  reload() {
    this.trigger.set(createGuid())
  }
}

export interface AugmentedTodo {
  id: number;
  username: string;
  title: string;
  completed: boolean
}
