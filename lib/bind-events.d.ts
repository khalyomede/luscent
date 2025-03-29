import Method from "./method";
import Context from "./context";
/**
 * This method registers the event handler that react to DOM events.
 *
 * Each events goal is to return a new state to trigger a new UI change.
 */
declare const bindEvents: <T>(state: Partial<T>, context: Context<T>, methods: Record<string, Method<T>>, element?: HTMLElement) => void;
export default bindEvents;
