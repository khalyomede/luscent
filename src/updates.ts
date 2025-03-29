import DomUpdate from "./dom-update";

interface Updates {
    domUpdates: Array<DomUpdate>,
    elementsToRender: Array<HTMLElement>,
};

export default Updates;
