type State = Record<string, any>;
type Method<T> = (state: T, event?: Event, id?: string) => Promise<void>;
type Getter<T> = (state: T) => any;
type Condition<T> = (state: T) => boolean;
type List<T> = (state: T) => Array<Partial<T>>;
type AttributeGetter<T> = (state: T) => string | boolean | number | undefined | null;
interface App<T> {
    updateState: (newState: Partial<T>) => Promise<void>;
}
interface DebugOptions {
    enabled: boolean;
    showRenderCount: boolean;
}
interface Options {
    debug: DebugOptions;
}
interface StartParameters<T> {
    state?: T;
    methods?: Record<string, Method<T>>;
    getters?: Record<string, Getter<T>>;
    conditions?: Record<string, Condition<T>>;
    lists?: Record<string, List<T>>;
    attributes?: Record<string, AttributeGetter<T>>;
    options: Options;
}
declare function start<T extends State>(parameters: StartParameters<T>): App<T>;
export { start };
