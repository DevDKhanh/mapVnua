interface Item {
    color: any;
    from: any;
    to: any;
    note: any;
}

export const getColor = (c: string): Array<Item> => {
    const arr: Array<Item> = [];
    const e = c.split('@');
    for (let i of e) {
        const a = i.split('|');
        const o: Item = {
            color: a[0] || '',
            from: Number(a[1].split('_')[0]) || '',
            to: Number(a[1].split('_')[1]) || '',
            note: a[2] || '',
        };
        arr.push(o);
    }
    return arr;
};

export const convertColorToString = (arr: Array<Item>): string => {
    const newValue = arr.map((v) => {
        return `${v.color}|${v.from}_${v.to}|${v.note}`;
    });
    return newValue.join('@');
};
