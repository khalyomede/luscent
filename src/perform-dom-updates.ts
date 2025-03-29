import DomUpdate from "./dom-update";

const performDomUpdates = (domUpdates: Array<DomUpdate>): Promise<void> => {
    return new Promise((resolve) => requestAnimationFrame(() =>
        requestAnimationFrame((): void => {
            domUpdates.forEach((domUpdate: DomUpdate): void => domUpdate());

            resolve();
        })
    ));
};

export default performDomUpdates;
