import Difference from "./difference";
import DomUpdate from "./dom-update";
declare const computeDomUpdatesForValue: (difference: Difference) => Map<HTMLElement, Array<DomUpdate>>;
export default computeDomUpdatesForValue;
