import Getter from "./getter";
import Context from "./context";
import Condition from "./condition";
import renderIf from "./render-if";
import renderFor from "./render-for";
import List from "./list";
import renderValue from "./render-value";
import Method from "./method";
import bindEvents from "./bind-events";
import renderBind from "./render-bind";
import bindTwoWay from "./bind-two-way";

/**
 * The function will take a state.
 *
 * Then find all the one-way data binding (data-luscent-value="..."), grab the value in the state and put it on the DOM element.
 */
const updateDOM = <T>(context: Context<T>, getters: Record<string, Getter<T>>, methods: Record<string, Method<T>>, conditions: Record<string, Condition<T>>, lists: Record<string, List<T>>, element?: HTMLElement, local?: Record<string, any>): void => {
    renderValue(context, getters, element, local);

    renderBind(context, element);

    renderIf(context, getters, methods, conditions, lists, element);

    // Render for loops if lists are provided
    if (lists) {
        renderFor(context, getters, methods, conditions, lists, element);
    }

    bindEvents(context, methods, element);

    bindTwoWay(context, getters, methods, conditions, lists);
}

export default updateDOM;
