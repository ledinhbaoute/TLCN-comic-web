import { Chart, registerables } from "chart.js";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import API_URL from "../config/config";
import axios from "axios";
import AppWidgetSummary from "./app-widget-summary";
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

Chart.register(...registerables)
const Statistic = () => {

    const [dataChart, setDataChart] = useState([])
    const [comicTrending, setComicTrending] = useState([])
    const [comics, setComics] = useState([]);
    const [comicPremiums, setComicPremiums] = useState([]);
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [startDate, setStartDate] = useState(dayjs().startOf('month'))
    const [endDate, setEndDate] = useState(dayjs())

    const canvasRef = useRef(null);
    const canvasRef2 = useRef(null);
    const chartRef = useRef(null);
    const chartRef2 = useRef(null);


    const userId = window.sessionStorage.getItem("userid");
    useEffect(() => {
        const getComics = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/comicbooks/filter/actor/${userId}`
                );
                setComics(response.data.data);

            } catch (error) {
                console.log(error);
            }
        };
        getComics();
    }, [userId]);

    useEffect(() => {

        const filtered = comics.filter((comic) => comic.premium === true);
        setComicPremiums(filtered);
    }, [comics]);
    useEffect(() => {
        const getDataProfits = async () => {

            try {
                const response = await axios.get(
                    `${API_URL}/user/tke?startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("access_token")}`
                        }
                    }
                );
                setDataChart(response.data)

            } catch (error) {
                console.log(error);
            }
        }
        getDataProfits();

    }, [startDate, endDate]);
    useEffect(() => {
        const getComicTrending = async () => {

            try {
                const response = await axios.get(
                    `${API_URL}/user/comicTrendingActor`
                    , {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("access_token")}`
                        }
                    });
                setComicTrending(response.data)

            } catch (error) {
                console.log(error);
            }
        }
        getComicTrending();

    }, []);


    useEffect(() => {
        const getFollowers = async () => {

            try {
                const response = await axios.get(
                    `${API_URL}/user/follows`
                    , {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("access_token")}`
                        }
                    });
                setFollowers(response.data)

            } catch (error) {
                console.log(error);
            }
        }
        getFollowers();

    }, []);

    useEffect(() => {
        const getFollowings = async () => {

            try {
                const response = await axios.get(
                    `${API_URL}/user/following`
                    , {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("access_token")}`
                        }
                    });
                setFollowing(response.data)

            } catch (error) {
                console.log(error);
            }
        }
        getFollowings();

    }, []);

    useEffect(() => {
        console.log(dataChart)
        const ctx = canvasRef.current.getContext('2d')

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Thu vào', 'Chi ra'],
                datasets: [{
                    label: 'VND',
                    data: dataChart,
                    borderWidth: 3,
                    backgroundColor: [
                        'rgba(31, 63, 193, 1)',
                        'rgba(255, 0, 0, 1)'
                    ],
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Biểu đồ tiền thu vào, chi ra'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [dataChart]);


    useEffect(() => {
        console.log(comicTrending)

        const labels = comicTrending.map(item => item.comicBook.name);
        const data = comicTrending.map(item => item.viewCount);

        const ctx = canvasRef2.current.getContext('2d')

        if (chartRef2.current) {
            chartRef2.current.destroy();
        }

        chartRef2.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Lượt xem',
                    data: data,
                    borderWidth: 1,
                    backgroundColor: [
                        'rgba(201, 204, 35, 1)',
                    ],
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Biểu đồ các truyện có lượt xem cao nhất trong 7 ngày ngần đây'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => {
            if (chartRef2.current) {
                chartRef2.current.destroy();
            }
        };
    }, [comicTrending]);
    return (
        <>
            ]
            <Grid container spacing={5} sx={{
                padding: 4,
            }}>
                <Grid xs={12} sm={6} md={3} sx={{ padding: 2 }}>
                    <AppWidgetSummary
                        title="Tổng số truyện"
                        total={comics.length}
                        color="info"
                        icon={<img alt="icon" src="/assets/icons/glass/ic_comic.png" />}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3} sx={{ padding: 2 }}>
                    <AppWidgetSummary
                        title="Số truyện premium"
                        total={comicPremiums.length}

                        color="info"
                        icon={<img alt="icon" src="/assets/icons/glass/icon_premium.png" />}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3} sx={{ padding: 2 }}>
                    <AppWidgetSummary
                        title="Người theo dõi"
                        total={followers.length}
                        color="info"
                        icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3} sx={{ padding: 2 }}>
                    <AppWidgetSummary
                        title="Đang theo dõi"
                        total={following.length}
                        color="info"
                        icon={<img alt="icon" src="/assets/icons/glass/icon_follow.png" />}
                    />
                </Grid>
            </Grid>
            <div className="row" >
                
                <div className="col-lg-8 col-md-8 col-sm-8" >
                    <div>
                        <canvas ref={canvasRef2} id="myChart1" style={{backgroundColor:'#FFFFFF',borderRadius:10}}></canvas>
                    </div>

                </div>
                <div className="col-lg-4 col-md-6 col-sm-6" style={{backgroundColor:'#FFFFFF',borderRadius:10}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >

                        <DatePicker
                            label="Từ"
                            value={startDate}
                            onChange={(date) => setStartDate(date)}
                            sx={{ width: '50%',marginTop:1 }}
                        />
                        <DatePicker sx={{ width: '50%',marginTop:1 }}
                            label="Đến"

                            value={endDate}
                            onChange={(date) => setEndDate(date)}
                        />
                    </LocalizationProvider>
                    <div>
                        <canvas ref={canvasRef} id="myChart" ></canvas>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Statistic;