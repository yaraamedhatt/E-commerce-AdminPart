import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  @Input() data:any[]=[]
  @Input() title:string=""
  @Output() selectedVal = new EventEmitter()
  @Input() select = ''
  @Input() all:boolean = true;
  detectChanges(event:any){
    this.selectedVal.emit(event)
  }

}
