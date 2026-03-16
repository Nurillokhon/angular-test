import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../../core/service/order.service';

@Component({
  standalone: true,
  selector: 'app-order',
  templateUrl: './order.html',
  imports: [CommonModule],
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  loading: boolean = false;

  constructor(
    private orderService: OrdersService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.loading = true;

    this.orderService.getOrders().subscribe({
      next: (res: any) => {
        console.log('response keldi:', res);
        this.orders = res.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('API error:', err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
    console.log(this.loading);
  }
}
