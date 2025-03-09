import StartParameters from "./start-parameters";
import updateDOM from "./update-dom";
import bindEvents from "./bind-events";

/**
 * This is the function to call to start your reactive app.
 *
 * It starts by calculating the initial state.
 *
 * Then renders the UI for the first time.
 *
 * Finally it registers any event method, for them to trigger new UI changes.
 */
const start = <T>(parameters: StartParameters<T>) => {
    var state = parameters.state || {} as T;
    const methods = parameters.methods || {};

    updateDOM(state);
    bindEvents(methods, state);

    console.log("Luscent app started successfully");
}

export default start;
