import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesCrudService {

  // Verificar o CORS para permitir a leitura da API de domínio diferente
  // Usa-se um proxy para "igualar" os domínios
  // Ver o arquivo proxy.conf.js

  private readonly API = 'api/courses';

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

  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

}
