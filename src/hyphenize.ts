const hyphenize = (text: string): string =>
    text
        .replace(/([A-Z])/g, '-$1')
        .replace(/[\s_-]+/g, '-')
        .toLowerCase()
        .replace(/^-/, '')
        .replace(/-$/, '');

export default hyphenize;
