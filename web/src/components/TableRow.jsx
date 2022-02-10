import React from 'react';
import { Table } from './Table';
import { TableCell } from './TableCell';

export function TableRow(props) {
    const { 
        data, 
        rowIndex, 
        columns, 
        handleChangeCell,
        keyPrefix,
        isMobile,
    } = props;

    const cells = columns.map(column => {
        if (!column.doNotShowOnMobile || !isMobile) {
            return (
                <TableCell 
                    key={`${keyPrefix}-cell-${column.property}`}
                    value={data[column.property]}
                    rowIndex={rowIndex}
                    column={column}
                    handleChangeCell={handleChangeCell}
                />
            )
        }
        else return null;
    })

    return (
        <tr rowid={data.id}>
            {cells}
        </tr>
    );
}