﻿var xlsxImport;
(function (xlsxImport) {
    function drawWorksheet(workbook, sheetIndex, rootElement, maxRows, maxColumns) {
        //NOTES:
        //Empty cells' values are numeric NaN, format is "General"
        //
        //Excessive empty properties:
        //fill.color = undefined
        //
        // netFormat should return '' for ''. What is 'General'?
        // font.color should start with '#'?
        // Column/row styles are applied to each cell style, this is convenient, but Column/row style info should be kept,
        // for column/row level styling
        // formats conversion is incorrect - dates and virtually everything; netFormat - return array of formats?
        // ?row heights - see hello.xlsx
        if (!workbook || !workbook.sheets || sheetIndex < 0 || workbook.sheets.length == 0) {
            return;
        }
        sheetIndex = Math.min(sheetIndex, workbook.sheets.length - 1);

        if (maxRows == null) {
            maxRows = 200;
        }
        if (maxColumns == null) {
            maxColumns = 100;
        }

        // Namespace and XlsxConverter shortcuts.
        var xcNs = wijmo.xlsx, xc = xcNs.XlsxConverter;
        var sheet = workbook.sheets[sheetIndex];
        var defaultRowHeight = 20, defaultColumnWidth = 60;
        var tableEl = document.createElement('table');
        tableEl.border = '1';
        tableEl.style.borderCollapse = 'collapse';

        var maxRowCells = 0;
        for (var r = 0; sheet.rows && r < sheet.rows.length; r++) {
            if (sheet.rows[r] && sheet.rows[r].cells) {
                maxRowCells = Math.max(maxRowCells, sheet.rows[r].cells.length);
            }
        }

        // add columns
        var columnCount = 0;
        if (sheet.cols) {
            columnCount = sheet.cols.length;
            maxRowCells = Math.min(Math.max(maxRowCells, columnCount), maxColumns);
            for (var c = 0; c < maxRowCells; c++) {
                var col = c < columnCount ? sheet.cols[c] : null, colEl = document.createElement('col');
                tableEl.appendChild(colEl);
                var colWidth = defaultColumnWidth + 'px';
                if (col) {
                    importStyle(colEl.style, col.style);
                    if (col.autoWidth) {
                        colWidth = '';
                    } else if (col.width != null) {
                        colWidth = col.width + 'px';
                    }
                }
                colEl.style.width = colWidth;
            }
        }

        // generate rows
        var rowCount = Math.min(maxRows, sheet.rows.length);
        for (var r = 0; sheet.rows && r < rowCount; r++) {
            var row = sheet.rows[r], rowEl = document.createElement('tr');
            tableEl.appendChild(rowEl);
            if (row) {
                importStyle(rowEl.style, row.style);
                if (row.height != null) {
                    rowEl.style.height = row.height + 'px';
                }
                for (var c = 0; row.cells && c < row.cells.length; c++) {
                    var cell = row.cells[c], cellEl = document.createElement('td');
                    rowEl.appendChild(cellEl);
                    if (cell) {
                        importStyle(cellEl.style, cell.style);
                        var value = cell.value;
                        if (!(value == null || value !== value)) {
                            var netFormat = '';
                            if (cell.style && cell.style.format) {
                                // TBD: debug
                                //if (wijmo.isNumber(value)) {
                                //    var bbb = true;
                                //} else if (wijmo.isDate(value)) {
                                //    var qqq = true;
                                //}
                                //
                                // TBD: single netFormat() function; it should convert empty format to empty one.
                                netFormat = xc.netFormat(cell.style.format)[0];
                            }
                            var fmtValue = netFormat ? wijmo.Globalize.format(value, netFormat) : value;

                            //cellEl.textContent = wijmo.escapeHtml(fmtValue);
                            cellEl.innerHTML = wijmo.escapeHtml(fmtValue);
                        }
                        if (cell.colSpan && cell.colSpan > 1) {
                            cellEl.colSpan = cell.colSpan;
                            c += cellEl.colSpan - 1;
                        }
                    }
                }
            }

            // pad with empty cells
            var padCellsCount = maxRowCells - (row && row.cells ? row.cells.length : 0);
            for (var i = 0; i < padCellsCount; i++) {
                rowEl.appendChild(document.createElement('td'));
            }
            if (!rowEl.style.height) {
                rowEl.style.height = defaultRowHeight + 'px';
            }
        }

        // do it at the end for performance
        rootElement.appendChild(tableEl);
    }
    xlsxImport.drawWorksheet = drawWorksheet;

    function importStyle(cssStyle, xlsxStyle) {
        if (!xlsxStyle) {
            return;
        }
        if (xlsxStyle.fill) {
            if (xlsxStyle.fill.color) {
                cssStyle.backgroundColor = xlsxStyle.fill.color;
            }
        }
        if (xlsxStyle.hAlign && xlsxStyle.hAlign != 4 /* Fill */) {
            cssStyle.textAlign = wijmo.xlsx.HAlign[xlsxStyle.hAlign].toLowerCase();
        }
        var font = xlsxStyle.font;
        if (font) {
            if (font.family) {
                cssStyle.fontFamily = font.family;
            }
            if (font.bold) {
                cssStyle.fontWeight = 'bold';
            }
            if (font.italic) {
                cssStyle.fontStyle = 'italic';
            }
            if (font.size != null) {
                cssStyle.fontSize = font.size + 'px';
            }
            if (font.underline) {
                cssStyle.textDecoration = 'underline';
            }
            if (font.color) {
                cssStyle.color = font.color;
            }
        }
    }
})(xlsxImport || (xlsxImport = {}));
//# sourceMappingURL=drawWorkbook.js.map
