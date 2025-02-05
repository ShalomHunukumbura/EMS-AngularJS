import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponse } from '../../model/interface/roles';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AlertComponent } from "../../resuableComponent/alert/alert.component";
import { MyButtonComponent } from "../../resuableComponent/my-button/my-button.component";

@Component({
  selector: 'app-client',
  imports: [FormsModule, UpperCasePipe, AsyncPipe, AlertComponent, MyButtonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  clientObj: Client = new Client();
  clientList: Client[] = [];

  clientService = inject(ClientService);

  userList$ : Observable<any> = new Observable<any>

ngOnInit(): void {
  this.loadClient(); 
  this.userList$ = this.clientService.getAllUser();
}

loadClient(){
  this.clientService.getAllClients().subscribe((res:APIResponse)=>{
    this.clientList = res.data;
  })
}

onSaveClient(){
  
  this.clientService.addUpdate(this.clientObj).subscribe((res:APIResponse)=>{
    if(res.result){
      alert("client added successfully");
      this.loadClient();
      this.clientObj = new Client();
    } else {
      alert("client not added");
    }

  })
}

onEdit(data: Client){
  this.clientObj = data;
  

}

onDelete(Id: number){
  const isDelete = confirm("Do you want to delete this client?");
  if(isDelete){
    console.log("delete client", Id);
    
    this.clientService.deleteClientById(Id).subscribe({
  next: (res: APIResponse) => {
    if (res.result) {
      alert("Client deleted successfully");
      this.loadClient();
    } else {
      alert("Client not deleted");
    }
  },
  error: (err) => {
    console.error("Error deleting client:", err);
    alert("An error occurred while deleting the client. Please try again.");
  },
});

  
}

}}
