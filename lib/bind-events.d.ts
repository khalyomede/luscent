import Getter from "./getter";
import Method from "./method";
import Context from "./context";
import Condition from "./condition";
import List from "./list";
/**
 * This method registers the event handler that react to DOM events.
 *
 * Each events goal is to return a new state to trigger a new UI change.
 */
declare const bindEvents: <T>(context: Context<T>, getters: Record<string, Getter<T>>, methods: Record<string, Method<T>>, conditions: Record<string, Condition<T>>, lists: Record<string, List<T>>, element?: HTMLElement) => void;
export default bindEvents;
