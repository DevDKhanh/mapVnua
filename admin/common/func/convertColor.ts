interface Item {
    color: any;
    from: any;
    to: any;
    note: any;
}

interface Item2 {
    color: any;
    value: any;
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

export const getColor2 = (c: string): Array<Item2> => {
    const arr: Array<Item2> = [];
    const e = c.split('@');
    for (let i of e) {
        const a = i.split('|');
        const o: Item2 = {
            color: a[0] || '',
            value: a[1] || '',
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

export const convertColorToString2 = (arr: Array<Item2>): string => {
    const newValue = arr.map((v) => {
        return `${v.color}|${v.value}|${v.note}`;
    });
    return newValue.join('@');
};

export function stringToColour(str: any) {
    var hash = 0;
    if (str) {
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xff;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}
