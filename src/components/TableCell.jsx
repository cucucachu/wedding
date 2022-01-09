import React from 'react';

import { Checkbox } from './Checkbox';

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
                cellContents = <Checkbox checked={value}/>; 
                break;
            case 'BUTTON':
                cellContents = <button onClick={column.onClick}>{column.buttonText}</button>
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