import * as XLSX from 'xlsx';
// let fileName;
export async function exportToExcel(tableName: string, exportFileName: string) {
  /* pass here the table id */
  const element = document.getElementById(tableName);
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

  /* generate workbook and add the worksheet */
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */
  return XLSX.writeFile(wb, `${exportFileName + '.xlsx'}`);
}
