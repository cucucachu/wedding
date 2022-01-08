import React from 'react';
import { TableRow } from './TableRow';

export function Table(props) {
    const {
        title,
        data,
        columns,
        handleChangeCell,
        keyPrefix,
    } = props;

    const tableHeaders = columns.map(c => <th key={`${keyPrefix}-header-${c.name}`}>{c.name}</th>)

    const rows = data.map((row, rowIndex) => 
        <TableRow
            keyPrefix={`${keyPrefix}-row-${rowIndex}`}
            key={`${keyPrefix}-row-${rowIndex}`}
            data={row}
            rowIndex={rowIndex}
            columns={columns}
            handleChangeCell={handleChangeCell}
        />
    )

    return (
        <div className="table-container">
            {title && <h3>{title}</h3>}
            <table>
                <thead>
                    <tr>
                        {tableHeaders}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>

        </div>
    );
}