import Difference from "./difference";
import DomUpdate from "./dom-update";
declare const computeDomUpdates: (difference: Difference) => Array<DomUpdate>;
export default computeDomUpdates;
