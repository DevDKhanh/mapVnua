export const useValidateAll = (form: any) => {
    let c: Array<boolean> = [];

    for (let i in form) {
        if (!!form[i]?.trim && form[i]?.trim() === '') {
            c.push(false);
        } else if (!form[i]) {
            c.push(false);
        } else {
            c.push(true);
        }
    }

    return !c.some((i) => i === false);
};
