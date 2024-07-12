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
import TableNoData from '../table-no-data';
import GenreTableRow from '../genre-table-row';
import GenreTableHead from '../genre-table-head';
import TableEmptyRows from '../table-empty-rows';
import GenreTableToolbar from '../genre-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function GenrePage() {
  const [page, setPage] = useState(0);
  const [genres, setGenres] = useState([])

  const [order, setOrder] = useState('asc');



  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };




  useEffect(() => {
    const getAllGenre = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/genres`);
        // console.log(response.data)
        setGenres(response.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getAllGenre();
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

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: genres,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Quản lý thể loại</Typography>

        <Button onClick={handleClickOpen} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Thêm thể loại
        </Button>
      </Stack>
      <FormDialog open={open} handleClose={handleClickClose} />

      <Card>
        <GenreTableToolbar

          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <GenreTableHead
                order={order}
                orderBy={orderBy}
                rowCount={genres.length}

                onRequestSort={handleSort}
                headLabel={[
                  { id: 'id', label: 'Id' },
                  { id: 'name', label: 'Tên' },
                  { id: "menu", label: "" },

                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <GenreTableRow
                      key={row.id}
                      id={row.id}
                      name={row.name}

                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, genres.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={genres.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
