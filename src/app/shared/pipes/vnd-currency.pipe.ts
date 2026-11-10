import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vndCurrency',
  standalone: true
})
export class VndCurrencyPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    if (value == null) return '0 đ';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '0 đ';
    return new Intl.NumberFormat('vi-VN').format(num) + ' đ';
  }
}
