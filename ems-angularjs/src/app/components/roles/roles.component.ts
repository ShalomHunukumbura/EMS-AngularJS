import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResponse, IRole } from '../../model/interface/roles';
import { CommonModule } from '@angular/common';

@Component({ //component decorator: properties of the component
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})

export class RolesComponent implements OnInit {

  roleList: IRole [] = [];
  http = inject(HttpClient)


  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.http.get<APIResponse>("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles").subscribe((res:APIResponse) => {
      this.roleList = res.data;
    })
    
  }




























 /*  firstName: string = "Angular Turorial";
  angularVersion = 'version 18';
  angularVersionNumber: number = 18;
  currentDate: Date = new Date();
  
  showWelcomeAlert () {
    alert('Welcome to Angular Tutorial');
  }

  showMessage (message: string) {
    alert(message);

  }

 */



}

