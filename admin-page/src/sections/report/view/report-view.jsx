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

import API_URL from 'src/config/config';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import ReportTableRow from '../report-table-row';
import ReportTableHead from '../report-table-head';
import ReportCommentTableRow from '../report-comment-table-row';
import { emptyRows, applyFilter, getComparator } from '../utils';




// ----------------------------------------------------------------------

export default function ReportPage() {
  const [page, setPage] = useState(0);
  const [reportComics,setReportComics]=useState([])
  const [reportComments,setReportComments]=useState([])

  const [order, setOrder] = useState('asc');

  

  const [orderBy, setOrderBy] = useState('name');

  const [rowsPerPage, setRowsPerPage] = useState(5);


useEffect(() => {
  const getAllReportComic = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/admin/report_comic`,{
            headers:{
                "Authorization":`Bearer ${Cookies.get("access_token")}`,
            }
        });
      
        setReportComics(response.data)
        console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  }
  getAllReportComic();
}, []);

useEffect(() => {
  const getAllReportComment = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/admin/report_comment`,{
            headers:{
                "Authorization":`Bearer ${Cookies.get("access_token")}`,
            }
        });
      
        setReportComments(response.data)
        console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  }
  getAllReportComment();
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


const dataFiltered = applyFilter({
  inputData: reportComics,
  comparator: getComparator(order, orderBy),
});
const dataFilteredComment = applyFilter({
  inputData: reportComments,
  comparator: getComparator(order, orderBy),
});

const notFound = !dataFiltered.length;
const reportCommentNotFound=!dataFilteredComment.length;

return (
  <Container>
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Typography variant="h4">Báo cáo truyện</Typography>

    </Stack>

    <Card>
    

      <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <ReportTableHead
              order={order}
              orderBy={orderBy}
              rowCount={reportComics.length}
            
              onRequestSort={handleSort}
              headLabel={[
                { id: 'book', label: 'Truyện' },
                { id: 'reasons', label: 'Lí do' },
                { id: 'date', label: 'Thời gian báo cáo' },
                // { id: 'isVerified', label: 'Verified', align: 'center' },
                { id: 'status', label: 'Trạng thái' },
                { id: '' },
              ]}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <ReportTableRow
                    key={row.id}
                    id={row.id}
                    comicId={row.comicBook.id}
                    date={row.reportDate}
                    comicName={row.comicBook.name}
                    reasons={row.reportReasons.map((item)=>(`${item.reason} `))}
                    status={row.status===1 ? "Pending":"Banned"}
                    avatarUrl={`${API_URL}/files/${row.comicBook.image}`}
                    
                  />
                ))}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, reportComics.length)}
              />

              {notFound && <TableNoData />}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        page={page}
        component="div"
        count={reportComics.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
                    
    



    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}  sx={{ marginTop:20 }}>
      <Typography variant="h4">Báo cáo bình luận</Typography>

    </Stack>
    <Card>
      <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <ReportTableHead
              order={order}
              orderBy={orderBy}
              rowCount={reportComments.length}
        
              headLabel={[
                { id: 'comment', label: 'ID' },
                { id: 'content', label: 'Nội dung báo cáo' },
                { id: 'date', label: 'Thời gian' },
                { id: 'reasons', label: 'Lí do' },
                // { id: 'isVerified', label: 'Verified', align: 'center' },
                { id: 'status', label: 'Trạng thái' },
                { id: '' },
              ]}
            />
            <TableBody>
              {dataFilteredComment
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <ReportCommentTableRow
                    key={row.id}
                    id={row.id}
                    commentId={row.comment.id}
                    content={row.comment.content}
                    date={row.reportDate}
                    status={row.status===1 ? "Active":"Banned"}
                    reasons={row.reportReasons.map((item)=>(`${item.reason} `))}
                    
                  />
                ))}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, reportComics.length)}
              />

              {reportCommentNotFound && <TableNoData/>}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        page={page}
        component="div"
        count={reportComments.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card> 
  </Container>
);
}
