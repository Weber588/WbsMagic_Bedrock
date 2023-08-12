export class TypeUtil {
    private constructor() {};

    public static is<T>(check: T | any, ...elements: string[]): check is T {
        return undefined !== elements.find((element: string) => {
            return typeof check[element] !== 'undefined'
        });
    }
}