import React from 'react';
import { TableRow } from './TableRow';
import { TitleWithButtons } from './TitleWithButtons';

export function Table(props) {
    const {
        title,
        data,
        columns,
        handleChangeCell,
        keyPrefix,
        leftButtons,
        rightButtons,
    } = props;

    const tableHeaders = columns.map((c, i) => <th key={`${keyPrefix}-header-${i}${c.name}`}>{c.name}</th>)

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
            {title && 
                <TitleWithButtons 
                    title={title}
                    leftButtons={leftButtons}
                    rightButtons={rightButtons}
                />
            }
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