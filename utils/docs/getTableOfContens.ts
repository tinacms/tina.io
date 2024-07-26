export default function getTableOfContents(markdown) {
    const toc = [];
    markdown.forEach(item => {
        if (item.type === 'h2' || item.type === 'h3') {
            const headerText = item.children.map(child => child.text).join('');
            toc.push({ type: item.type, text: headerText });
        }
    });

    return toc;
}
