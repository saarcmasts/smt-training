import { Component, computed, effect, ElementRef, signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HighlightDirective } from '../directives/highlight';
import { IfNotDirective } from '../directives/ifnot';
interface Student {
  name: string;
  age: number;
  course: string;
}
@Component({
  selector: 'app-list',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HighlightDirective, IfNotDirective],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {
  form: FormGroup;

  student_list: WritableSignal<Student[]> = signal([
    { name: 'John Doe', age: 20, course: 'Mathematics' },
    { name: 'Jane Smith', age: 22, course: 'Physics' },
    { name: 'Alice Johnson', age: 21, course: 'Biology' }
  ]);

  name: WritableSignal<string> = signal('');
  age = signal(0);
  isValid = signal(false);
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

  @ViewChild('nameElement') nameInput!: ElementRef;



  addStudent() {
    if (this.name() && this.age() > 0 && this.course()) {
      this.isValid.set(true);
      this.student_list.update(list => [...list, {
        name: this.name(),
        age: this.age(),
        course: this.course()
      }]);
      // Reset input fields
      this.nameInput.nativeElement.value = '';
    } else {
      window.alert('Please fill in all fields correctly.');
    }
  }
  setStyle() {
    return {
      'background-color': this.isValid() ? 'lightgreen' : "white",
      'border': this.isValid() ? '1px solid blue' : '1px solid',
      'padding': '10px',
      'border-radius': '5px'
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
