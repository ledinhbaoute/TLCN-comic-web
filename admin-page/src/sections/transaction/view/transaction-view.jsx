import axios from 'axios';
import dayjs from "dayjs";
import numeral from 'numeral';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import API_URL from 'src/config/config';

import Scrollbar from 'src/components/scrollbar';

// import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import TransactionTableRow from '../transaction-table-row';
import TransactionTableHead from '../transaction-table-head';
// import PackageTableToolbar from '../package-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';


// ----------------------------------------------------------------------

export default function TransactionPage() {
  const [page, setPage] = useState(0);
  const [transactions, setTransactions] = useState([])
  const [transactionToFilter, setTransactionToFilter] = useState([])
  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  // const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [open, setOpen] = useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClickClose = () => {
  //   setOpen(false);
  // };

  const getAllTransaction = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/admin/transaction`, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("access_token")}`,
        }
      });
      // console.log(response.data)
      setTransactions(response.data)
      setTransactionToFilter(response.data)


    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getAllTransaction();
  },[]);
  const filteredTransactions = transactionToFilter.filter((transaction) => {
    if (startDate && endDate) {
      const transactionDate = dayjs(transaction.createdAt);
    
      return transactionDate >= startDate && transactionDate <= endDate;
    }
    return transactionToFilter;
  });
  useEffect(() => {
    setTransactions(filteredTransactions !== null && filteredTransactions);
  }, [startDate, endDate,filteredTransactions])


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
    inputData: transactions,
    comparator: getComparator(order, orderBy),
  });

  const totalValue = transactions.reduce((accumulator, transaction) =>
    accumulator + transaction.amount
    , 0)
  // const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Giao dịch đăng ký premium</Typography>
{/* 
        <Button onClick={handleClickOpen} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Package
        </Button> */}
      </Stack>
      <LocalizationProvider dateAdapter={AdapterDayjs}>

        <DatePicker
          label="Từ ngày"
          value={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker sx={{ marginLeft: 10, marginBottom: 5 }}
          label="Đến ngày"
          value={endDate}
          onChange={(date) => setEndDate(date)}
        />
      </LocalizationProvider>

      <Card>
        {/* <PackageTableToolbar

          filterName={filterName}
          onFilterName={handleFilterByName}
        /> */}

        <Scrollbar>

          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TransactionTableHead
                order={order}
                orderBy={orderBy}
                rowCount={transactions.length}

                onRequestSort={handleSort}
                headLabel={[
                  { id: 'id', label: 'Id' },
                  { id: 'username', label: 'User Name' },
                  { id: "amount", label: "Số tiền (VND)" },
                  { id: "title", label: "Nội dung" },

                  { id: "createdAt", label: "Thời gian" },


                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (

                    <TransactionTableRow
                      key={row.id}
                      id={row.id}
                      username={row.wallet.user.userName}
                      content={row.title}
                      amount={numeral(row.amount).format('0,0')}
                      createdAt={row.createdAt}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, transactions.length)}
                />


              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Typography variant="h6" sx={{ float: 'right', marginRight: 10 }}>Tổng:{numeral(totalValue).format('0,0')} VND</Typography>
      </Card>
    </Container>
  );
}
