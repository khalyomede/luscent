import Difference from "./difference";
import Updates from "./updates";
declare const computeDomUpdates: (difference: Difference, root?: Document | HTMLElement) => Updates;
export default computeDomUpdates;
