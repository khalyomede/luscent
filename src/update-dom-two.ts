import bindEvents from "./bind-events";
import bindTwoWay from "./bind-two-way";
import computeDomUpdates from "./compute-dom-updates";
import Context from "./context";
import Difference from "./difference";
import DomUpdate from "./dom-update";
import Method from "./method";
import objectDifference from "./object-difference";
import performDomUpdates from "./perform-dom-updates";

const updateDomTwo = async <T>(context: Context<T>, state: Partial<T>, newState: Partial<T>, methods: Record<string, Method<T>>, elements: Array<Document | HTMLElement>, persistState: boolean = true): Promise<void> => {
    console.log("----- rendering start", elements);

    const difference: Difference = objectDifference(state as Object, newState);

    console.log("diff", difference);

    let computedDomUpdates: Array<DomUpdate> = [];
    let newElementsToRender: Map<HTMLElement, Partial<T>> = new Map();

    for (const element of elements) {
        const { domUpdates, elementsToRender } = computeDomUpdates(difference, element);

        computedDomUpdates.push(...domUpdates);

        elementsToRender.forEach((partialState, element) => newElementsToRender.set(element, partialState));
    }

    await performDomUpdates(computedDomUpdates);

    if (newElementsToRender.size > 0) {
        console.debug("new elements to render");

        newElementsToRender.forEach((_, element) => console.debug(element));

        let updates: Array<Promise<void>> = [];

        newElementsToRender.forEach((partialState, element) => updates.push(updateDomTwo(context, {}, partialState, methods, [element])))

        await Promise.all(updates);
    }

    for (const element of elements) {
        bindEvents(newState, context, methods, element);
        bindTwoWay(newState, context, methods, element);
    }

    if (persistState) {
        context.state = {
            ...context.state,
            ...newState,
        };
    }
};

export default updateDomTwo;
