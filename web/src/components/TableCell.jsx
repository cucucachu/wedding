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
    let className = '';

    if (column.edit) {
        switch (column.type) {
            case 'TEXT':
                cellContents = (
                    <input 
                        className="cell-input-text"
                        type="text"
                        value={value}
                        onChange={handleChangeCell}
                        name={column.property}
                    />
                );
                break;
            case 'EMAIL':
                cellContents = (
                    <input 
                        className="cell-input-text"
                        type="email"
                        value={value}
                        onChange={handleChangeCell}
                        name={column.property}
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
                        name={column.property}
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
                        name={column.property}
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
                if (!column.showOnlyIfValue || value) {
                    cellContents = <button onClick={column.onClick}>{column.buttonText}</button>
                    className = 'button-cell';
                }
                else {
                    cellContents = ''
                }
                break;
            case 'BUTTONS':
                cellContents = column.buttons.map(b => (
                    <button 
                        key={`${rowIndex}-${b.property}-button`} 
                        onClick={b.onClick}
                        name={b.property}
                    >
                        {b.buttonText}
                    </button>
                ))
                className = 'buttons-cell';
                break;
            default:
        }
    }

    return (
        <td 
            row={rowIndex}
            column={column.property}
            name={column.property}
            className={className}
        >
            {cellContents}
        </td>
    );
}