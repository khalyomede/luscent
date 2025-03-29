import Difference from "./difference";
import DomUpdate from "./dom-update";
import Updates from "./updates";

const getTemplate = (id: string, cache: Map<string, HTMLTemplateElement>): HTMLTemplateElement | undefined => {
    if (cache.has(id)) {
        console.debug("template cache hit", id);

        return cache.get(id);
    }

    const template = document.querySelector(`[data-luscent-template=${id}]`);

    if (template instanceof HTMLTemplateElement) {
        cache.set(id, template);

        return template;
    }

    return undefined;
};

const computeDomUpdates = (difference: Difference, root: Document | HTMLElement = document): Updates => {
    const addedOrUpdated = {
        ...difference.added,
        ...difference.updated,
    };

    let updates: Updates = {
        domUpdates: [],
        elementsToRender: [],
    };

    const domUpdates: Array<DomUpdate> = [];
    let cachedTemplates: Map<string, HTMLTemplateElement> = new Map();

    for (const key in addedOrUpdated) {
        console.debug("Computing state key", key);

        const value = addedOrUpdated[key];

        // data-luscent-value
        const elementForValue = root.querySelector(`[data-luscent-value=${key}]`);

        if (elementForValue instanceof HTMLElement) {
            updates.domUpdates.push(() => elementForValue.textContent = value);
        }

        // data-luscent-attribute
        const elementToSetAttributeTo = root.querySelector(`[data-luscent-with=${key}]`);

        if (elementToSetAttributeTo instanceof HTMLElement) {
            const attributeName = elementToSetAttributeTo.dataset.luscentAttribute;

            if (attributeName !== undefined) {
                updates.domUpdates.push(() => elementToSetAttributeTo.setAttribute(attributeName, value));
            }
        }

        // data-luscent-if
        const element = root.querySelector(`[data-luscent-if=${key}]`);

        console.debug(`Trying to find element with [data-luscent-if=${key}]`, element);

        if (element instanceof HTMLElement) {
            console.debug("Found data-luscent-if element");

            const templateId = element.dataset.luscentTemplate;

            if (templateId !== undefined) {
                const template = root.querySelector(`#${templateId}`);

                if (template instanceof HTMLTemplateElement) {
                    updates.domUpdates.push(() => element.textContent = "");

                    if (value) {
                        updates.domUpdates.push(() => element.appendChild(template.content.cloneNode(true)));
                        updates.elementsToRender.push(element);
                    }
                }
            }
        }

        // data-luscent-for
        if (Array.isArray(value)) {
            const elementLooped = root.querySelector(`[data-luscent-for=${key}]`);

            if (elementLooped instanceof HTMLElement) {
                const templateId = elementLooped.dataset.luscentTemplate;

                if (templateId !== undefined) {
                    const template = getTemplate(templateId, cachedTemplates);

                    if (template !== undefined) {
                        const idName = elementLooped.dataset.luscentKey;

                        if (idName !== undefined) {
                            let lastAddedElement: HTMLElement | null = null;

                            console.debug(`Iterating on values for data-luscent-for=${key}`, value);

                            for (const item of value) {
                                if (typeof item === "object") {
                                    const id = item[idName];

                                    const itemElement = root.querySelector(`[data-luscent-rendered-for-key=${key}.${idName}][data-luscent-rendered-for-id=${id}]`);

                                    if (itemElement instanceof HTMLElement) {
                                        lastAddedElement = itemElement;
                                    } else {
                                        const content = template.content.cloneNode(true);

                                        updates.domUpdates.push(lastAddedElement !== null
                                            ? () => lastAddedElement?.after(content) // Why "?."? TS bug?
                                            : () => elementLooped.append(content)
                                        );

                                        updates.elementsToRender.push(elementLooped);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Flushing cache to reduce memory usage
            cachedTemplates = new Map();
        }
    }

    return updates;
};

export default computeDomUpdates;
