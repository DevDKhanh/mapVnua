export const getColor = (
    c: string
): Array<{ color: string; from: number; to: number }> => {
    const arr: Array<{ color: string; from: number; to: number }> = [];
    const e = c.split(':');
    for (let i of e) {
        const a = i.split('|');
        const o: { color: string; from: number; to: number } = {
            color: a[0],
            from: Number(a[1].split('_')[0]),
            to: Number(a[1].split('_')[1]),
        };
        arr.push(o);
    }
    return arr;
};

export const convertColorToString = (
    arr: Array<{ color: string; from: number; to: number }>
): string => {
    const newValue = arr.map((v) => {
        return `${v.color}|${v.from}_${v.to}`;
    });
    return newValue.join(':');
};
