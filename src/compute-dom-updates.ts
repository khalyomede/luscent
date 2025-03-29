import Difference from "./difference";
import DomUpdate from "./dom-update";

const computeDomUpdates = (difference: Difference): Array<DomUpdate> => {
    const addedOrUpdated = {
        ...difference.added,
        ...difference.updated,
    };

    const domUpdates: Array<DomUpdate> = [];

    for (const key in addedOrUpdated) {
        console.debug("Computing state key", key);

        const value = addedOrUpdated[key];

        // data-luscent-value
        const elementForValue = document.querySelector(`[data-luscent-value=${key}]`);

        if (elementForValue instanceof HTMLElement) {
            domUpdates.push(() => elementForValue.textContent = value);
        }

        // data-luscent-attribute
        const elementToSetAttributeTo = document.querySelector(`[data-luscent-with=${key}]`);

        if (elementToSetAttributeTo instanceof HTMLElement) {
            const attributeName = elementToSetAttributeTo.dataset.luscentAttribute;

            if (attributeName !== undefined) {
                domUpdates.push(() => elementToSetAttributeTo.setAttribute(attributeName, value));
            }
        }

        // data-luscent-if
        const element = document.querySelector(`[data-luscent-if=${key}]`);

        console.debug(`Trying to find element with [data-luscent-if=${key}]`, element);

        if (element instanceof HTMLElement) {
            console.debug("Found data-luscent-if element");

            const templateId = element.dataset.luscentTemplate;

            if (templateId !== undefined) {
                const template = document.getElementById(templateId);

                if (template instanceof HTMLTemplateElement) {
                    domUpdates.push(() => element.textContent = "");

                    if (value) {
                        domUpdates.push(() => element.appendChild(template.content.cloneNode(true)));
                    }
                }
            }
        }
    }

    return domUpdates;
};

export default computeDomUpdates;
