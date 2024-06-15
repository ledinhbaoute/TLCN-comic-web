import axios from 'axios';
import * as React from 'react'; 
import Cookies from 'js-cookie';
import { faker } from '@faker-js/faker';
import { useState,useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import API_URL from 'src/config/config';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
// import OptionStatistic from '../option-statistic';

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
  const handlePickerChange = (newValue) => {
    setPicker(newValue);
  };
  const [selectedOption, setSelectedOption] = useState('Theo nam');
  

  const handleOptionChange = (newOption) => {
    setSelectedOption(newOption);
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
    console.log(comicUpdateLastest)
  }, [comicUpdateLastest]);

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
            title="Total User"
            total={totalUser}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Comic"
            total={totalComic}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_comic.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Users Premium"
            total={totalUserPremium}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_user_premium.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Wallet"
            total={totalWallet}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_wallet.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          
          <AppWebsiteVisits
            title="Luot dang ky moi"
            subheader="bieu do thong ke luot dang ky"
            chart={{
              labels: generateLabels(),
              series: [
                // {
                //   name: 'Team A',
                //   type: 'column',
                //   fill: 'solid',
                //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                // },
                // { 
                //   name: 'Team B',
                //   type: 'area',
                //   fill: 'gradient',
                //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                // },
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
            title="Phan bo do tuoi"
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
            title="Truyen doc nhieu trong tuan"
            subheader=""
            chart={{
              series: comicTrendings.length > 0 ? 
              comicTrendings.map(comic => ({ label: comic[0].name, value: comic[1] })) 
              : [],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="Truyen moi cap nhat"
            list={comicUpdateLastest.length>0?comicUpdateLastest.map(comic => ({
              id: comic.id,
              title: comic.name,
              description: comic.discription,
              image: `${API_URL}/files/${comic.image}`,
              postedAt: comic.updateDate,
            })):[]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
