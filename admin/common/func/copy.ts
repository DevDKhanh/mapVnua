import { toast } from 'react-toastify';

export function copy(text: string) {
    var input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    toast.info('Đã sao chép');
    return result;
}
