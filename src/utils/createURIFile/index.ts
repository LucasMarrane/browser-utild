import { MimeTypes } from '../mimeTypes';

export function createURIFile(type: MimeTypes = MimeTypes.TEXT_PLAIN, data: string = '') {
    return `data:${type};${encodeURIComponent(data)}`;
}
