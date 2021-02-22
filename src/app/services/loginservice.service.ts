import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';


const httpoption ={
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor ( private http: HttpClient) { 
  
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}
  
  public login(user :User): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/autheticate', user, httpoption)
    .pipe(map(User => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

 public logout() {
    localStorage.removeItem('currentUser');
}
}