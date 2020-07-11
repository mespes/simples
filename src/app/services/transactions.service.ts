import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private readonly apiUrl = `
    https://api.tzstats.com/tables/op?columns=row_id,time,sender,receiver,volume,is_success&type=transaction&limit=10
  `;

  constructor(private httpClient: HttpClient) { }

  getTransactions() {
    return this.httpClient
      .get(this.apiUrl)
      .pipe(
        map((transactions: Array<any>) => 
          transactions.map(transaction => ({
            rowId: transaction[0],
            date: new Date(transaction[1]),
            sender: transaction[2],
            receiver: transaction[3],
            amount: transaction[4],
            isSuccessful: !!transaction[5]
          }))
        )
      );
  }
}
