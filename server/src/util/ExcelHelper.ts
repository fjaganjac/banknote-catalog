import * as _ from "lodash";
import * as XLSX from "xlsx";

const dc = XLSX.utils.decode_cell,
  ec = (r: any, c: any) => {
    return XLSX.utils.encode_cell({ r: r, c: c });
  };

/**
 * Find a sheet in the workbook by name, and return an object with keys
 * `sheet` and `range`, where `range` is an object describing the valid cells
 * of the sheet, like `{min: {r: 1, c: 1}, max: {r: 5, c:5}}`.
 */
export function findSheet(workbook: XLSX.WorkBook, sheetName: string) {
  let sheet = workbook.Sheets[sheetName],
    range = { min: { r: 0, c: 0 }, max: { r: 0, c: 0 } };

  if (!sheet) {
    return { sheet: null, range: null };
  }

  // find size of the sheet
  let ref = sheet["!ref"];

  if (!ref || ref.indexOf(":") === -1) {
    throw new Error("Malformed workbook - no !ref property");
  }

  range.min = dc(ref.split(":")[0]);
  range.max = dc(ref.split(":")[1]);

  return { sheet, range };
}

/**
 * Find the start position of a table in the given sheet. `colMap` describes
 * the table columns as an object with key prop -> column title. Returns an
 * object with keys `columns` (maps prop -> 0-indexed column number) and
 * `firstRow`, the number of the first row of the table (will be `null`) if the
 * table was not found.
 */
// colMap: prop -> col name
export function findTable(sheet: XLSX.WorkSheet, range: any, colMap: any) {
  let firstRow = null,
    colsToFind = _.keys(colMap).length,
    // colmap lowercase title -> prop
    colLookup = _.reduce(
      colMap,
      (m: any, v: any, k: any) => {
        m[_.isString(v) ? v.toLowerCase() : v] = k;
        return m;
      },
      {}
    ),
    // colmap props -> 0-indexed column
    columns = _.reduce(
      colMap,
      (m: any, v, k) => {
        m[k] = null;
        return m;
      },
      {}
    );

  // Look for header row and extract columns
  for (let r = range.min.r; r <= range.max.r - 1; ++r) {
    let colsFound = 0;

    for (let c = range.min.c; c <= range.max.c; ++c) {
      let cell = sheet[ec(r, c)];

      if (cell && cell.v !== undefined) {
        let prop = colLookup[cell.t === "s" ? cell.v.toLowerCase() : cell.v];
        if (prop) {
          columns[prop] = c;
          ++colsFound;
        }
      }
    }

    if (colsFound === colsToFind) {
      firstRow = r + 1;
      break;
    }
  }

  return { columns, firstRow };
}

/**
 * Given the `cols` and `firstRow` as returned by `findTable()`, return a list
 * of objects of all table values. Continues to the end of the sheet unless
 * passed a function `stop` that takes a mapped row object as an argument and
 * returns `true` for that row.
 */
export function readTable(
  sheet: XLSX.WorkSheet,
  range: any,
  columns: any,
  firstRow: any,
  stop: any
) {
  let data = [];

  for (let r = firstRow; r <= range.max.r; ++r) {
    let row = _.reduce(
      columns,
      (m: any, c, k) => {
        let cell = sheet[ec(r, c)];
        m[k] = cell ? cell.w : null;
        return m;
      },
      {}
    );

    if (stop && stop(row)) {
      break;
    }

    data.push(row);
  }

  return data;
}

export function extractTableData(
  workbook: XLSX.WorkBook,
  sheetName: string,
  tableName: string,
  columnsMap: object
) {
  let { sheet, range } = findSheet(workbook, sheetName);

  if (sheet === null) {
    return null;
  }

  let { columns, firstRow } = findTable(sheet, range, columnsMap);

  if (firstRow === null) {
    return null;
  }

  const data = readTable(sheet, range, columns, firstRow, (row: any) => false);

  return data;
}
