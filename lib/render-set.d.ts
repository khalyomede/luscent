import Context from "./context";
import Getter from "./getter";
declare const renderSet: <T>(context: Context<T>, getters: Record<string, Getter<T>>, element?: HTMLElement, local?: Record<string, any>) => void;
export default renderSet;
