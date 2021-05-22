import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { getAllRecipes } from '../services/recipesService';

const columns = [
  { field: 'name' },
  { field: 'time', type: 'number' },
  { field: 'username', type: 'string' },
  { field: 'shareDate', type: 'date',
  sortComparator: (v1, v2, param1, param2) =>
      param1.api.getCellValue(param1.id, 'age') -
      param2.api.getCellValue(param2.id, 'age'),
    width: 150},
    
];

const rows = getAllRecipes

const sortModel = [
  {
    field: 'shareDate',
    sort: 'desc',
  },
];

// filterModel={{
//     items: [
//       { columnField: 'commodity', operatorValue: 'contains', value: 'rice' },
//     ],
//   }}
  
export default function ComparatorSortingGrid() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid sortModel={sortModel} rows={rows} columns={columns} />
    </div>
  );
}