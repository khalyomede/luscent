import Condition from "./condition";
import Context from "./context";
/**
 * This method will find all [data-luscent-if] and show the element if the condition met, or hide it otherwise.
 */
declare const renderIf: <T>(context: Context<T>, conditions: Record<string, Condition<T>>) => void;
export default renderIf;
