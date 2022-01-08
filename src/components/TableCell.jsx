import React from 'react';

export function TableCell(props) {
    const { 
        value, 
        rowIndex, 
        column, 
        handleChangeCell,
    } = props;

    let cellContents;

    if (column.edit) {
        switch (column.type) {
            case 'TEXT':
                cellContents = (
                    <input 
                        className="cell-input-text"
                        type="text"
                        value={value}
                        onChange={handleChangeCell}
                    />
                );
                break;
            case 'BOOLEAN':
                cellContents = (
                    <input 
                        className="cell-input-boolean"
                        type="checkbox"
                        value={!!value}
                        onChange={handleChangeCell}
                    />
                );
                break;
            default:
                cellContents = (
                    <input 
                        className="cell-input-text"
                        type="text"
                        value={value}
                        onChange={handleChangeCell}
                    />
                );
        }
    }
    else {
        switch (column.type) {
            case 'TEXT':
                cellContents = value;
                break;
            case 'BOOLEAN':
                cellContents = value ? '✅' : '❌'; 
                break;
            default:
        }
    }

    return (
        <td 
            row={rowIndex}
            column={column.property}
        >
            {cellContents}
        </td>
    );
}