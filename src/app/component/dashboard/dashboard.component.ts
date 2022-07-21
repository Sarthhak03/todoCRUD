import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObject : Task = new Task();
  public taskArray : any = [];
  public addtaskValue : string = '';
  public editTaskValue : string = '';

  constructor(private crudService :CrudService ) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addtaskValue = '';
    this.taskObject = new Task();
    this.taskArray = [];
    this.getAllTasks();
  }

  getAllTasks(){
    this.crudService.getTask().subscribe(res => {
      this.taskArray = res;
    }, err => {
      alert('Unable to get the list');
    })
  }

  addTask(){
    this.taskObject.task_name = this.addtaskValue
    this.crudService.addTask(this.taskObject).subscribe( (res) => {
      this.ngOnInit();
      this.addtaskValue = '';
    },
    (err) => {
      alert(err);
    })
  }

  editTask(){
    this.taskObject.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObject).subscribe(res => {
      this.ngOnInit();
    },err => {
      alert('Failed to update task')
    })
  }

  deleteTask(task:Task){
    this.crudService.deleteTask(task).subscribe(res => {
      this.ngOnInit();
    },err => {
      alert("Failed to delete");
    })
  }

  call(task : Task){
    this.taskObject = task;
    this.editTaskValue = task.task_name;
  }

}
