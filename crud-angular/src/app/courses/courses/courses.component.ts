import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesCrudService } from '../services/courses-crud.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  // Também é possível inicializar a variável dentro do construtor com this.courses = []
  // O símbolo $ na variável indica que ela é um Observable.
  courses$: Observable<Course[]>;
  displayedColumns = ['_id', 'name', 'category', 'actions'];

  // Construtor inicializa a variável coursesService com um serviço importado, onde
  // ocorrerá a leitura dos dados.
  constructor(
    private coursesService: CoursesCrudService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar os cursos disponíveis.');
        return of([]);
      })
    );
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route}) // Muda a rota da página atual para courses/new | relativeTo + this.route adiciona a rota atual da página 
  }
}
