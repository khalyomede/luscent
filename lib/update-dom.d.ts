import Getter from "./getter";
import Context from "./context";
import Condition from "./condition";
import List from "./list";
/**
 * The function will take a state.
 *
 * Then find all the one-way data binding (data-luscent-value="..."), grab the value in the state and put it on the DOM element.
 */
declare const updateDOM: <T>(context: Context<T>, getters: Record<string, Getter<T>>, conditions: Record<string, Condition<T>>, lists?: Record<string, List<T>>) => void;
export default updateDOM;
