import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { getAllRecipes } from '../services/recipesService';
import { CssBaseline } from '@material-ui/core';
import { Typography } from '@material-ui/core';

// const columns = [
//   { field: 'name' },
//   { field: 'time', type: 'number' },
//   { field: 'username', type: 'string' },
//   { field: 'shareDate', type: 'date'}
// ];

// const rows = getAllRecipes

// const sortModel = [
//   {
//     field: 'shareDate',
//     sort: 'desc',
//   },
// ];

// filterModel={{
//     items: [
//       { columnField: 'commodity', operatorValue: 'contains', value: 'rice' },
//     ],
//   }}

const columns = [
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
];

const rows = getAllRecipes
// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function Dashboard() {
  return (
    <React.Fragment>
      <CssBaseline/>
<Typography>Hello</Typography>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
</React.Fragment>
  );
}