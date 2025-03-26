import Context from "./context";
import findByXpath from "./find-by-xpath";
import Getter from "./getter";
import hyphenize from "./hyphenize";

/**
 * @todo Use it to replace other location where this logic is similar (finding attribute/value from dataset starting with...).
 */
const getAttribute = (dataset: DOMStringMap): { key: string, value: string | null } | null => {
    for (const key in dataset) {
        if (key.startsWith("luscentSet")) {
            return {
                key: key.replace("luscentSet", ""),
                value: dataset[key] ?? null,
            };
        }
    }

    return null;
}

const renderSet = <T>(context: Context<T>, getters: Record<string, Getter<T>>, element?: HTMLElement, local?: Record<string, any>): void => {
    const target = element ?? document;

    const nodes = findByXpath(`//*[./@*[starts-with(name(), "data-luscent-set-")]]`, target);

    for (const node of nodes) {
        const attribute = getAttribute(node.dataset);

        if (attribute === null) {
            /**
             * @todo console.warn
             */

            continue;
        }

        const { key, value } = attribute;

        if (value === null || value.trim().length === 0) {
            /**
             * @todo console.warn
             */

            continue;
        }

        if (key.trim().length === 0) {
            /**
             * @todo console.warn
             */

            continue;
        }

        const getterValue = local !== undefined
            ? local[value]
            : getters[value](context.state);

        node.setAttribute(hyphenize(key), getterValue);
    }
};

export default renderSet;
