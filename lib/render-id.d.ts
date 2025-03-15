/**
 * This method will fill any data-luscent-id value by the iterate object corresponding value for this id.
 * Useful when iterating with data-luscent-for, and you want to identify the iterate it, to identify it when reacting to
 * an event like data-luscent-on-click="deleteTask" data-luscent-id="id" (where "id" is the name of the key in the iterated item).
 */
declare const renderId: <T>(element: HTMLElement, item: Record<string, any>) => void;
export default renderId;
