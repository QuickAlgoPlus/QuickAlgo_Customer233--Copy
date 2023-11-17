import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { SessionServicesService } from '../session-services.service';
import { EmittService } from './emitt.service';
const signalRMsgPack = require("@microsoft/signalr-protocol-msgpack");

let connection = new signalR.HubConnectionBuilder()
    .withUrl("/chat")
    .withHubProtocol(new signalRMsgPack.MessagePackHubProtocol())
    .build();

@Injectable({
  providedIn: 'root'
})

export class SignalrService  {
  public hubConnection: any;
  

  constructor(public emittService: EmittService,private sessionService: SessionServicesService) { }
  public startConnection = () =>  {

    this.hubConnection = new signalR.HubConnectionBuilder()
    //.withUrl('https://autoquicksignals.azurewebsites.net/chathub',{
     .withUrl('https://socket.algoresponcetrading.in/chathub',{
        transport: signalR.HttpTransportType.LongPolling
      })
    .withAutomaticReconnect([0, 0, 0])
    .withHubProtocol(new signalRMsgPack.MessagePackHubProtocol())
    .build();
    
     this.hubConnection
      .start()
      .then()
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  public addTransferChart = (id:any) => {
    this.hubConnection.invoke('AddToGroup', id);

    this.hubConnection.on(id, (event,message) => {
      this.emittService.addsignalrDetail(message);
    });
  }

  public ordersignalr = (id:any) => {
    this.hubConnection.invoke('AddToGroup', id);

    this.hubConnection.on(id, (event,message) => {
      this.emittService.addordersignals(message);
      //'summary_'+
      //console.log(message);
    });
  }
  public username = (id:any) => {
    this.hubConnection.invoke('AddToGroup', id);

    this.hubConnection.on(id, (event,message) => {
      this.emittService.addusername(message);
      //'summary_'+
      //console.log(message);
    });
  }
  
}