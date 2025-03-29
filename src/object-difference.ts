import Difference from "./difference";

const objectDifference = (before: Record<string, any>, after: Record<string, any>): Difference => {
    let updated: Record<string, any> = {};
    let added: Record<string, any> = {};
    let deleted: Record<string, any> = {};
    let mutated: Record<string, any> = {};

    console.log("before", before);
    console.log("after", after);

    for (const keyBefore in before) {
        const valueBefore = before[keyBefore];

        if (keyBefore in after) {
            const valueAfter = after[keyBefore];

            // Checking for updated keys
            if (valueBefore != valueAfter) {
                updated[keyBefore] = valueAfter;
            }

            // Checking for mutated keys
            if ((typeof valueBefore) !== (typeof valueAfter)) {
                mutated[keyBefore] = valueAfter;
            }
        }
        // Checking for deleted keys
        else {
            deleted[keyBefore] = before[keyBefore];
        }
    }

    // Checking for new keys
    for (const keyAfter in after) {
        if (!(keyAfter in before)) {
            added[keyAfter] = after[keyAfter];
        }
    }

    return {
        added,
        updated,
        deleted,
        mutated,
    };
};

export default objectDifference;
