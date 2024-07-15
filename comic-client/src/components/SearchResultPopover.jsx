import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config/config';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

import Typography from '@mui/material/Typography';

import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';

import Scrollbars from 'react-custom-scrollbars-2';

// ----------------------------------------------------------------------

export default function SearchResultPopover() {

  const [keySearch,setKeySearch]=useState()
  const [resultComicList,setResultComicList]=useState([])
  const [resultActorList,setResultActorList]=useState([])
  const navigate = useNavigate();
  const searchActor = async (keyS) => {

    try {
      const response = await axios.get(
        `${API_URL}/search/user?keySearch=${keyS}`
      );
      setResultActorList(response.data.data);


    } catch (error) {
      console.log(error);
    }
  };
  const searchComic = async (keyS) => {

    try {
      const response = await axios.get(
        `${API_URL}/search/comics?keySearch=${keyS}`
      );
      setResultComicList(response.data.data);


    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyWordChange = (event) => {
    setKeySearch(event.target.value);
  }
  const handleComicItemClick=(comic)=>{
    navigate(`/comic-detail/${comic.id}`)
  }
  const handleActorItemClick=(user)=>{
    navigate(`/user/${user.id}`)
  }
  const handleClose=()=>{
    setKeySearch("")
  }
  useEffect(() => {
    if (keySearch !== "") {
      searchComic(keySearch)
      searchActor(keySearch)
    }
  }
  , [keySearch]);
  return (
    <>
    <Box sx={{ position: 'relative' }}>
      <input
        className="searchTerm"
        type="text"
        placeholder="Search Here..."
        onChange={handleKeyWordChange}
        value={keySearch}
      />
      {keySearch && (
        <Box sx={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          bgcolor: 'background.paper',
          boxShadow: 1,
          mt: 1,
          p: 1,
          zIndex: 10,
        }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{
                py: 1, px: 2.5, typography: 'overline', fontWeight: 700,
                lineHeight: 1.5,
                textTransform: 'uppercase',
              }}>
                Truyện
              </ListSubheader>
            }
          >
            <Divider sx={{ borderStyle:'groove'}} />
            <Scrollbars autoHeight autoHeightMax={200}>
            {resultComicList.length > 0 ? (
              resultComicList.map((comic) => (
                <ComicItem key={comic.id} item={comic} onClick={handleComicItemClick}/>
              ))
            ) : (
              <Typography variant="body2" sx={{ px: 2.5 }}>Không tìm thấy kết quả</Typography>
            )}
            </Scrollbars>
            <Divider sx={{ borderStyle:'groove'}} />
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{
                py: 1, px: 2.5, typography: 'overline', fontWeight: 700,
                lineHeight: 1.5,
                textTransform: 'uppercase',
              }}>
                Tác giả
              </ListSubheader>
              
            }
          >
            <Divider sx={{ borderStyle:'groove'}} />
          <Scrollbars autoHeight autoHeightMax={200}>
            {resultActorList.length > 0 ? (
              resultActorList.map((actor) => (
                <ActorItem key={actor.id} item={actor} onClick={handleActorItemClick} />
              ))
            ) : (
              <Typography variant="body2" sx={{ px: 2.5 }}>Không tìm thấy kết quả</Typography>
            )}
            </Scrollbars>
          </List>
          <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple onClick={handleClose}>
            Đóng
          </Button>
        </Box>
          
        </Box>
      )}
    </Box>
    </>
  );
}

// ----------------------------------------------------------------------

function ComicItem({ item,onClick}) {
  const { avatar, title } = renderContent(item);

  return (
    <ListItemButton
      sx={{
        py: 0.1,
        px: 1.5,
        mt: '1px',
      }}
      onClick={()=>onClick(item)}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',  
            }}
          >
            {item.view?(<span><i className="fa fa-eye"></i> {item.view}</span>):(<span><i></i> {item.userName}</span>)}
            
           
          </Typography>
        }
      />
    </ListItemButton>
  );
}
function ActorItem({item,onClick}) {
    const { avatar, title } = renderContent(item);
  
    return (
      <ListItemButton
      onClick={()=>onClick(item)}
        sx={{
          py: 0.1,
          px: 1.5,
          mt: '1px',
        }}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',  
              }}
            >
             <span><i></i> @{item.userName}</span>
              
             
            </Typography>
          }
        />
      </ListItemButton>
    );
  }
export function pxToRem(value) {
  return `${value / 16}rem`;
}
// ----------------------------------------------------------------------

function renderContent(item) {
  const title = (
    <Typography variant="subtitle2" sx={{
      fontWeight: 500,
      lineHeight: 22 / 14, fontSize: pxToRem(12)
    }}>
      {item.name}
    </Typography>
  );
  if(item.userName){
    return {
        avatar: item.avatar ? <img alt={item.name} src={item.avatar} /> : null,
        title,
      };
  }
  return {
    avatar: item.image ? <img alt={item.name} src={item.image} /> : null,
    title,
  };
}
