import Difference from "./difference";
import DomUpdate from "./dom-update";

const computeDomUpdatesForValue = (difference: Difference): Map<HTMLElement, Array<DomUpdate>> => {
    const { updated } = difference;
    const domUpdates: Map<HTMLElement, Array<DomUpdate>> = new Map();

    for (const key in updated) {
        const element = document.querySelector(`[data-luscent-value=${key}]`);

        if (!(element instanceof HTMLElement)) {
            continue;
        }

        const value = updated[key];
        const domUpdate = (): void => {
            element.textContent = value;
        };

        domUpdates.set(element, [
            ...domUpdates.get(element) ?? [],
            domUpdate
        ]);
    }

    return domUpdates;
};

export default computeDomUpdatesForValue;
