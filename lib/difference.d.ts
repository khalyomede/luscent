interface Difference {
    added: Record<string, any>;
    updated: Record<string, any>;
    deleted: Record<string, any>;
    mutated: Record<string, any>;
}
export default Difference;
