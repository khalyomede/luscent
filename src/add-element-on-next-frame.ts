const addElementOnNextFrame = async (elementToAdd: Node, container: HTMLElement, direction: "append" | "after"): Promise<void> => {
    return new Promise((resolve) => {
        if (direction === "append") {
            container.append(elementToAdd);
        } else {
            container.after(elementToAdd);
        }

        resolve();
    });
};

export default addElementOnNextFrame;
