import Context from "./context";
import Getter from "./getter";
declare const renderValue: <T>(context: Context<T>, getters: Record<string, Getter<T>>, element?: HTMLElement, local?: Record<string, any>) => void;
export default renderValue;
