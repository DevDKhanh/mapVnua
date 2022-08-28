export function arrayMove(
    arr: Array<any>,
    oldIndex: number,
    newIndex: number
): Array<any> {
    if (newIndex >= arr.length) {
        var k = newIndex - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr; // for testing
}
