/**
 * The function will take a state.
 *
 * Then find all the one-way data binding (data-luscent-value="..."), grab the value in the state and put it on the DOM element.
 */
declare const updateDOM: <T>(state: T) => void;
export default updateDOM;
