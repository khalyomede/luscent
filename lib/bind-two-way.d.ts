import Condition from "./condition";
import Context from "./context";
import Getter from "./getter";
declare const bindTwoWay: <T>(context: Context<T>, getters: Record<string, Getter<T>>, conditions: Record<string, Condition<T>>) => void;
export default bindTwoWay;
