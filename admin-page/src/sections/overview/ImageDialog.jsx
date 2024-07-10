import React from 'react';
import PropTypes from 'prop-types'; 

import {Box, Stack, Button,Dialog, DialogTitle, DialogContent,DialogActions} from '@mui/material';

export default function ImageDialog({ open, onClose, images }) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Danh sách hình ảnh</DialogTitle>
        <DialogContent dividers>
          <Stack direction="column" spacing={2}>
            {images.map((image, index) => (
              <Box
                key={index}
                component="img"
                src={image.link}
                alt="hihi"
                sx={{ width: '100%', borderRadius: 1.5 }}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  ImageDialog.propTypes = {
    open: PropTypes.bool,
    onClose:PropTypes.func,
    images:PropTypes.any,
  };