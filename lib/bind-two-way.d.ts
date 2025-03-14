import Condition from "./condition";
import Context from "./context";
import Getter from "./getter";
import List from "./list";
declare const bindTwoWay: <T>(context: Context<T>, getters: Record<string, Getter<T>>, conditions: Record<string, Condition<T>>, lists?: Record<string, List<T>>) => void;
export default bindTwoWay;
