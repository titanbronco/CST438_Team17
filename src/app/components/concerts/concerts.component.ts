import { element } from 'protractor';
import { Ticket } from './../../models/ticket';
import { TicketService } from './../../services/ticket.service';
import { HttpClient } from '@angular/common/http';
import { SquadMember } from './../../models/squad-member';
import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { SignInComponent } from './../signin/signin.component';
import { ObservableLike } from 'rxjs';
import { SignInService } from '../signin/signin.service';
import { SignIn } from '../signin/siginin';
import { SquaddataService } from '../../services/squaddata.service';
import { Router } from '@angular/router';
import { throwMatDuplicatedDrawerError } from '@angular/material';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.scss']
})


export class ConcertsComponent implements OnInit {
  public data: any = [];
  user: SignIn;
  checkname: Object;
  message: String;
  ticket$: Ticket[];
  cart$: TicketService[];
  amount: number[];
  options: number [];
  // constructor(private squadService: SquaddataService, private ticketService: TicketService) { }
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
  private app: SignInService, private http: HttpClient, private router: Router,
  private squadService: SquaddataService, private ticketService: TicketService) { }

  ngOnInit() {
    this.squadService.getData().subscribe(
      squadService => this.ticket$ = squadService
    );
    this.app.currentMessage.subscribe(message => this.message = message);
    if (this.message === 'x') {
      this.router.navigate(['../signin']);
    }
    this.user = this.app.passUser();
  }

  public createRange(num: number) {
    this.options = [];
    for (let i = 1; i <= num; i++) {
      this.options.push(i);
    }
    return this.options;
  }

  public addCart(product: Ticket, amount: number) {
    const inputElement = <HTMLInputElement> document.getElementById(product.artist);
    console.log(inputElement.value);
    amount = Number(inputElement.value);
    this.ticketService.addTicket(product, amount);
    this.ticketService.pushCart(amount);

  }

  public addTicket(product: Ticket) {
    this.ticketService.oneTicket(product);
  }

}
