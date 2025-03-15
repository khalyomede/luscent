import Context from "./context";
/**
 * This method updates all input elements with data-luscent-on-input-bind attributes
 * to reflect the current state values.
 *
 * It completes the two-way binding process by handling the state → DOM direction
 * (the DOM → state direction is handled by the bindTwoWay function).
 */
declare const renderBind: <T>(context: Context<T>, element?: HTMLElement) => void;
export default renderBind;
