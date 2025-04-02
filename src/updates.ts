import DomUpdate from "./dom-update";

interface Updates<T> {
    domUpdates: Array<DomUpdate>,
    elementsToRender: Map<HTMLElement, Partial<T>>,
};

export default Updates;
