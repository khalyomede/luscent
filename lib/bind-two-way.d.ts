import Condition from "./condition";
import Context from "./context";
import Getter from "./getter";
import List from "./list";
import Method from "./method";
declare const bindTwoWay: <T>(context: Context<T>, getters: Record<string, Getter<T>>, methods: Record<string, Method<T>>, conditions: Record<string, Condition<T>>, lists: Record<string, List<T>>) => void;
export default bindTwoWay;
