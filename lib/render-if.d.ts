import Condition from "./condition";
import Context from "./context";
import Getter from "./getter";
import List from "./list";
/**
 * This method will find all [data-luscent-if] and show the element if the condition met, or hide it otherwise.
 */
declare const renderIf: <T>(context: Context<T>, getters: Record<string, Getter<T>>, conditions: Record<string, Condition<T>>, lists: Record<string, List<T>>, element?: HTMLElement) => void;
export default renderIf;
