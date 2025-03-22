import StartParameters from "./start-parameters";
import App from "./app";
/**
 * This is the function to call to start your reactive app.
 *
 * It starts by calculating the initial state.
 *
 * Then renders the UI for the first time.
 *
 * Finally it registers any event method, for them to trigger new UI changes.
 */
declare const start: <T>(parameters: StartParameters<T>) => App<T>;
export default start;
