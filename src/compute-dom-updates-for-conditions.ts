import DomUpdate from "./dom-update";

const computeDomUpdatesForConditions = (key: string, value: any): Array<DomUpdate> => {
    const element = document.querySelector(`[data-luscent-if=${key}]`);

    if (!(element instanceof HTMLElement)) {
        return [];
    }

    const templateId = element.dataset.luscentTemplate;

    if (templateId === undefined) {
        return [];
    }

    const template = document.getElementById(templateId);

    if (!(template instanceof HTMLTemplateElement)) {
        return [];
    }

    const contentResetDomUpdate = (): void => {
        element.textContent = "";
    };

    const contentFillDomUpdate = (): void => {
        element.appendChild(template.content.cloneNode(true));
    };

    domUpdates.set(element, [
        ...domUpdates.get(element) ?? [],
        contentResetDomUpdate,
        contentFillDomUpdate,
    ]);

    return domUpdates;
};

export default computeDomUpdatesForConditions;
