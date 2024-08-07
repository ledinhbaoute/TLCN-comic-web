import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';


export default function TableNoData() {
  return (
    <TableRow>
      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" paragraph>
            Không có báo cáo
          </Typography>

          <Typography variant="body2">
            Không có báo cáo
          
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}

