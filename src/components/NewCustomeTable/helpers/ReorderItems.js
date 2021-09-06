const ReorderItems = (list, startIndex, endIndex) => {
    // Reorder and D&D example: https://codesandbox.io/s/k260nyxq9v
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export default ReorderItems;