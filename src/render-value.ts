import Context from "./context";
import Getter from "./getter";

const renderValue = <T>(context: Context<T>, getters: Record<string, Getter<T>>): void => {
    document.querySelectorAll('[data-luscent-value]').forEach(element => {
        // Skip elements inside templates
        if (element.closest('template')) {
            return;
        }

        // Skip elements inside for loops
        if (element.closest('[data-luscent-for]')) {
            return;
        }

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
    });
};

export default renderValue;
