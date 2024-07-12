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

import FormDialog from '../dialog-form';
// import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import PackageTableRow from '../package-table-row';
import PackageTableHead from '../package-table-head';
// import PackageTableToolbar from '../package-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function PackagePage() {
  const [page, setPage] = useState(0);
  const [packages, setPackages] = useState([])

  const [order, setOrder] = useState('asc');



  const [orderBy, setOrderBy] = useState('name');

  // const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };




  useEffect(() => {
    const getAllPackage = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/package_premium`);
        // console.log(response.data)
        setPackages(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getAllPackage();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // const handleFilterByName = (event) => {
  //   setPage(0);
  //   setFilterName(event.target.value);
  // };

  const dataFiltered = applyFilter({
    inputData: packages,
    comparator: getComparator(order, orderBy),
  });

  // const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Quản lý gói premium</Typography>

        <Button onClick={handleClickOpen} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Thêm gói mới
        </Button>
      </Stack>
      <FormDialog open={open} handleClose={handleClickClose} />

      <Card>
        {/* <PackageTableToolbar

          filterName={filterName}
          onFilterName={handleFilterByName}
        /> */}

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <PackageTableHead
                order={order}
                orderBy={orderBy}
                rowCount={packages.length}

                onRequestSort={handleSort}
                headLabel={[
                  { id: 'id', label: 'Id' },
                  { id: 'cost', label: 'Giá (VND)' },
                  { id: "Duration", label: "Thời hạn (Ngày)" },
                  { id: "Menu", label: "" },

                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <PackageTableRow
                      key={row.id}
                      id={row.id}
                      cost={row.cost}
                      duration={row.duration}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, packages.length)}
                />

             
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={packages.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
