
import { Component, OnInit } from '@angular/core';



interface Emp {  
  firstName: string;  
  lastName: string;  
  age: number;  
  joinedDate: Date;
}



const EMPLOYEES: Emp[] = [
 {
     firstName: 'John',
     lastName: 'Ripper',
     age: 47,
     joinedDate: new Date('November 16, 2020')
 },

 {
     firstName: 'Ana',
     lastName: 'Karenina',
     age: 22,
     joinedDate: new Date('March 25, 2019')
 },

 {
     firstName: 'Alan',
     lastName: 'Pikard',
     age: 33,
     joinedDate: new Date('April 11, 2018')
 }
];


// ******************************************************************************************************

const headerFields: string[] = ['First Name','Last Name', 'Age', 'Date Joined'];
const fieldsNames: string[] = ['firstName','lastName', 'age', 'joinedDate'];
const arrDirections = ['asc', 'desc', ''] ;

// IT Works: Union type with predefined literal values from array const //Angular version 3.4 and onwards
type SortDirection = typeof arrDirections[0] | typeof arrDirections[1] | typeof arrDirections[2]; 

//const rotatedirection: {[key in SortDirection]: SortDirection} = { asc: 'desc', desc: '', '': 'asc' };
const rotate: {[key in SortDirection]: SortDirection} = { asc: arrDirections[1], desc: '', '': arrDirections[0] };





@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})

export class MyTableComponent implements OnInit {

  public empls: Emp[] = [];
  public hfs: string[] = headerFields;
  public fns: string[] = fieldsNames;
  public hfsd: string[] = ['','','',''];


  private direction!: SortDirection; // Initial is 'asc'--> ascending order,   ''' --> not ordered
  private namesArr: string[] = [];
  constructor() { }

  ngOnInit(): void {

    this.empls = EMPLOYEES;  
    this.direction = arrDirections[0]

  }

  onSort(column: string) {
    this.setSortIndication(column);
    this.empls = this.sort(EMPLOYEES, column, this.direction);
  }


  sort(inEmpls: Emp[], field: string, direction: SortDirection): Emp[] {
  
    let sortedEmployees: Emp[] = [];
    if (direction === '') {
      sortedEmployees = inEmpls; 
    } else {
       if (direction === arrDirections[1]) {
          sortedEmployees = [...inEmpls].sort((a,b) => (a[field as keyof Emp] < b[field as keyof Emp] ? 1 : -1)); 	
       } else {
          sortedEmployees = [...inEmpls].sort((a,b) => (a[field as keyof Emp] < b[field as keyof Emp] ? -1 : 1));
       }
    }
    this.direction = rotate[this.direction];
    return sortedEmployees; 
  }	


  setSortIndication(col: string):void{

    for (var i in this.hfs) {
      if (col === this.fns[i]) {
        this.hfsd[i] = (this.direction === '') ? '' : '[' + this.direction + ']';
      }else {
        this.hfsd[i] = '';
      }
    }

  }

}
