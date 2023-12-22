import axios from 'axios';
import Cookies from 'js-cookie'
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import API_URL from 'src/config/config';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import ConfirmDialog from '../dialog/confirm-dialog';
// ----------------------------------------------------------------------

export default function ReportCommentTableRow({
    id,
    commentId,
    reasons,
    content,
    date,
    status,

}) {
    const [open, setOpen] = useState(null);
    const [openConfirmDialog,setOpenConfirmDialog]=useState(false)
    const router = useRouter();
    const handleOpenConfirmDialog = (event) => {
        setOpenConfirmDialog(true);
      };
      const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
      };

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };
    const deleteComment = async () => {
        try {
            const response = await axios.delete(`${API_URL}/admin/comment`,
                {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("access_token")}`,
                        "Content-Type": "application/x-www-form-urlencoded"

                    }, data: { commentId },
                });
            console.log(response.data)

        } catch (error) {
            console.error( error);
        }
    };
    const deleteReportComment = async () => {
        try {
            const response = await axios.delete(`${API_URL}/admin/report_comment`,
                {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("access_token")}`,
                        "Content-Type": "application/x-www-form-urlencoded"

                    }, data: { id },
                });
            console.log(response.data)

        } catch (error) {
            console.error('Error increasing view:', error);
        }
    };
    const handleDeleteComment = () => {
        deleteComment();
        handleCloseMenu()
        router.reload()
    }
    const handleDeleteReportComment = () => {
        deleteReportComment();
        handleCloseMenu()
        router.reload()
    }



    return (
        <>
            <TableRow hover tabIndex={-1} >
                {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

                <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        
                        {/* <Link to={`http://localhost:3000/comic-detail/${comicId}`}> */}
                            <Typography variant="subtitle2" noWrap>
                                {commentId}
                            </Typography>
                    </Stack>
                </TableCell>
                <TableCell>{content}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{reasons}</TableCell>


                {/* <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell> */}

                <TableCell>
                    <Label color={(status === 'Banned' && 'error') || 'success'}>{status}</Label>
                </TableCell>

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

                <MenuItem onClick={handleOpenConfirmDialog}>
                    Delete Comment
                </MenuItem>
                <MenuItem onClick={handleDeleteReportComment}>
                    Skip
                </MenuItem>
            </Popover>
            <ConfirmDialog content='Are you sure to delete this comment?' open={openConfirmDialog} handleClose={handleCloseConfirmDialog} handleConfirm={handleDeleteComment}/>
        </>
    );
}

ReportCommentTableRow.propTypes = {
    id: PropTypes.number,
    commentId:PropTypes.number,
    reasons: PropTypes.any,
    // isVerified: PropTypes.any,
    content: PropTypes.any,
    date: PropTypes.any,
    status: PropTypes.string,
};
