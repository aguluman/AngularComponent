import {ChangeDetectorRef, Component, computed, effect, Signal, signal} from "@angular/core";

const mySignal = signal(myValue);
const myCurrentValueFromSignal = mySignal();
//using set keyword from signal.
mySignal.set(myNewValue);
//using the update keyword from signal
mySignal.update(oldValue => oldValue + 1);
//using the mutate keyword from signal.
myTodosSignal.mutate(todos => todos[7].done = true);

effect(async () => {
  const userValue = myUserSignal();
  if (userValue == undefined) {
    return;// early return
  }

  const posts = await fetch('https://api.github.com/users/' + userValue.id);
  this.posts = posts;
  changeDetectorRef.markForCheck();
});
@Component({
  selector: 'signal',
  template: `
      <my-child-component [value]="mySignal()"></my-child-component>
      <email-link [email]="myUserSignal()?.email"></email-link>
      <email-link [length]="myUserSignal() | getLength"></email-link>
  `,

})



export class SignalComponent {
  mySignal = signal(0);
  myUserSignal = signal({email: 'helpdesk@angular.com'});

   myLengthSignal = computed(() => {
    const userValue = this.myUserSignal();
    if (userValue == undefined) {
      return 0;
    }
    return userValue.email.length;
  });

   posts: Signal<Post[]>;
   constructor() {
     effect(async () => {
       const userValue = this.myUserSignal();
       if (userValue == undefined) {
         return; //early return
       }

       const posts = await fetch(`my.url/postsByUser/${userValue.id}`);
       this.posts.set(posts);
     }, {allowSignalWrites: true});
   }
}
