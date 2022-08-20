export const array2String = (str: string | string[]) => {

    let result = str;

    if (Array.isArray(result)) result = result[0]

    return result;
}