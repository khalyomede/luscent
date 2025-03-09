import Method from "./method";
/**
 * This method registers the event handler that react to DOM events.
 *
 * Each events goal is to return a new state to trigger a new UI change.
 */
declare const bindEvents: <T>(methods: Record<string, Method<T>>, state: T) => void;
export default bindEvents;
