export const convertDataColor = (c) => {
    const arr = [];
    const e = c.split('@');
    for (let i of e) {
        const a = i.split('|');
        const o = {
            color: a[0],
            from: Number(a[1].split('_')[0]),
            to: Number(a[1].split('_')[1]),
            note: a[2],
        };
        arr.push(o);
    }
    return arr;
};
