import axios from 'axios';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { users } from 'src/_mock/user';
import API_URL from 'src/config/config';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [users,setUsers]=useState([])

  const [order, setOrder] = useState('asc');

  // const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);


useEffect(() => {
  const getAllUser = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/all-user`);
        setUsers(response.data)
    } catch (error) {
      console.error(error);
    }
  }
  getAllUser();
}, []);

const handleSort = (event, id) => {
  const isAsc = orderBy === id && order === 'asc';
  if (id !== '') {
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  }
};

// const handleSelectAllClick = (event) => {
//   if (event.target.checked) {
//     const newSelecteds = users.map((n) => n.name);
//     setSelected(newSelecteds);
//     return;
//   }
//   setSelected([]);
// };

// const handleClick = (event, name) => {
//   const selectedIndex = selected.indexOf(name);
//   let newSelected = [];
//   if (selectedIndex === -1) {
//     newSelected = newSelected.concat(selected, name);
//   } else if (selectedIndex === 0) {
//     newSelected = newSelected.concat(selected.slice(1));
//   } else if (selectedIndex === selected.length - 1) {
//     newSelected = newSelected.concat(selected.slice(0, -1));
//   } else if (selectedIndex > 0) {
//     newSelected = newSelected.concat(
//       selected.slice(0, selectedIndex),
//       selected.slice(selectedIndex + 1)
//     );
//   }
//   setSelected(newSelected);
// };

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setPage(0);
  setRowsPerPage(parseInt(event.target.value, 10));
};

const handleFilterByName = (event) => {
  setPage(0);
  setFilterName(event.target.value);
};

const dataFiltered = applyFilter({
  inputData: users,
  comparator: getComparator(order, orderBy),
  filterName,
});

const notFound = !dataFiltered.length && !!filterName;

return (
  <Container>
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Typography variant="h4">Quản lý người dùng</Typography>

      <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
        Thêm user
      </Button>
    </Stack>

    <Card>
      <UserTableToolbar
        
        filterName={filterName}
        onFilterName={handleFilterByName}
      />
      

      <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <UserTableHead
              order={order}
              orderBy={orderBy}
              rowCount={users.length}
          
              onRequestSort={handleSort}
              headLabel={[
                { id: 'name', label: 'Tên' },
                { id: 'email', label: 'Email' },
                { id: 'phoneNumber', label: 'Số điện thoại' },
                { id: 'status', label: 'Trạng thái' },
                { id: '' },
              ]}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <UserTableRow
                    key={row.id}
                    username={row.userName}
                    name={row.name}
                    phoneNumber={row.phoneNumber}
                    status={!row.locked ? "Khả dụng":"Khóa"}
                    email={row.email}
                    avatarUrl={row.avatar}
                    isVerified={row.isVerified}
                   
                   
                  />
                ))}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, users.length)}
              />

              {notFound && <TableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        page={page}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  </Container>
);
}
