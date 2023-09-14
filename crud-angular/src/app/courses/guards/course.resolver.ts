// import { ResolveFn, ActivatedRoute } from '@angular/router';
// import { CoursesCrudService } from '../services/courses-crud.service';


// export const courseResolver: ResolveFn<boolean> = (route, state) => {

//   if (route.params && route.params['id']) {
//     return true
//   }


//   return true;
// };

import { Injectable } from '@angular/core';
import { Resolve,
         RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CoursesCrudService } from '../services/courses-crud.service';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})

export class CourseResolver implements Resolve<Course> {

  constructor(private service: CoursesCrudService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    if (route?.params['id']) {
      // antes tava (route.params && route.params['id'])
      // deixando 'route?' ele já checa se existe rota
      return this.service.loadById(route.params['id']);
    }
    return of({_id: '', name: '', category: ''});

  }
}


