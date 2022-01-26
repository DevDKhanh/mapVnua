/*---------- Types ----------*/
export const INC_H = 'overimage/inc-h';
export const DEC_H = 'overimage/dec-h';
export const INC_W = 'overimage/inc-w';
export const DEC_W = 'overimage/dec-w';

/*---------- Actions ----------*/
export const overImageIncSize = (type) => {
    if (type === 'h') {
        return { type: INC_H };
    }
    return { type: INC_W };
};

export const overImageDecSize = (type) => {
    if (type === 'h') {
        return { type: DEC_H };
    }
    return { type: DEC_W };
};
