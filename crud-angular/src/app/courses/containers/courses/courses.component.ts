import { Component } from '@angular/core';
import { Course } from '../../model/course';
import { CoursesCrudService } from '../../services/courses-crud.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  // Também é possível inicializar a variável dentro do construtor com this.courses = []
  // O símbolo $ na variável indica que ela é um Observable.
  courses$: Observable<Course[]> | null = null;
  displayedColumns = ['name', 'category', 'actions'];

  // Construtor inicializa a variável coursesService com um serviço importado, onde
  // ocorrerá a leitura dos dados.
  constructor(
    private coursesService: CoursesCrudService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.refreshContent();
  }

  refreshContent() {
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
    this.router.navigate(['new'], {relativeTo: this.route})
    // Muda a rota da página atual para courses/new | relativeTo + this.route adiciona a rota atual da página
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], {relativeTo: this.route})
  }

  onDelete(course: Course) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: 'Tem certeza que deseja remover este curso?',
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
        this.coursesService.delete(course._id).subscribe(
          () => {
            this.refreshContent();
            this.snackBar.open("Curso removido com sucesso!", '', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['on-success-snackbar']
            })
          },

          () => this.onError("Erro ao deletar o curso!")
        );
        }
      });
    }
  }

