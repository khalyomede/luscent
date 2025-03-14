/**
 * Represents a function that returns a list of items to be iterated over in a for loop using data-luscent-for.
 *
 * It takes the state and returns an array of objects, each of which can be used to populate a template.
 * For example, a list function might return all incomplete tasks from the state.
 */
type List<T> = (state: T) => Array<Record<string, any>>;

export default List;
