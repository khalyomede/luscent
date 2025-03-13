import Getter from "./getter";
import Context from "./context";
import Condition from "./condition";
import renderIf from "./render-if";

/**
 * The function will take a state.
 *
 * Then find all the one-way data binding (data-luscent-value="..."), grab the value in the state and put it on the DOM element.
 */
const updateDOM = <T>(context: Context<T>, getters: Record<string, Getter<T>>, conditions: Record<string, Condition<T>>): void => {
    console.log("DOM will be updated with");
    console.log(context.state);

    document.querySelectorAll('[data-luscent-value]').forEach(element => {
        const getterName = element.getAttribute('data-luscent-value');
        const getterNameIsEmpty = getterName === null || getterName.trim().length === 0;
        const elementHasId = element.id.trim().length > 0;
        const elementId = element.id;

        if (getterNameIsEmpty) {
            if (elementHasId) {
                console.warn(`The element id "${elementId}" seems to have a data-luscent-value with an empty value. Please fill it to let the UI update pursue correctly.`);
            } else {
                console.warn("It seems you have a data-luscent-value with an empty value. Please fill it to let the UI update pursue correctly.");
            }

            return;
        }

        if (!getters.hasOwnProperty(getterName)) {
            if (elementHasId) {
                console.warn(`The element id "${elementId}" content with data-luscent-value="${getterName}" could not be rendered because a getter with the same name could not be found.`);
            } else {
                console.warn(`The UI rendering failed for an element content with data-luscent-value="${getterName}" could not be rendered because a getter with the same name Could not be found.`);
            }

            return;
        }

        console.log(`Running getter ${getterName}`);

        const value = getters[getterName](context.state);

        console.log("value was", value);

        if (element instanceof HTMLInputElement) {
            element.value = value;
        } else {
            element.textContent = value;
        }

        renderIf(context, conditions);
    });

    /**
     * @todo Same for data-luscent-on-input-bind="stateKey"
     */
}

export default updateDOM;
