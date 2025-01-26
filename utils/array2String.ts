export const array2String = (str: string | string[] | undefined) => {

    if(typeof str === "undefined") return ""

    let result = str;

    if (Array.isArray(result)) result = result[0]

    return result;
}