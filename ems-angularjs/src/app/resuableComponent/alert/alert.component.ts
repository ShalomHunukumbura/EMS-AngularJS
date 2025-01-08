import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
    @Input() alertType: string = '';
    @Input() alertMessage: string = '';
}
