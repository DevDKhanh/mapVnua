export const useConvertDate = (date: string | number) => {
    const newDate = new Date(date);
    let h: any = newDate.getHours();
    let m: any = newDate.getMinutes();
    let s: any = newDate.getSeconds();
    let yyyy: any = newDate.getFullYear();
    let mm: any = newDate.getMonth() + 1;
    let dd: any = newDate.getDate();

    return {
        getDateInput() {
            return `${yyyy}-${checkTime(mm)}-${checkTime(dd)}`;
        },
        getDate() {
            return `${checkTime(dd)}/${checkTime(mm)}/${yyyy}`;
        },
        getTime() {
            return `${checkTime(h)}:${checkTime(m)}`;
        },
        getFullTime() {
            return `${checkTime(h)}:${checkTime(m)}:${checkTime(s)}`;
        },
    };
};

function checkTime(i: any) {
    if (Math.abs(i) < 10) {
        i = '0' + i;
    }
    return i;
}
