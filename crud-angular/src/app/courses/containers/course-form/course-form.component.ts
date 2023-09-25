import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { CoursesCrudService } from '../../services/courses-crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent {

  form = this.formBuilder.group({
    _id: [''],
    name: ['',
     [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]
  ],
    category: ['', [Validators.required]]
  })

  constructor (
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesCrudService,
    private location: Location,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
    ) {

      const course: Course = this.route.snapshot.data['course'];
      this.form.setValue({
        _id: course._id,
        name: course.name,
        category: course.category,
      })
      console.log(course);

  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError()
    });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open("Curso salvo com sucesso!", '', {
      duration: 2000,
      panelClass: ['on-success-snackbar']
    })

    this.onCancel();
  }

  private onError() {
    this.snackBar.open("Erro ao salvar curso.", '', {
      duration: 2000,
      panelClass: ['on-error-snackbar']
    })
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return "Campo obrigatório"
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Nome do curso precisa ter mais de ${requiredLength} caracteres`;
    }


    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Nome do curso não pode ter mais de ${requiredLength} caracteres`;
    }

    return "Campo inválido"
  }

}
