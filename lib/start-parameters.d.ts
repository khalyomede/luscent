import Method from "./method";
/**
 * This is the definition of the main entry point of your app.
 *
 * There is a state to hold your app context data.
 *
 * You can define methods to trigger UI changes on some DOM event (like click, ...).
 */
interface StartParameters<T> {
    state?: T;
    methods: Record<string, Method<T>>;
    onStateChanged: (state: T) => T;
}
export default StartParameters;
