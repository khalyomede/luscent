import StartParameters from "./start-parameters";
import updateDOM from "./update-dom";
import Context from "./context";

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
    const getters = parameters.getters || {};
    const conditions = parameters.conditions || {};
    const lists = parameters.lists || {};

    const context: Context<T> = {
        state,
    };

    updateDOM(context, getters, methods, conditions, lists);

    console.log("Luscent app started successfully");
}

export default start;
