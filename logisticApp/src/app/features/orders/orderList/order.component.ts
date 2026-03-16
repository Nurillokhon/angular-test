import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../../core/service/order.service';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { OrderDetailComponent } from '../orderDetail/orderDetail.component';
import { CreateOrderComponent } from '../CreateOrder/createOrder.component';
import { Order, OrdersResponse } from '../../../core/models/order.model';

@Component({
  standalone: true,
  selector: 'app-order',
  templateUrl: './order.html',
  imports: [CommonModule, NzModalModule],
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  loading: boolean = false;

  constructor(
    private orderService: OrdersService,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.loading = true;

    this.orderService.getOrders().subscribe({
      next: (res: OrdersResponse) => {
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
  }

  openCreateModal(): void {
    this.modal.create({
      nzTitle: 'Create Order',
      nzContent: CreateOrderComponent,
      nzData: { onCreated: () => this.getOrders() },
      nzFooter: null,
      nzWidth: 500,
    });
  }

  getOrderDetail(id: number) {
    this.orderService.getOrder(id).subscribe((res: any) => {
      const order = res.data || res;

      this.modal.create({
        nzTitle: `Order #${order.id}`,
        nzContent: OrderDetailComponent,
        nzData: {
          order,
          onStatusChanged: () => this.getOrders(),
        },
        nzFooter: null,
        nzWidth: 600,
      });
    });
  }
}
