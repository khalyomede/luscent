import bindEvents from "./bind-events";
import computeDomUpdates from "./compute-dom-updates";
import Context from "./context";
import Difference from "./difference";
import Method from "./method";
import objectDifference from "./object-difference";
import performDomUpdates from "./perform-dom-updates";

const updateDomTwo = async <T>(context: Context<T>, state: Partial<T>, newState: Partial<T>, methods: Record<string, Method<T>>): void => {
    const difference: Difference = objectDifference(state as Object, newState);

    console.log("diff", difference);

    const domUpdates = computeDomUpdates(difference);

    await performDomUpdates(domUpdates);

    bindEvents(newState, context, methods);
};

export default updateDomTwo;
