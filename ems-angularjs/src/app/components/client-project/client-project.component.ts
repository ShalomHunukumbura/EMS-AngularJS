import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponse, ClientProject, Employee } from '../../model/interface/roles';
import { Client } from '../../model/class/Client';
import { DatePipe } from '@angular/common';
import { AlertComponent } from "../../resuableComponent/alert/alert.component";

@Component({
  selector: 'app-client-project',
  imports: [ReactiveFormsModule, DatePipe, AlertComponent],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit {


  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl("", [Validators.required, Validators.minLength(4)]),
    startDate: new FormControl(""),
    expectedEndDate: new FormControl(""),
    leadByEmpId: new FormControl(0),
    completedDate: new FormControl(""),
    contactPerson: new FormControl(""),
    contactPersonContactNo: new FormControl(""),
    totalEmpWorking: new FormControl(0),
    projectCost: new FormControl(0),
    projectDetails: new FormControl(""),
    contactPersonEmailId: new FormControl(""),
    clientId: new FormControl(0)
  });

  clientSrv = inject(ClientService);
  employeeList: Employee[] = [];
  clientList: Client[] = [];
  projectList = signal<ClientProject[]> ([]);

  firstName = signal("Angular 18");

  ngOnInit(): void {
    const name = this.firstName()
    this.getAllClient();
    this.getAllEmployee();
    this.getAllClientProject();
  }

  changeFname() {
     this.firstName.set("React JS")
  }
  getAllEmployee() {
    this.clientSrv.getAllEmployee().subscribe((res: APIResponse) => {
      if (res.result) {
        this.employeeList = res.data;
      }
    });
  }
  getAllClientProject() {
    this.clientSrv.getAllClientProject().subscribe((res: APIResponse) => {
      
        this.projectList.set(res.data);
      
    });
  }

  getAllClient() {
    this.clientSrv.getAllClients().subscribe((res: APIResponse) => {
      if (res.result) {
        this.clientList = res.data;
      }
    });
  }

  /* onSaveProject() {
    const formValue = this.projectForm.value;
    debugger;
    this.clientSrv.addClientProjectUpdate(formValue).subscribe((res: APIResponse)=>{
      if(res.result){
        alert("project created succesfully "+res.message);
      } else {
        alert("project creation filed "+res.message);}
    })
} */

    onSaveProject() {
      const formValue = this.projectForm.value;
    
      // Format startDate and expectedDateEnd to the desired format
      const formattedData = {
        ...formValue,
        startDate: this.formatDateToISO(formValue.startDate),
        expectedDateEnd: this.formatDateToISO(formValue.expectedDateEnd),
      };
    
      debugger;
      this.clientSrv.addClientProjectUpdate(formattedData).subscribe((res: APIResponse) => {
        if (res.result) {
          alert("Project created successfully: " + res.message);
        } else {
          alert("Project creation failed: " + res.message);
        }
      });
    }
    
    // Helper function to format date to "YYYY-MM-DDT00:00:00"
    private formatDateToISO(date: string): string {
      if (!date) return '';
      return new Date(date).toISOString().split('T')[0] + 'T00:00:00';
    }
    
}