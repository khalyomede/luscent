import Context from "./context";
import Method from "./method";
declare const updateDomTwo: <T>(context: Context<T>, state: Partial<T>, newState: Partial<T>, methods: Record<string, Method<T>>, elements: Array<Document | HTMLElement>) => Promise<void>;
export default updateDomTwo;
