import Context from "./context";
import Getter from "./getter";
declare const bindTwoWay: <T>(context: Context<T>, getters: Record<string, Getter<T>>) => void;
export default bindTwoWay;
