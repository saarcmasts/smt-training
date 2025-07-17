import { Component, computed, effect, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
interface Student {
  name: string;
  age: number;
  course: string;
}
@Component({
  selector: 'app-list',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {
  form: FormGroup;

  student_list:WritableSignal<Student[]> = signal([]);

  name: WritableSignal<string> = signal('');
  age = signal(0);
  course = signal('');
  // student_count = signal(this.student_list().length);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(1)]],
      course: ['', Validators.required]
    });
    // effect(() => {
    //   console.log('Student list changed:', this.student_list());
    // });

    // setTimeout(() => {
    //   this.student_list.update(list => [...list, {
    //     name: 'Bob Brown',
    //     age: 23,
    //     course: 'Chemistry'
    //   }]);

    // computed(() => {
    //   this.student_count.set(this.student_list().length);
    // });
    // }, 5000);

    // You can initialize or manipulate the student_list signal here if needed
  }

  addStudent() {
    if (this.name() && this.age() > 0 && this.course()) {
      this.student_list.update(list => [...list, {
        name: this.name(),
        age: this.age(),
        course: this.course()
      }]);
      // Reset input fields
      this.name.set('');
      this.age.set(0);
      this.course.set('');
    } else {
      window.alert('Please fill in all fields correctly.');
    }
  }
  addStudentReactive() {
    if (this.form.valid) {
      this.student_list.update(list => [...list, {
        name: this.form.value.name,
        age: this.form.value.age,
        course: this.form.value.course
      }]);
      // Reset form fields
      this.form.reset();
    } else {
      window.alert('Please fill in all fields correctly.');
    }
  }
}
