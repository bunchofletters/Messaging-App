//path: src/utility/debounce.ts

export function debounce<T extends (...args: any[]) => void>
(func: T, delay: number): 
(...args: Parameters<T>) => void{
    let timeoutID: ReturnType<typeof setTimeout> |  undefined;
    return function (...args: Parameters<T>) {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
            func.apply(args);
        }, delay);
    };
}