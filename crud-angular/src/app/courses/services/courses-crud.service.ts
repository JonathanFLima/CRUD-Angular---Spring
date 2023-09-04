import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesCrudService {

  private readonly API = '../../../assets/course.json';

  constructor(private httpClient: HttpClient) {

    }

    // O uso do método GET com o parâmetro array de Cursos passado gera um Observable.
  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(),
      delay(500),
      tap(courses => console.log(courses))
    );
  }

}
