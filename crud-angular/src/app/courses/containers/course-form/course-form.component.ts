import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { CoursesCrudService } from '../../services/courses-crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent {

  form = this.formBuilder.group({
    name: [''],
    category: ['']
  })

  constructor (
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesCrudService,
    private location: Location,
    private snackBar: MatSnackBar
    ) {
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

}
