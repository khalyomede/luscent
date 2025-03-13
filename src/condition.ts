/**
 * This is an object that for each key contains a method that must return a boolean.
 *
 * This is to condition the display of elements using data-luscent-if.
 */
type Condition<T> = (state: T) => boolean;

export default Condition;
