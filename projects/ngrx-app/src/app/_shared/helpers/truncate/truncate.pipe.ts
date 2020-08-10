/* Pipe should be declared in the declaration array in somewhat module in order to be applied */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
	transform(value: string, limit?: number): string {
		return Array.from(value).length > limit
			? `${value.substring(0, limit)}...`
			: value;
	}
}
