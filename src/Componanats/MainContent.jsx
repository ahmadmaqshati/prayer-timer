import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Prayer from './Prayer';
import Stack from '@mui/material/Stack';
import { Translate } from '@mui/icons-material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useScrollTrigger } from '@mui/material';
import moment from 'moment';
import "moment/dist/locale/ar-dz"
moment.locale("ar")


export default function MainContent() {
    const [timings, setTimings] = useState({ Fajr: "", Dhuhr: "", Asr: "", Maghrib: "", Isha: '' })
    const [selectedCity, setSelectedCity] = useState({
        englishCity: "Riyāḑ",
        arabicCity: "الرياض"
    })
    const [today, setToday] = useState('')


    const cardsData = [
        {
            id: 1,
            prayerName: "الفجر",
            prayerTime: timings.Fajr,
            img: '/fajr.png'
        },
        {
            id: 2,
            prayerName: "الظهر",
            prayerTime: timings.Dhuhr,
            img: '/dhhr.png'
        },
        {
            id: 3,
            prayerName: "العصر",
            prayerTime: timings.Asr,
            img: '/asr.png'
        },
        {
            id: 4,
            prayerName: 'المغرب',
            prayerTime: timings.Maghrib,
            img: "/sunset.png"
        },
        {
            id: 5,
            prayerName: "العشاء",
            prayerTime: timings.Isha,
            img: '/night.png'
        }
    ]

    const objectCities = [
        {
            englishCity: "Makkah al Mukarramah",
            arabicCity: "مكة المكرمة"
        },
        {
            englishCity: "Ar Riyāḑ",
            arabicCity: "الرياض"
        },
        {
            englishCity: "Dammam",
            arabicCity: "الدمام"
        }
    ]
    /* Ar Riyāḑ */

    useEffect(() => {
        axios.get(`https://api.aladhan.com/v1/timingsByCity?country=SA&city=${selectedCity.englishCity}`)
            .then(function (response) {
                const responseTiming = response.data.data.timings
                setTimings(response.data.data.timings)
                console.log(response.data.data.timings);

                setToday(moment().format('MMMM Do YYYY, h:mm:ss a'))
            })
    }, [selectedCity])


    const cardsDataDisplay = cardsData.map((card) => {
        return (<Prayer key={card.id} prayerName={card.prayerName} prayerTime={card.prayerTime} img={card.img} />)
    })

    function handleCityChange(e) {
        /*  const x = objectCities.find((c) => {
             return c.englishCity == e.target.value
         })
  */
        setSelectedCity(e.target.value)

        /*  setSelectedCity(objectCity) */

    }

    return (
        <div style={{ position: 'absolute', left: "50%", top: "50%", transform: 'translate(-50%,-50%)' }}>
            <Grid container>
                <Grid xs={6}>
                    <Typography variant="h6" style={{ color: "#7F7872" }}>
                        {today}
                    </Typography>

                    <Typography variant="h3" style={{ color: "white" }}>
                        {selectedCity.arabicCity}
                    </Typography>

                </Grid>
                <Grid xs={6}>
                    <Typography variant="h6" style={{ color: "#7F7872" }}>
                        متبقي حتى صلاة المغرب
                    </Typography>
                    <Typography variant="h3" style={{ color: "white", fontWeight: "900" }}>
                        3 : 24 : 1
                    </Typography>
                </Grid>

            </Grid>
            <Divider style={{ border: '1px solid', opacity: "0.2", width: "95%", margin: "auto", marginTop: "25px" }} />

            {/* Prayer Cards */}

            {/*===============================
            INJECT CARDS-DATA INTO JSX BY STATE
            ==================================*/}
            <Stack direction="row" justifyContent="center" gap='5px'>
                {cardsDataDisplay}
            </Stack >

            {/*== Prayer Cards ==*/}


            {/*  */}
            <Stack direction="row" justifyContent="center" >
                <FormControl style={{ width: "20%", marginTop: "30px" }}>
                    <InputLabel id="demo-simple-select-label" style={{ color: "white", fontWeight: "900" }}>المدينة</InputLabel>

                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="المدينة" onChange={handleCityChange}>
                        {
                            objectCities.map((city) => {
                                return <MenuItem value={{
                                    englishCity: city.englishCity,
                                    arabicCity: city.arabicCity
                                }} >{city.arabicCity}</MenuItem>
                            })
                        }
                    </Select>



                </FormControl>

            </Stack >


            {/*  */}


        </div>
    )
}
