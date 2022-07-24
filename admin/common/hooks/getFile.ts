import { toast } from 'react-toastify';
import uploadAPI from '../../api/upload';

const handleGetFile = async (
    data: any,
    token: string,
    type: 'image' | 'file' = 'image'
) => {
    try {
        if (typeof data === 'string') {
            return data;
        } else {
            const file: any = new FormData();
            file.append('file', data);

            /*---------- upload icon and get link icon ----------*/
            const [URL]: any = await uploadAPI.upload(type, file, token);
            return URL.filename;
        }
    } catch (err: any) {
        toast.error(err?.message || 'Thêm mới thất bại');
    }
};

export default handleGetFile;
