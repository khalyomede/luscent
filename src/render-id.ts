/**
 * This method will fill any data-luscent-id value by the iterate object corresponding value for this id.
 * Useful when iterating with data-luscent-for, and you want to identify the iterate it, to identify it when reacting to
 * an event like data-luscent-on-click="deleteTask" data-luscent-id="id" (where "id" is the name of the key in the iterated item).
 */
const renderId = <T>(element: HTMLElement, item: Record<string, any>): void => {
    const domElements = Array.from(element.querySelectorAll("[data-luscent-id]"));

    for (const element of domElements) {
        if (!(element instanceof HTMLElement)) {
            return;
        }

        const key = element.dataset.luscentId;

        if (!key) {
            /**
             * @todo Warn
             */
            continue;
        }

        if (!(key in item)) {
            /**
             * @todo Warn
             */
            continue;
        }

        const value = item[key];

        element.dataset.luscentRenderedId = String(value);
    }
};

export default renderId;
