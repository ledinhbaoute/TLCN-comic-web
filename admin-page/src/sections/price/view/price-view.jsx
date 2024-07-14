import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { users } from 'src/_mock/user';
import API_URL from 'src/config/config';

import Scrollbar from 'src/components/scrollbar';

import { emptyRows } from '../utils';
import TableNoData from '../table-no-data';
import PriceTableRow from '../price-table-row';
import GenreTableHead from '../price-table-head';
import TableEmptyRows from '../table-empty-rows';


// ----------------------------------------------------------------------

export default function PricePage() {
  const [page, setPage] = useState(0);
  const [prices, setPrices] = useState([])

  const [order, setOrder] = useState('asc');



  const [orderBy, setOrderBy] = useState('name');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const getAllPrice = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/admin/price`, {
          headers: {
            "Authorization": `Bearer ${Cookies.get("access_token")}`,
          }
        });
        setPrices(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getAllPrice();
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

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Điều chỉnh giá theo lượt xem</Typography>
      </Stack>
      <Typography variant="h7" >Với tổng số lượt xem mới tăng trong mỗi tháng, tương ứng với số view-lợi nhuận ở bảng bên dưới sẽ là số lợi nhuận mà tác giả nhận được</Typography>
          <Card>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <GenreTableHead
                order={order}
                orderBy={orderBy}
                rowCount={prices.length}

                onRequestSort={handleSort}
                headLabel={[
                  { id: 'view', label: 'Số view' },
                  { id: 'cost', label: 'Lợi nhuận (VND)' },
                  { id: 'premium', label: 'Loại truyện' },
                  { id: "menu", label: "" },

                ]}
              />
              <TableBody>
                {prices
                  .map((row,index) => (
                    <PriceTableRow
                      key={index}
                      id={row.id}
                      view={row.view}
                      cost={row.cost}
                      type={row.type}

                    />  
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, prices.length)}
                />

                {prices.length===0 && <TableNoData/>}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={prices.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
