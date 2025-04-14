// Type definitions
type State = Record<string, any>;
type Method<T> = (state: T, event?: Event, id?: string) => Promise<void>;
type Getter<T> = (state: T) => any;
type Condition<T> = (state: T) => boolean;
type List<T> = (state: T) => Array<Partial<T>>;
type AttributeGetter<T> = (state: T) => string | boolean | number | undefined | null;

interface Context<T> {
    state: T,
}

interface App<T> {
    updateState: (newState: Partial<T>) => Promise<void>;
}

interface StartParameters<T> {
    state?: T;
    methods?: Record<string, Method<T>>;
    getters?: Record<string, Getter<T>>;
    conditions?: Record<string, Condition<T>>;
    lists?: Record<string, List<T>>;
    attributes?: Record<string, AttributeGetter<T>>;
}

// DOM Utilities
function findElementsByAttribute(attr: string, root: ParentNode = document): HTMLElement[] {
    return Array.from(root.querySelectorAll(`[${attr}]`)).filter(
        (el): el is HTMLElement => el instanceof HTMLElement
    );
}

function findElementsByAttributeValue(attr: string, value: string, root: ParentNode = document): HTMLElement[] {
    return Array.from(root.querySelectorAll(`[${attr}="${value}"]`)).filter(
        (el): el is HTMLElement => el instanceof HTMLElement
    );
}

// Core functions
async function renderValue<T extends State>(context: Context<T>, getters: Record<string, Getter<T>>, root: ParentNode = document, localData?: Record<string, any>): Promise<void> {
    const elements = findElementsByAttribute('data-luscent-value', root);

    for (const element of elements) {
        // Skip elements inside for loops unless localData is provided
        if (!localData && element.closest('[data-luscent-for]')) {
            continue;
        }

        const getterName = element.getAttribute('data-luscent-value');
        if (!getterName) continue;

        let value;
        if (localData && getterName in localData) {
            value = localData[getterName];
        } else if (getters[getterName]) {
            value = getters[getterName](context.state);
        } else if (getterName in context.state) {
            value = context.state[getterName as keyof typeof context.state];
        } else {
            console.warn(`No getter or state property found for data-luscent-value="${getterName}"`);
            continue;
        }

        if (element instanceof HTMLInputElement) {
            element.value = String(value);
        } else {
            element.textContent = String(value);
        }
    }
}

function renderAttributes<T extends State>(context: Context<T>, attributes: Record<string, AttributeGetter<T>>, root: ParentNode = document, localData?: Partial<T>): void {
    const elements = findElementsByAttribute('data-luscent-attach', root);

    for (const element of elements) {
        const attributeName = element.getAttribute('data-luscent-attach');
        const withKey = element.getAttribute('data-luscent-with');

        if (!attributeName || !withKey) continue;

        // Get the attribute value
        let value: string | boolean | number | undefined | null;

        if (localData && withKey in localData) {
            value = localData[withKey];
        }
        else if (attributes[withKey]) {
            // Use the attribute getter function
            value = attributes[withKey](context.state);
        } else if (withKey in context.state) {
            // Use direct state property
            value = context.state[withKey as keyof typeof context.state];
        } else {
            console.warn(`No attribute getter or state property found for data-luscent-with="${withKey}"`);
            continue;
        }

        // Set or remove the attribute based on value
        if (value === undefined || value === null) {
            element.removeAttribute(attributeName);
        } else if (value === true) {
            // For boolean attributes (like disabled, checked, etc.)
            element.setAttribute(attributeName, '');
        } else {
            element.setAttribute(attributeName, String(value));
        }
    }
}

async function renderIf<T extends State>(
    context: Context<T>,
    getters: Record<string, Getter<T>>,
    methods: Record<string, Method<T>>,
    conditions: Record<string, Condition<T>>,
    lists: Record<string, List<T>>,
    attributes: Record<string, AttributeGetter<T>>,
    root: ParentNode = document
): Promise<void> {
    for (const condition in conditions) {
        const elements = findElementsByAttributeValue('data-luscent-if', condition, root);
        const isTrue = conditions[condition](context.state);

        for (const element of elements) {
            const templateId = element.dataset.luscentTemplate;
            if (!templateId) continue;

            const template = document.getElementById(templateId);
            if (!(template instanceof HTMLTemplateElement)) continue;

            // Clear existing content
            element.innerHTML = '';

            if (isTrue) {
                const clone = template.content.cloneNode(true) as DocumentFragment;
                element.appendChild(clone);

                // Update DOM inside this conditional element
                await updateDOM(context, getters, methods, conditions, lists, attributes, element);
            }
        }
    }
}

