type Method<T> = (state: T, event: Event) => T

interface StartParameters<T> {
    state?: T,
    methods?: Record<string, Method<T>>
}

const start = <T>(parameters: StartParameters<T>) => console.log("App is starting.");

export {
    start
};
