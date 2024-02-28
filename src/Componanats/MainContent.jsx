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




export default function MainContent() {
    /* const [timings, setTimings] = useState({ Fajr: "", Dhuhr: "", Asr: "", Maghrib: "", Isha: '' }) */
    const cardsData = [
        {
            id: 1,
            prayerName: "الفجر",
            prayerTime: 5,
            img: '/fajr.png'
        },
        {
            id: 2,
            prayerName: "الظهر",
            prayerTime: 12,
            img: '/dhhr.png'
        },
        {
            id: 3,
            prayerName: "العصر",
            prayerTime: 4,
            img: '/asr.png'
        },
        {
            id: 4,
            prayerName: 'المغرب',
            prayerTime: 6,
            img: "/sunset.png"
        },
        {
            id: 5,
            prayerName: "العشاء",
            prayerTime: 7,
            img: '/night.png'
        }
    ]



    /* useEffect((() => {
        axios.get('https://api.aladhan.com/v1/timingsByCity?city=Dubai&country=United Arab Emirates&method=8')
            .then(function (response) {
                const responseTiming = response.data.data.timings
                setTimings(response.data.data.timings)
                console.log(response.data.data.timings);
            })

            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }), [])
 */
    const cardsDataDisplay = cardsData.map((card) => {
        return (<Prayer key={card.id} prayerName={card.prayerName} prayerTime={card.prayerTime} img={card.img} />)
    })


    return (
        <div style={{ position: 'absolute', left: "50%", top: "50%", transform: 'translate(-50%,-50%)' }}>
            <Grid container>
                <Grid xs={6}>
                    <Typography variant="h6" style={{ color: "#7F7872" }}>
                        سبمتر 9 2023/ 4:20
                    </Typography>
                    <Typography variant="h3" style={{ color: "white" }}>
                        مكة المكرمة
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
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        /*  value={age} */
                        label="المدينة"
                    /* onChange={handleChange} */
                    >
                        <MenuItem value={10}>مكة المكرمة</MenuItem>
                        <MenuItem value={20}>الرياض</MenuItem>
                        <MenuItem value={30}>الدمام</MenuItem>
                    </Select>
                </FormControl>

            </Stack >


            {/*  */}


        </div>
    )
}
