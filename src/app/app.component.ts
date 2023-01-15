import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPerson } from './models/person.model';
import { Todo } from './models/todo.model';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todoTitle: string = '';
  todos: Todo[] = [];
  blockSync: boolean = false;
  sync: number = 0;
  loading: boolean = false;
  syncTodosInterval: NodeJS.Timer;
  timeOut: NodeJS.Timeout;
  error: string = ""
  people: IPerson[] = []
  stream = true
  streamData:any
  form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    birth_year: new FormControl('', [
      Validators.required
    ])
  })
  constructor(private http: HttpClient, private todosService: TodosService) {}

  ngOnInit() {
    this.fetchTodos();
    // this.getPeople()
    // this.syncTodosInterval = setInterval(() => {
    //   this.syncTodos();
    // }, 2000);
  }

  setValue(event:string) {
    console.log(event ,"event")
    this.streamData = event
  }

  addTodo() {
    this.blockSync = true;
    if (!this.todoTitle.trim()) return;

    const newTodo = {
      title: this.todoTitle,
      completed: false,
    };

    this.todoTitle = '';

    this.todosService.addTodo(newTodo).subscribe((todo) => {
      // this.fetchTodos()
      this.todos.push(todo);
      clearTimeout(this.timeOut)
      this.timeOut = setTimeout(()=>{
        this.blockSync = false;
      },2000)
       
    });
  }

  fetchTodos() {
    this.loading = true;
    this.todosService.fetchTodos().subscribe((todos) => {
      console.log(todos);
      this.loading = false;
      this.todos = todos;
      this.error = ""
    },
    (error) => {
      this.error = error.message
      console.log(error)
    });
  }

  completeTodo(id: number) {
    console.log(this.todos)
    this.todosService.completeTodo(id)
    .subscribe( () =>
      this.todos[id-1].completed = true
    )

    console.log(this.todos, id)
  }

  syncTodos() {
    if (this.blockSync) return;
    this.todosService.fetchTodos().subscribe((todos) => {
      console.log(todos);

      if (JSON.stringify(this.todos) !== JSON.stringify(todos) && !this.blockSync) {
        this.todos = todos;
      }
    });
  }

  removeTodo(id: number) {
    this.blockSync = true;
    this.todosService.removeTodo(id).subscribe(() => {
      // this.fetchTodos()
      this.todos = this.todos.filter((todo) => todo.id !== id);
      clearTimeout(this.timeOut)
      this.timeOut = setTimeout(()=>{
        this.blockSync = false;
      },2000)
    });
  }

  getPeople() {
    this.http.get<any>(`https://swapi.dev/api/people`)
    .subscribe(
      res => {
       console.log(res)
       this.people = res.results
      }
    )
  }

  submit() {
    this.people.push({...this.form.value})
    this.form.reset()
  }

}
