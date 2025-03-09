/**
 * The function will take a state.
 *
 * Then find all the one-way data binding (data-luscent-value="..."), grab the value in the state and put it on the DOM element.
 */
const updateDOM = <T>(state: T): void => {
    if (!(state instanceof Object)) {
        console.warn("The UI update failed because it seems the state is not an object. Your state should be an object (of anything you want inside of it).");

        return;
    }

    document.querySelectorAll('[data-luscent-value]').forEach(element => {
        const key = element.getAttribute('data-luscent-value');
        const keyIsEmpty = key === null || key.trim().length === 0;
        const elementHasId = element.id.trim().length > 0;
        const elementId = element.id;

        if (keyIsEmpty) {
            if (elementHasId) {
                console.warn(`The element id "${elementId}" seems to have a data-luscent-value with an empty value. Please fill it to let the UI update pursue correctly.`);
            } else {
                console.warn("It seems you have a data-luscent-value with an empty value. Please fill it to let the UI update pursue correctly.");
            }

            return;
        }

        if (!state.hasOwnProperty(key)) {
            if (elementHasId) {
                console.warn(`The element id "${elementId}" content with data-luscent-value="${key}" could not be rendered because the state does not contain the key "${key}".`);
            } else {
                console.warn(`The UI rendering failed for an element content with data-luscent-value="${key}" could not be rendered because the state does not contain the key "${key}".`);
            }

            return;
        }

        element.textContent = String(state[key as keyof T]);
    });
}

export default updateDOM;
