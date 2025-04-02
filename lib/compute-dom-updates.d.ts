import Difference from "./difference";
import Updates from "./updates";
declare const computeDomUpdates: <T>(difference: Difference, root?: Document | HTMLElement) => Updates<T>;
export default computeDomUpdates;
