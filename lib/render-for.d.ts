import List from "./list";
import Context from "./context";
import Condition from "./condition";
import Getter from "./getter";
import Method from "./method";
/**
 * This method will find all [data-luscent-for] and render a template for each item in the list.
 *
 * For each element with data-luscent-for, it:
 * 1. Gets the list name from the attribute
 * 2. Gets the template ID from data-luscent-template
 * 3. Clears the element
 * 4. For each item in the list:
 *    a. Clones the template
 *    b. Finds all elements with data-luscent-value in the clone
 *    c. Sets each element's content to the corresponding property of the item
 *    d. Appends the clone to the element
 */
declare const renderFor: <T>(context: Context<T>, getters: Record<string, Getter<T>>, methods: Record<string, Method<T>>, conditions: Record<string, Condition<T>>, lists: Record<string, List<T>>, element?: HTMLElement) => void;
export default renderFor;
