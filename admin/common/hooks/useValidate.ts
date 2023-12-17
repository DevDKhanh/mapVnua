export const useValidateAll = (form: any) => {
  let c: Array<boolean> = [];

  for (let i in form) {
    if (["titleDetail", "dataIcon", "keyColor", "typeColor"].includes(i)) {
      c.push(true);
    } else if (!!form[i]?.trim && form[i]?.trim() === "") {
      c.push(false);
    } else if (!form[i]) {
      c.push(false);
    } else {
      c.push(true);
    }
  }

  return !c.some((i) => i === false);
};
