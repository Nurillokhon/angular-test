import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from '../../../core/service/order.service';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface CreateOrderModalData {
  onCreated?: () => void;
}

@Component({
  standalone: true,
  selector: 'app-create-order',
  templateUrl: './createOrder.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class CreateOrderComponent {
  createOrderForm: FormGroup;
  submitting = false;
  statusOptions = ['NEW', 'MODERATION', 'ACTIVE'];

  constructor(
    private orderService: OrdersService,
    public modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: CreateOrderModalData = {},
  ) {
    this.createOrderForm = new FormGroup({
      from: new FormControl('', [Validators.required]),
      to: new FormControl('', [Validators.required]),
      weight: new FormControl<number | null>(null, [Validators.required]),
      price: new FormControl<number | null>(null, [Validators.required]),
      status: new FormControl('NEW', [Validators.required]),
      senderId: new FormControl<number | null>(1, [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.createOrderForm.invalid || this.submitting) return;
    this.submitting = true;
    const value = this.createOrderForm.value;
    this.orderService
      .createOrder({
        from: value.from,
        to: value.to,
        weight: Number(value.weight),
        price: Number(value.price),
        status: value.status,
        senderId: Number(value.senderId),
      })
      .subscribe({
        next: () => {
          this.data.onCreated?.();
          this.modalRef.close();
        },
        error: (err) => {
          console.error('Create order failed:', err);
          this.submitting = false;
        },
      });
  }
}
