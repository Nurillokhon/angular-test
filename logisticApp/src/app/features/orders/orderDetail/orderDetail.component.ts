import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { OrdersService } from '../../../core/service/order.service';
import { Order } from '../../../core/models/order.model';

export interface OrderDetailData {
  order: Order;
  onStatusChanged?: () => void;
}

@Component({
  standalone: true,
  selector: 'app-order-detail',
  templateUrl: './orderDetail.html',
  imports: [CommonModule],
})
export class OrderDetailComponent {
  statusOptions = ['NEW', 'MODERATION', 'ACTIVE'];

  get order() {
    return this.data.order;
  }

  constructor(
    @Inject(NZ_MODAL_DATA) public data: OrderDetailData,
    private orderService: OrdersService,
    private modalRef: NzModalRef,
  ) {}

  onStatusChange(newStatus: string): void {
    this.orderService.changeStatus(this.order.id, newStatus).subscribe({
      next: () => {
        this.data.order.status = newStatus as 'NEW' | 'MODERATION' | 'ACTIVE';
        this.data.onStatusChanged?.();
        this.modalRef.close();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
