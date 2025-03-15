import Context from "./context";
import Getter from "./getter";

const renderValue = <T>(context: Context<T>, getters: Record<string, Getter<T>>, element?: HTMLElement, local?: Record<string, any>): void => {
    const target = element ?? document;

    target.querySelectorAll('[data-luscent-value]').forEach(item => {
        // Skip elements inside for loops
        if (!local && item.closest('[data-luscent-for]')) {
            console.log("skipping data-luscent-value because closest is luscent-for");
            return;
        }

        const getterName = item.getAttribute('data-luscent-value');
        const getterNameIsEmpty = getterName === null || getterName.trim().length === 0;
        const elementHasId = item.id.trim().length > 0;
        const elementId = item.id;

        if (getterNameIsEmpty) {
            if (elementHasId) {
                console.warn(`The element id "${elementId}" seems to have a data-luscent-value with an empty value. Please fill it to let the UI update pursue correctly.`);
            } else {
                console.warn("It seems you have a data-luscent-value with an empty value. Please fill it to let the UI update pursue correctly.");
            }

            return;
        }

        if (!local && !getters.hasOwnProperty(getterName)) {
            if (elementHasId) {
                console.warn(`The element id "${elementId}" content with data-luscent-value="${getterName}" could not be rendered because a getter with the same name could not be found.`);
            } else {
                console.warn(`The UI rendering failed for an element content with data-luscent-value="${getterName}" could not be rendered because a getter with the same name Could not be found.`);
            }

            return;
        }

        console.log(`Running getter ${getterName}`);

        const value = local
            ? local[getterName]
            : getters[getterName](context.state);

        console.log("value was", value);

        if (item instanceof HTMLInputElement) {
            item.value = value;
        } else {
            item.textContent = value;
        }
    });
};

export default renderValue;
