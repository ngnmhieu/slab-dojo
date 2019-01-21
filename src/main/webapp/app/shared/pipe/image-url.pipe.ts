import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'imageUrl' })
export class ImageUrlPipe implements PipeTransform {
    transform(imageId: string | number, size: string, cacheBuster?: string): string {
        const cacheBusterParam = cacheBuster ? `&cacheBuster=${cacheBuster}` : '';
        return imageId ? `/api/images/${imageId}/content?size=${size}${cacheBusterParam}` : '';
    }
}
