import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import Scrollbars from 'react-custom-scrollbars-2';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton  from '@mui/material/ListItemButton';

import API_URL from 'src/config/config';

import ImageDialog from './ImageDialog';


// ----------------------------------------------------------------------

export default function AnalyticsOrderTimeline({ title, chapterName,onAccept, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Stack sx={{ p: 3, pr: 0 }}>
      <Scrollbars
               autoHeight autoHeightMax={332}>
        {list.map((item, index) => (
          <OrderItem key={item.id} item={item} onAccept={onAccept} />
        ))}
        </Scrollbars>
      </Stack>
    </Card>
  );
}

AnalyticsOrderTimeline.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
  chapterName: PropTypes.string,
  onAccept: PropTypes.func, 
};
function OrderItem({ item,onAccept}) {
  const { id,image, title, chapterName } = item;
  const [openDialog, setOpenDialog] = useState(false);
  const [imageList, setImageList] = useState([]);

  const getImageList = async (chapterId) => {
    try {

      const response = await axios.get(
        `${API_URL}/chapter_images/${chapterId}`
      );
      setImageList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenDialog = async (chapterId) => {
    await getImageList(chapterId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const acceptChapter = async (chapterId) => {
    try {
      await axios.post(
        `${API_URL}/admin/accept_chapter`,
        { 'chapterId': chapterId },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization":`Bearer  ${Cookies.get("access_token")}`
          },
        }
      );
      toast.success("Đã duyệt chương")
      onAccept(chapterId);
    } catch (error) {
      console.log(error);
    }
  };
  const rejectChapter = async (chapterId) => {
    try {
        const response = await axios.delete(`${API_URL}/admin/rejectChapter`,
            {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("access_token")}`,
                    "Content-Type": "application/x-www-form-urlencoded"

                }, data: { chapterId },
            });

            console.log(response)
            if(response.data.body.status){
            
              toast.success("Đã xóa chương truyện này")
              onAccept(chapterId);
            }
            else{
              toast.error(response.data.body.message)
            }
            

    } catch (error) {
        console.error( error);
    }
};
  

  return (
    <>
     <Stack direction="column" alignItems="left" >
      <ListItemButton sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px'
      }} onClick={() => handleOpenDialog(id)}>
        <Box
          component="img"
          alt={title}
          src={image}
          sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
        />

        <Box sx={{ minWidth: 240, flexGrow: 1 }}>
          <Typography color="inherit" variant="subtitle2" underline="hover" noWrap>
            {title}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {chapterName}
          </Typography>
          
        </Box>
      </ListItemButton>
      <Stack direction="row" alignItems="center" spacing={1} sx={{
        px: 2.5,
        mt: '1px'
      }}>
            <Button variant="contained" color="primary" onClick={()=>acceptChapter(item.id)}>
              Duyệt
            </Button>
            <Button variant="contained" color="primary" onClick={()=>rejectChapter(item.id)}>
              Từ chối
            </Button>
          </Stack>
          </Stack>
      <ImageDialog open={openDialog} onClose={handleCloseDialog} images={imageList} />
    </>
  );
}

OrderItem.propTypes = {
  item: PropTypes.shape({
    id:PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    chapterName: PropTypes.string,
    
  }),onAccept:PropTypes.func
};
