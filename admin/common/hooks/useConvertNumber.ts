export const useConvertNumber = (i: any) => {
    if (Math.abs(i) < 10) {
        i = '0' + i;
    }
    return i;
};
