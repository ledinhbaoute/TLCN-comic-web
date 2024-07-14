import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

import EditDialog from './edit-price-dialog';

// ----------------------------------------------------------------------

export default function PriceTableRow({
  view,
  cost,type,id
}) {
  const [open, setOpen] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const handleClickOpen = () => {
    setOpenEdit(true);
  };
  const handleClickClose = () => {
    setOpenEdit(false);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} >
        <TableCell>{view}</TableCell>
        <TableCell>
              {cost}
        </TableCell>
        <TableCell>{type===1?"Thường":"Premium"}</TableCell>


        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
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
          Sửa
        </MenuItem>
        <EditDialog open={openEdit} handleClose={handleClickClose} price={{'id':id,'view':view,'cost':cost}}/>
      </Popover>
    </>
  );
}

PriceTableRow.propTypes = {
  id:PropTypes.number,
  view: PropTypes.number,
  cost:PropTypes.number,
  type:PropTypes.number
};
