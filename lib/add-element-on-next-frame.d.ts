declare const addElementOnNextFrame: (elementToAdd: Node, container: HTMLElement, direction: "append" | "after") => Promise<void>;
export default addElementOnNextFrame;
