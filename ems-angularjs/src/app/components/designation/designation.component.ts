import { Component,inject,OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { APIResponse, IDesignation } from '../../model/interface/roles';
@Component({
  selector: 'app-designation',
  imports: [],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent implements OnInit {

  designationList: IDesignation[] = [];
  isLoader = true;
  masterService = inject(MasterService)

  ngOnInit(): void {
    this.masterService.getDesignations().subscribe((result:APIResponse)=>{
      this.designationList = result.data;
      this.isLoader = false;
    },error=>{
      alert(error.message);
      this.isLoader = false;
    })
  }
}
