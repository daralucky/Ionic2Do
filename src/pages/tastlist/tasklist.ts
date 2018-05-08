import { Task } from './task';
import { Component } from '@angular/core';
import { NavController, ItemSliding } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html',
})
export class TaskListPage {
  tasksRef: AngularFireList<any>;
  tasks: Observable<Task[]>;
  constructor(public db: AngularFireDatabase, public navCtrl: NavController) {
    this.tasksRef = db.list('/tasks');
    //this.tasks = this.tasksRef.valueChanges();
    // Use snapshotChanges().map() to store the key
    this.tasks = this.tasksRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    //console.log(this.tasks);
  }

  addItem() {
    let theNewTask: string = prompt('New Task');
    if (theNewTask !== '') {
      this.tasksRef.push({ title: theNewTask, status: 'open' });
      const listObservable = this.tasksRef.snapshotChanges();
      listObservable.subscribe();
    }
  }

  markAsDone(slidingitem: ItemSliding, task: Task) {
    this.tasksRef.update(task.key, { status: 'done' });
    slidingitem.close();
  }

  removeTask(slidingitem: ItemSliding, task: Task) {
    this.tasksRef.remove(task.key);
    slidingitem.close();
  }
}
