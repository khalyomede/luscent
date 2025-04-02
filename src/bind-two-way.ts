import Context from "./context";
import Method from "./method";
import updateDomTwo from "./update-dom-two";

const bindTwoWay = <T>(newState: Partial<T>, context: Context<T>, methods: Record<string, Method<T>>, target: Document | HTMLElement): void => {
    for (const key in newState) {
        const element = target.querySelector(`[data-luscent-bind=${key}]`);

        if (!(element instanceof HTMLElement)) {
            continue;
        }

        const eventName = element.dataset.luscentBindOn;

        if (eventName === undefined) {
            continue;
        }

        if (!(element instanceof HTMLInputElement)) {
            continue;
        }

        const boundEvent = element.dataset.luscentBound;

        if (boundEvent !== undefined) {
            continue;
        }

        element.addEventListener(eventName, async (event) => {
            console.log("two way triggering...");

            if (!(event.target instanceof HTMLInputElement)) {
                return;
            }

            const value = event.target.value;
            const updatedState = {
                [key]: value
            };

            await updateDomTwo(context, context.state, updatedState as Partial<T>, methods, [document]);
        });

        element.dataset.luscentBound = String(true);
    }
};

export default bindTwoWay;
