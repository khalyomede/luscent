import bindEvents from "./bind-events";
import bindTwoWay from "./bind-two-way";
import computeDomUpdates from "./compute-dom-updates";
import Context from "./context";
import Difference from "./difference";
import DomUpdate from "./dom-update";
import Method from "./method";
import objectDifference from "./object-difference";
import performDomUpdates from "./perform-dom-updates";

const updateDomTwo = async <T>(context: Context<T>, state: Partial<T>, newState: Partial<T>, methods: Record<string, Method<T>>, elements: Array<Document | HTMLElement>): Promise<void> => {
    const difference: Difference = objectDifference(state as Object, newState);

    console.log("diff", difference);

    let computedDomUpdates: Array<DomUpdate> = [];
    let newElementsToRender: Array<HTMLElement> = [];

    for (const element of elements) {
        const { domUpdates, elementsToRender } = computeDomUpdates(difference, element);

        computedDomUpdates.push(...domUpdates);
        newElementsToRender.push(...elementsToRender);
    }

    await performDomUpdates(computedDomUpdates);

    for (const element of elements) {
        bindEvents(newState, context, methods, element);
        bindTwoWay(newState, context, methods, element);
    }

    if (newElementsToRender.length > 0) {
        await updateDomTwo(context, state, newState, methods, newElementsToRender);
    }
};

export default updateDomTwo;
