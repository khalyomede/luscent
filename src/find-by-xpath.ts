const findByXpath = (expression: string, root: Node | null = null): Array<HTMLElement> => {
    const elements: Array<HTMLElement> = [];

    const xpathResult = document.evaluate(
        expression,
        root ?? document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    for (let index = 0; index < xpathResult.snapshotLength; index++) {
        const node = xpathResult.snapshotItem(index);

        if (node === null || !(node instanceof HTMLElement)) {
            continue;
        }

        elements.push(node);
    }

    return elements;
};

export default findByXpath;
