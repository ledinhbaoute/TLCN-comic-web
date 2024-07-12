import axios from 'axios';
import * as React from 'react'; 
import Cookies from 'js-cookie';
import { useState,useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import API_URL from 'src/config/config';

import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  const [totalUser,setTotalUser]=useState()
  const [totalComic,setTotalComic]=useState()
  const [totalUserPremium,setTotalUserPremium]=useState()
  const [totalWallet,setTotalWallet]=useState()
  const [dataChart,setDataChart]=useState()
  const [userAgeDistribution,setUserAgeDistribution]=useState([])
  const[picker,setPicker]=useState([null,2023])
  const [comicTrendings,setComicTrendings]=useState([])
  const [comicUpdateLastest,setComicUpdateLastest]=useState([])
  const [chaptersNotAccept,setChaptersNotAccept]=useState([])
  const handlePickerChange = (newValue) => {
    setPicker(newValue);
  };
  const [selectedOption, setSelectedOption] = useState('Theo nam');
  

  const handleOptionChange = (newOption) => {
    setSelectedOption(newOption);
  };
  const removeAcceptedChapter = (chapterId) => {
    setChaptersNotAccept((prev) => prev.filter((chapter) => chapter.id !== chapterId));
  };
  useEffect(() => {
    const getUserAgeDistribution = async () => {
      try {
      
       
          const response = await axios.get(
            `${API_URL}/admin/statistic/userAge`
          ,{
            headers:{
            Authorization:`Bearer ${Cookies.get("access_token")}`
          }
        });
            setUserAgeDistribution(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getUserAgeDistribution();
  }, []);
  useEffect(() => {
    const getChapterNotAccept = async () => {
      try {
       
          const response = await axios.get(
            `${API_URL}/admin/chaptersNotAccept`
          ,{
            headers:{
            Authorization:`Bearer ${Cookies.get("access_token")}`
          }
        });
            setChaptersNotAccept(response.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getChapterNotAccept();
  }, []);
  useEffect(() => {
    const getComicTrending = async () => {
      try {
      
       
          const response = await axios.get(
            `${API_URL}/admin/comicTrending`
          ,{
            headers:{
            Authorization:`Bearer ${Cookies.get("access_token")}`
          }
        });
            setComicTrendings(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getComicTrending();
  }, []);
  useEffect(() => {
    const getComicUpdateLastest = async () => {
      try {
      
       
          const response = await axios.get(
            `${API_URL}/comic/latest_update?indexPage=0`
          );
            setComicUpdateLastest(response.data.content)
      } catch (error) {
        console.error(error);
      }
    }
    getComicUpdateLastest();
  }, []);
  useEffect(() => {
    const getDataRegistration = async () => {
      try {
        if(picker[0]===null){
        const response = await axios.get(
          `${API_URL}/admin/statistic/byYear?year=${picker[1]}`
        ,{
          headers:{
          Authorization:`Bearer ${Cookies.get("access_token")}`
        }
      });
    
          
          setDataChart(response.data.data.data)
          setTotalUser(response.data.data.n_user)
          setTotalComic(response.data.data.n_comic)
          setTotalUserPremium(response.data.data.n_userPremium)
          setTotalWallet(response.data.data.n_wallet)
        }
        else{
          const response = await axios.get(
            `${API_URL}/admin/statistic/byMonth?year=${picker[1]}&month=${picker[0]}`
          ,{
            headers:{
            Authorization:`Bearer ${Cookies.get("access_token")}`
          }
        });
            
            setDataChart(response.data.data.data)
            setTotalUser(response.data.data.n_user)
            setTotalComic(response.data.data.n_comic)
            setTotalUserPremium(response.data.data.n_userPremium)
            setTotalWallet(response.data.data.n_wallet)

        }
      } catch (error) {
        console.error(error);
      }
    }
    getDataRegistration();
  }, [picker,selectedOption]);
  useEffect(() => {
    console.log(chaptersNotAccept)
  }, [chaptersNotAccept]);

  const generateLabels = () => {
    if (picker[0] === null) {
      return [
        'Thang 1', 'Thang 2', 'Thang 3', 'Thang 4', 'Thang 5', 'Thang 6',
        'Thang 7', 'Thang 8', 'Thang 9', 'Thang 10', 'Thang 11', 'Thang 12',
      ];
    } 
    
      const daysInMonth = new Date(picker[1], picker[0], 0).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => `Ngay ${i + 1}`);
    
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Tổng người dùng"
            total={totalUser}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Tổng số truyện"
            total={totalComic}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_comic.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Người dùng Premium"
            total={totalUserPremium}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_user_premium.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Tổng số ví"
            total={totalWallet}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_wallet.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          
          <AppWebsiteVisits
            title="Lượt đăng ký mới"
            subheader="Biểu đồ thống kê lượt đăng ký"
            chart={{
              labels: generateLabels(),
              series: [
                {
                  name: 'Người đăng kí',
                  type: 'line',
                  fill: 'solid',
                  data: dataChart,
                },
              ],
            }}
            onPickerChange={handlePickerChange}
            onOptionChange={handleOptionChange}
            option={selectedOption}
          />
        </Grid>
        

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Phân bố độ tuổi"
            chart={{
              series: userAgeDistribution.length>0? [
                { label: '>16 tuoi', value: userAgeDistribution[0]},
                { label: '16-24 tuoi', value: userAgeDistribution[1] },
                { label: '24-30 tuoi', value: userAgeDistribution[2] },
                { label: '>30 tuoi', value: userAgeDistribution[3] }
            
              ]:[],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Truyện đọc nhiều trong tuần"
            subheader=""
            chart={{
              series: comicTrendings.length > 0 ? 
              comicTrendings.map(comic => ({ label: comic[0].name, value: comic[1] })) 
              : [],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Yêu cầu duyệt chương"
            list={chaptersNotAccept.length>0?chaptersNotAccept.map(chapter=>({
                id:chapter.id,
                title:chapter.comicBook_Id.name,
                chapterName:`Chapter ${chapter.ordinalNumber}`,
                image: `${API_URL}/files/${chapter.comicBook_Id.image}`,
            })):[]
          }
          onAccept={removeAcceptedChapter}
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="Truyện mới cập nhật"
            list={comicUpdateLastest.length>0?comicUpdateLastest.map(comic => ({
              id: comic.id,
              title: comic.name,
              description: comic.discription,
              image: `${API_URL}/files/${comic.image}`,
              postedAt: comic.updateDate,
            })):[]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
