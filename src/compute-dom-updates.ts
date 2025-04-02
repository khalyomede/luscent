import addElementOnNextFrame from "./add-element-on-next-frame";
import Difference from "./difference";
import DomUpdate from "./dom-update";
import Updates from "./updates";

const getTemplate = (id: string, cache: Map<string, HTMLTemplateElement>): HTMLTemplateElement | undefined => {
    if (cache.has(id)) {
        console.debug("template cache hit", id);

        return cache.get(id);
    }

    const template = document.querySelector(`template#${id}`);

    console.debug(`Search for template with id ${id} (uncached)̀`);

    if (template instanceof HTMLTemplateElement) {
        cache.set(id, template);

        console.debug("warming cache");

        return template;
    }

    return undefined;
};

const computeDomUpdates = <T>(difference: Difference, root: Document | HTMLElement = document): Updates<T> => {
    const addedOrUpdated = {
        ...difference.added,
        ...difference.updated,
    };

    let updates: Updates<T> = {
        domUpdates: [],
        elementsToRender: new Map(),
    };

    let cachedTemplates: Map<string, HTMLTemplateElement> = new Map();

    for (const key in addedOrUpdated) {
        console.debug("Computing state key", key);

        const value = addedOrUpdated[key];

        console.debug("----- data-luscent-value");

        // data-luscent-value
        const elementForValue = root.querySelector(`[data-luscent-value=${key}]`);

        if (elementForValue instanceof HTMLElement) {
            updates.domUpdates.push(() => elementForValue.textContent = value);
        }

        console.debug("----- data-luscent-id");

        // data-luscent-id
        const elementForId = root.querySelector(`[data-luscent-id=${key}]`);

        if (elementForId instanceof HTMLElement) {
            elementForId.dataset.luscentRenderedId = value;
        }

        console.debug("----- data-luscent-bind");

        // data-luscent-bind
        const boundElement = root.querySelector(`[data-luscent-bind=${key}]`);

        if (boundElement instanceof HTMLInputElement) {
            updates.domUpdates.push(() => boundElement.value = value);
        }

        console.debug("----- data-luscent-attribute");

        // data-luscent-attribute
        const elementToSetAttributeTo = root.querySelector(`[data-luscent-with=${key}]`);

        if (elementToSetAttributeTo instanceof HTMLElement) {
            const attributeName = elementToSetAttributeTo.dataset.luscentAttribute;

            if (attributeName !== undefined) {
                updates.domUpdates.push(() => elementToSetAttributeTo.setAttribute(attributeName, value));
            }
        }

        console.debug("----- data-luscent-if");

        // data-luscent-if
        const element = root.querySelector(`[data-luscent-if=${key}]`);

        console.debug(`Trying to find element with [data-luscent-if=${key}]`, element);

        if (element instanceof HTMLElement) {
            console.debug("Found data-luscent-if element");

            const templateId = element.dataset.luscentTemplate;

            if (templateId !== undefined) {
                const template = root.querySelector(`template#${templateId}`);

                if (template instanceof HTMLTemplateElement) {
                    updates.domUpdates.push(() => element.textContent = "");

                    if (value) {
                        updates.domUpdates.push(() => element.appendChild(template.content.cloneNode(true)));
                        updates.elementsToRender.set(element, addedOrUpdated as Partial<T>);
                    }
                }
            }
        }

        console.debug("----- data-luscent-for");

        // data-luscent-for
        if (Array.isArray(value)) {
            const elementLooped = root.querySelector(`[data-luscent-for=${key}]`);

            console.debug(`Finding element with data-luscent-for=${key}`);

            if (elementLooped instanceof HTMLElement) {
                const templateId = elementLooped.dataset.luscentTemplate;

                console.debug(`Finding template with id=${templateId}`);

                if (templateId !== undefined) {
                    const template = getTemplate(templateId, cachedTemplates);

                    if (template !== undefined) {
                        console.debug("Found template");

                        const idName = elementLooped.dataset.luscentKey;

                        if (idName !== undefined) {
                            let lastAddedElement: HTMLElement | null = null;

                            console.debug(`Iterating on values for data-luscent-for=${key}`, value);

                            for (const item of value) {
                                console.debug("rendering item", item);

                                if (typeof item === "object") {
                                    const id = item[idName];

                                    const itemElement = root.querySelector(`[data-luscent-rendered-for-key="${key}.${idName}"][data-luscent-rendered-for-id="${id}"]`);

                                    if (itemElement instanceof HTMLElement) {
                                        lastAddedElement = itemElement;
                                    } else {
                                        const content = template.content.cloneNode(true) as DocumentFragment;

                                        const childElements = Array.from(content.childNodes);

                                        for (const childElement of childElements) {
                                            if (!(childElement instanceof HTMLElement)) {
                                                continue;
                                            }

                                            console.debug("---- child is", childElement);

                                            childElement.dataset.luscentRenderedForKey = `${key}.${idName}`;
                                            childElement.dataset.luscentRenderedForId = id;

                                            updates.elementsToRender.set(childElement, item);
                                        }

                                        if (lastAddedElement !== null) {
                                            updates.domUpdates.push(() => lastAddedElement?.after(content));
                                        } else {
                                            updates.domUpdates.push(() => elementLooped.append(content));
                                        }
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
