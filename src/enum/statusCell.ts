export enum StatusCell {
    CHECKBOX = 'checkbox',
    EMPTY = 'empty'
}

export const StatusCellSymbols: Record<StatusCell, string> = {
    [StatusCell.CHECKBOX]: '☐☐☐',
    [StatusCell.EMPTY]: ''
};