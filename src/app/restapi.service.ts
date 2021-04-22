import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';


export interface Emp {
  id: number,  
  firstName: string;  
  lastName: string;  
  age: number;  
  joinedDate: Date;
}


export const EMPLOYEES: Emp[] = [
  {  
      id: 1,
      firstName: 'John',
      lastName: 'Ripper',
      age: 47,
      joinedDate: new Date('November 16, 2020')
  },
 
  {
      id: 2,
      firstName: 'Ana',
      lastName: 'Karenina',
      age: 22,
      joinedDate: new Date('March 25, 2019')
  },
 
  {
      id: 3,   
      firstName: 'Alan',
      lastName: 'Pikard',
      age: 33,
      joinedDate: new Date('April 11, 2018')
  }
 ];
 
 
 // ******************************************************************************************************
 
 export const headerFields: string[] = ['First Name','Last Name', 'Age', 'Date Joined'];
 export const fieldsNames: string[] = ['firstName','lastName', 'age', 'joinedDate'];

 
 








const URLendpointGet = 'http://www.test1.com/apis/employees/testempsapigetall.php/';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {


  constructor(private http: HttpClient) { }

  // Here is the definition of an Observable
  // It uses the generic 'handleError’ error handler
  // We pass to error handler the name of the observable function 
  // as well as an empty array type in case we get some results from the service   
  getEmployees(id?: number): Observable<any>{

    
    let  respObservable: Observable<any>; 
    
    let URLep: string = URLendpointGet;
    if (id !== undefined) {
      URLep =  URLep + '?id=' + id;
    }

    console.log("========----=========");
    console.log(URLep);
    console.log("========----=========");

    respObservable = this.http.get<Emp[]>(URLep)
    .pipe(catchError(this.handleError<Emp[]>('getEmployees',[])));
    
    //console.log(respObservable);
    return  respObservable;  

  }


  // Here is a generic error handler for an Observable.
  // It uses the 'of' RxJs operator, so we had to import it. 
  private handleError<T>(operation = 'operation', result?: T): any {
    let msg:string ="";
    return (error: any): Observable<T> => {
      console.error(error);
      this.restApiError(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
    
  }

  private restApiError(msg: string): any {
    alert(msg); 
    return throwError(
      'Something bad happened; please try again later.');
  }

}
