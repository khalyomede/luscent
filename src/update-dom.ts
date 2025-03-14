import Getter from "./getter";
import Context from "./context";
import Condition from "./condition";
import renderIf from "./render-if";
import renderFor from "./render-for";
import List from "./list";
import renderValue from "./render-value";

/**
 * The function will take a state.
 *
 * Then find all the one-way data binding (data-luscent-value="..."), grab the value in the state and put it on the DOM element.
 */
const updateDOM = <T>(context: Context<T>, getters: Record<string, Getter<T>>, conditions: Record<string, Condition<T>>, lists?: Record<string, List<T>>): void => {
    console.log("DOM will be updated with");
    console.log(context.state);

    renderValue(context, getters);

    renderIf(context, conditions);

    // Render for loops if lists are provided
    if (lists) {
        renderFor(context, lists);
    }
}

export default updateDOM;
