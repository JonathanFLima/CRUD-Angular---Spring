import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesCrudService } from '../services/courses-crud.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  // Também é possível inicializar a variável dentro do construtor com this.courses = []
  // O símbolo $ na variável indica que ela é um Observable.
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category'];

  // Construtor inicializa a variável coursesService com um serviço importado, onde
  // ocorrerá a leitura dos dados.
  constructor(
    private coursesService: CoursesCrudService,
    public dialog: MatDialog
  ) {
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError("Erro ao carregar os cursos disponíveis.");
        return of([]);
      })
    );
  }
  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }
}
