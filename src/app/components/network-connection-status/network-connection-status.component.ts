import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-network-connection-status',
  templateUrl: './network-connection-status.component.html',
  styleUrls: ['./network-connection-status.component.css']
})
export class NetworkConnectionStatusComponent implements OnInit {

  public netStatus: string;

  constructor() { }

  ngOnInit(): void {

    fromEvent(window, 'offline').pipe(
      debounceTime(100)).subscribe((event:Event) => {
        console.log(event);
        this.netStatus = event.type;
      });
    
    fromEvent(window, 'online').pipe(
      debounceTime(100)).subscribe((event:Event) => {
        console.log(event);
        this.netStatus = event.type;
      });


  }

}
