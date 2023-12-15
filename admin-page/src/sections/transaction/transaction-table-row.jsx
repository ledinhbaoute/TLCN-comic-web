import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
// ----------------------------------------------------------------------

export default function PackageTableRow({

  id,
  username,
  createdAt,
  amount,
  content,

}) {
  // const [open, setOpen] = useState(null);
  // const router = useRouter();
  // const [openEdit, setOpenEdit] = useState(false);

  // const handleClickOpen = () => {
  //   setOpenEdit(true);
  // };
  // const handleClickClose = () => {
  //   setOpenEdit(false);
  // };

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };
  // const deletePackage = async () => {
  //   try {
  //     const response = await axios.delete(`${API_URL}/admin/genres`,
  //       {
  //         headers: {
  //           "Authorization": `Bearer ${Cookies.get("access_token")}`,
  //           "Content-Type": "application/x-www-form-urlencoded"

  //         }, data: { genreId:id },
  //       });
  //       console.log(response.data)

  //   } catch (error) {
  //     console.error('Error increasing view:', error);
  //   }
  // };
  // const handleDeletePAckage=()=>{
  //   deleteGenre();
  //   handleCloseMenu()
  //   router.reload()
  // }

  return (
    <>
      <TableRow hover tabIndex={-1} >
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}
        <TableCell>{id}</TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>

            <Typography variant="subtitle2" noWrap>
              {username}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{amount}</TableCell>
        <TableCell>{content}</TableCell>
        <TableCell>{createdAt}</TableCell>



        {/* <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      {/* <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >

        <MenuItem onClick={handleClickOpen}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        

        <MenuItem onClick={handleDeletePackage} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}
    </>
  );
}

PackageTableRow.propTypes = {
  id: PropTypes.string,
  username: PropTypes.any,
  createdAt:PropTypes.string,
  amount:PropTypes.number,
  content:PropTypes.string,

};
