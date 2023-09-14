import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';
import { delay, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesCrudService {
  // Verificar o CORS para permitir a leitura da API de domínio diferente
  // Usa-se um proxy para "igualar" os domínios
  // Ver o arquivo proxy.conf.js

  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) {}

  // O uso do método GET com o parâmetro array de Cursos passado gera um Observable.
  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(),
      delay(500)
    );
  }

  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save(record: Partial<Course>) {
    //console.log(record);
    if (record._id) {
      //console.log('update');
      return this.update(record);
    }
    //console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>) {
    return this.httpClient
      .put<Course>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }
}
