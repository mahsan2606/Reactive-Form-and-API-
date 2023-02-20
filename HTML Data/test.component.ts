import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { EmployeeModel } from './test-employee.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  formValue !: FormGroup
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  
  constructor (private formBuilder: FormBuilder, private api: ApiService) {

  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id : [''],
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    })
    this.getAllEmployee();
  }

  onclickAdd(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;

  }

  postEmployeeDetails(){
    this.employeeModelObj.id = this.formValue.value.id;
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully");
      this.formValue.reset();
      let ref = document.getElementById('cancel')
      ref?.click();
      this.getAllEmployee();
    })
  }

  getAllEmployee(){
   this.api.getEmployee()
   .subscribe(res=>{
  this.employeeData = res;  
 })
  }

deleteEmployee(row: any){
  this.api.deleteEmployee(row.id)
  .subscribe(res=>{
    alert('Employee Deleted Successfully')
    this.getAllEmployee();
  })
}

onEdit(row:any){
  this.showAdd = false;
  this.showUpdate = true;
  this.employeeModelObj.id = row.id;
  this.formValue.controls['id'].setValue(row.id);
  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['lastName'].setValue(row.lastName);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['mobile'].setValue(row.mobile);
  this.formValue.controls['salary'].setValue(row.salary);
}

updateEmployeeDetails(){
  this.employeeModelObj.id = this.formValue.value.id;
  this.employeeModelObj.firstName = this.formValue.value.firstName;
  this.employeeModelObj.lastName = this.formValue.value.lastName;
  this.employeeModelObj.email = this.formValue.value.email;
  this.employeeModelObj.mobile = this.formValue.value.mobile;
  this.employeeModelObj.salary = this.formValue.value.salary;  

  this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
  .subscribe(res=>{
    alert("Updated Successfully");
    this.formValue.reset();
    let ref = document.getElementById('cancel')
    ref?.click();
    this.getAllEmployee();
  })
}
}
