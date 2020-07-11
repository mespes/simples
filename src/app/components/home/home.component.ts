import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Transaction } from '../../models/transaction.model';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  transactions: Transaction[] = [];

  constructor(
    private transactionsService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.transactionsService.getTransactions()
      .pipe(
        tap(trans => console.log(trans))
      )
      .subscribe((trans: any) => this.transactions = trans);
  }
}