async function renderFor<T extends State>(
    context: Context<T>,
    getters: Record<string, Getter<T>>,
    methods: Record<string, Method<T>>,
    conditions: Record<string, Condition<T>>,
    lists: Record<string, List<T>>,
    attributes: Record<string, AttributeGetter<T>>,
    root: ParentNode = document
): Promise<void> {
    const forElements = findElementsByAttribute('data-luscent-for', root);

    for (const element of forElements) {
        const listName = element.dataset.luscentFor;
        if (!listName || !lists[listName]) continue;

        const templateId = element.dataset.luscentTemplate;
        if (!templateId) continue;

        const template = document.getElementById(templateId);
        if (!(template instanceof HTMLTemplateElement)) continue;

        const keyName = element.dataset.luscentKey || 'id';

        // Get items from list function
        const items = lists[listName](context.state);

        // Track existing items in the DOM
        const existingItems = new Map<string, HTMLElement>();
        Array.from(element.children).forEach((child) => {
            if (child instanceof HTMLElement && child.dataset.luscentId) {
                existingItems.set(child.dataset.luscentId, child);
            }
        });

        // Track processed keys
        const processedKeys = new Set<string>();

        // Update or add items
        for (const item of items) {
            const keyValue = String(item[keyName]);
            processedKeys.add(keyValue);

            if (existingItems.has(keyValue)) {
                // Update existing item
                const existingElement = existingItems.get(keyValue)!;
                await renderValue(context, getters, existingElement, item);
                await renderAttributes(context, attributes, existingElement, item);
                bindEvents(context, methods, existingElement);
            } else {
                // Add new item
                const clone = template.content.cloneNode(true) as DocumentFragment;
                Array.from(clone.children).forEach((child) => {
                    if (child instanceof HTMLElement) {
                        child.dataset.luscentId = keyValue;
                    }
                });
                element.appendChild(clone);

                const addedElement = element.lastElementChild as HTMLElement;
                if (addedElement) {
                    await renderValue(context, getters, addedElement, item);
                    await renderAttributes(context, attributes, addedElement, item);
                    bindEvents(context, methods, addedElement);
                }
            }
        }

        // Remove items that are no longer in the list
        existingItems.forEach((child, key) => {
            if (!processedKeys.has(key)) {
                child.remove();
            }
        });
    }
}

function renderBind<T extends State>(context: Context<T>, root: ParentNode = document): void {
    const elements = findElementsByAttribute('data-luscent-bind', root);

    for (const element of elements) {
        if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) continue;

        const key = element.dataset.luscentBind;
        if (!key || !(key in context.state)) continue;

        // Update input from state
        const value = context.state[key as keyof typeof context.state];
        element.value = String(value || '');
    }
}

function bindTwoWay<T>(context: Context<T>, methods: Record<string, Method<T>>, updateStateFn: (state: Partial<T>) => Promise<void>, root: ParentNode = document): void {
    const elements = findElementsByAttribute('data-luscent-bind', root);

    for (const element of elements) {
        if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) continue;

        const key = element.dataset.luscentBind;
        if (!key) continue;

        // Skip if already bound
        if (element.dataset.luscentBound === 'true') continue;

        // Mark as bound
        element.dataset.luscentBound = 'true';

        // Add input event listener
        element.addEventListener('input', async () => {
            const newState = { [key]: element.value } as unknown as Partial<T>;
            await updateStateFn(newState);
        });
    }
}

function bindEvents<T>(context: Context<T>, methods: Record<string, Method<T>>, root: ParentNode = document): void {
    // Find all elements with event triggers
    const elements = Array.from(root.querySelectorAll('[data-luscent-on][data-luscent-trigger]'));

    for (const element of elements) {
        if (!(element instanceof HTMLElement)) continue;

        // Skip if already bound
        if (element.dataset.luscentBound === 'true') continue;

        const eventName = element.dataset.luscentOn;
        const methodName = element.dataset.luscentTrigger;

        if (!eventName || !methodName || !methods[methodName]) continue;

        // Mark as bound
        element.dataset.luscentBound = 'true';

        element.addEventListener(eventName, async (event) => {
            // Prevent default if specified
            if (element.dataset.luscentPreventDefault === 'true') {
                event.preventDefault();
            }

            // Get ID for this element
            const id = element.dataset.luscentId ||
                (element.closest('[data-luscent-id]')?.getAttribute('data-luscent-id') || undefined);

            // Call method
            await methods[methodName](context.state, event, id);
        });
    }
}

// Main rendering function
async function updateDOM<T extends State>(
    context: Context<T>,
    getters: Record<string, Getter<T>>,
    methods: Record<string, Method<T>>,
    conditions: Record<string, Condition<T>>,
    lists: Record<string, List<T>>,
    attributes: Record<string, AttributeGetter<T>>,
    root: ParentNode = document
): Promise<void> {
    // First, render all conditionals
    await renderIf(context, getters, methods, conditions, lists, attributes, root);

    // Then render lists (for loops)
    await renderFor(context, getters, methods, conditions, lists, attributes, root);

    // Then render regular values
    await renderValue(context, getters, root);

    // Then update attributes
    renderAttributes(context, attributes, root);

    // Then handle two-way binding
    renderBind(context, root);
}

// Main start function
function start<T extends State>(parameters: StartParameters<T>): App<T> {
    const state = parameters.state || {} as T;
    const methods = parameters.methods || {};
    const getters = parameters.getters || {};
    const conditions = parameters.conditions || {};
    const lists = parameters.lists || {};
    const attributes = parameters.attributes || {};

    const context: Context<T> = { state };

    // Function to update state and re-render
    const updateState = async (newState: Partial<T>): Promise<void> => {
        // Update state
        Object.assign(context.state, newState);

        // Re-render DOM
        await updateDOM(context, getters, methods, conditions, lists, attributes);

        // Bind events and two-way binding
        bindEvents(context, methods, document);
        bindTwoWay(context, methods, updateState, document);
    };

    // Initial render
    setTimeout(async () => {
        await updateDOM(context, getters, methods, conditions, lists, attributes);
        bindEvents(context, methods, document);
        bindTwoWay(context, methods, updateState, document);
        console.log('Luscent initialized successfully');
    }, 0);

    return { updateState };
}

export { start };
