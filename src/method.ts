/**
 * Represents an action that can be used to operate an UI update.
 *
 * It takes a state, and the event that triggered the method, and should return an updated state.
 *
 * The UI will then automatically render when calling app.updateState() function.
 *
 * For example, <button data-luscent-on-click="yourMethod"></button>.
 */
type Method<T> = (state: T, event: Event, id?: string) => Promise<void>;

export default Method;
