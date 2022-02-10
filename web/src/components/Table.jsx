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
    
    const isMobile = window.matchMedia("only screen and (max-width: 500px)").matches;

    const tableHeaders = columns.map((c, i) => {
        if (!c.doNotShowOnMobile || !isMobile) {
            return <th key={`${keyPrefix}-header-${i}${c.name}`}>{c.name}</th>
        }
        else return null;
    })

    const rows = data.map((row, rowIndex) => 
        <TableRow
            keyPrefix={`${keyPrefix}-row-${rowIndex}`}
            key={`${keyPrefix}-row-${rowIndex}`}
            data={row}
            rowIndex={rowIndex}
            columns={columns}
            handleChangeCell={handleChangeCell}
            isMobile={isMobile}
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