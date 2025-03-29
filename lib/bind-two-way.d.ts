import Context from "./context";
import Method from "./method";
declare const bindTwoWay: <T>(newState: Partial<T>, context: Context<T>, methods: Record<string, Method<T>>, target: Document | HTMLElement) => void;
export default bindTwoWay;
