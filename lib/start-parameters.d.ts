import Method from "./method";
import Getter from "./getter";
import Condition from "./condition";
/**
 * This is the definition of the main entry point of your app.
 *
 * There is a state to hold your app context data.
 *
 * You can define methods to trigger UI changes on some DOM event (like click, ...).
 */
interface StartParameters<T> {
    state?: T;
    methods?: Record<string, Method<T>>;
    getters: Record<string, Getter<T>>;
    conditions: Record<string, Condition<T>>;
}
export default StartParameters;
