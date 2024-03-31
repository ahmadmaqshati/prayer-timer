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
import moment, { duration } from 'moment';
import 'moment/locale/ar'
import './ScreenResponsive.css';
export default function MainContent() {
	/*=================
	  States
	  =================
	 */
	const [timings, setTimings] = useState({ Fajr: "", Dhuhr: "", Asr: "", Maghrib: "", Isha: '' })
	const [selectedCity, setSelectedCity] = useState({
		englishCity: "Riyāḑ",
		arabicCity: "الرياض"
	})

	const [today, setToday] = useState('')

	const [nextPrayerIndex, setNextPrayerIndex] = useState(0)
	const [remainingTime, setRemainingTime] = useState('')
	/*==================================================
	  creat array for cardsData for making mapping and
	  return cardsData into prayer componanat
	  ==================================================*/
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
	/*===============================================================
	  mapping on cardsData array and return data into prayer componant
	  ================================================================*/
	const cardsDataDisplay = cardsData.map((card) => {
		return (<Prayer key={card.id} prayerName={card.prayerName}
			prayerTime={card.prayerTime} img={card.img} />)
	})

	const objectCities = [
		{
			englishCity: "Makkah al Mukarramah",
			arabicCity: "مكة المكرمة"
		},

		{
			englishCity: "Cairo",
			arabicCity: "القاهرة"
		},
		{
			englishCity: "Damascus",
			arabicCity: 'دمشق'
		},
		{
			englishCity: "Palestine",
			arabicCity: 'فلسطين'
		},
		{
			englishCity: "Iraq",
			arabicCity: 'عراق'
		}



	]
	/*====================================================
	the first useEffect for getting prayer timings from API
	 =====================================================*/
	useEffect(() => {
		axios.get(`https://api.aladhan.com/v1/timingsByCity?country=SA&city=${selectedCity.englishCity}`)
			.then(function (response) {
				const responseTiming = response.data.data.timings
				setTimings(response.data.data.timings)
				console.log(response.data.data.timings);

			})

	}, [selectedCity])

	function handleCityChange(e) {
		const cityObject = objectCities.find((city) => {
			return city.englishCity == e.target.value;
		});
		console.log("the new value is ", e.target.value);
		setSelectedCity(cityObject);
	}

	const prayerArray = [
		{
			displayName: 'الفجر',
			prayerName: "Fajr"
		},
		{
			displayName: 'الظهر',
			prayerName: "Dhuhr",
		},
		{
			displayName: 'العصر',
			prayerName: "Asr"
		},
		{
			displayName: 'المغرب',
			prayerName: 'Isha'
		},
		{
			displayName: 'العشاء',
			prayerName: "Isha"
		}
	]

	/*====================================================
	  the second useEffect for making timer for next prayer
	 =====================================================*/
	useEffect(() => {
		setToday(moment().format('MMMM Do YYYY | h:mm'))
		let disInterval = setInterval(() => {
			setupCountdownTimer()
		}, 1000);

		//exract the current time by moment.js
		setToday(moment().format('MMMM Do YYYY | h:mm'))
		//==exract the current time by moment.js==//

		//useEffect cleanup//
		return () => {
			clearInterval(disInterval)
		}
		//==CuseEffect cleanup==//

	}, [timings])

	/*===================================================================
	Determine or selecte the (next name prayer) by a conditional statement
	=====================================================================*/
	function setupCountdownTimer() {

		const momentNow = moment()

		let prayerIndex = 2
		if (momentNow.isAfter(moment(timings.Fajr, 'hh:mm')) &&
			momentNow.isBefore(moment(timings.Dhuhr, 'hh:mm'))) {
			prayerIndex = 0
		}
		else if (momentNow.isAfter(moment(timings.Dhuhr, 'hh:mm')) &&
			momentNow.isBefore(moment((timings.Asr, 'hh:mm')))) {
			prayerIndex = 2
		}
		else if (momentNow.isAfter(moment(timings.Asr, 'hh:mm')) &&
			momentNow.isBefore((timings.Maghrib, 'hh:mm'))) {
			prayerIndex = 3
		}
		else if (momentNow.isAfter(moment(timings.Maghrib, 'hh:mm')) &&
			momentNow.isBefore(moment((timings.Isha, 'hh:mm')))) {
			prayerIndex = 4
		}
		else {
			prayerIndex = 1

		}
		/* calling setState for storing ( الشرط المحقق اي الصلاة القادمة) into state */
		setNextPrayerIndex(prayerIndex)

		//now we can setup the countdown timer,how ????
		//firt after knowing what the (next prayer name is), we must get extract it
		const nextPrayerName = prayerArray[nextPrayerIndex].prayerName
		//then we must extract the (next prayer time) based on the (next prayer name)
		const nextPrayerTime = timings[nextPrayerName]

		/* next prayer time as object */
		const momentNextPrayerTime = moment(nextPrayerTime, 'hh:mm')
		//now we can setup the countdown timer by using
		//the general rule for knowing the remaining time for the next prayer 
		let calculateRemainingTime = moment(nextPrayerTime, 'hh:mm').diff(momentNow)

		//Remaing Time for Fajr Prayer is a special case, so we make a certain condition
		if (calculateRemainingTime < 0) {
			const midnightToCurrentTime = moment('23:59:59', 'hh:mm:ss').diff(momentNow)
			const fajrToMidnight = momentNextPrayerTime.diff(moment('00:00:00', 'hh:mm:ss'))

			const totalDiff = midnightToCurrentTime + fajrToMidnight
			calculateRemainingTime = totalDiff
		}
		const durationCalculateRemainingTime = moment.duration(calculateRemainingTime)
		setRemainingTime(`${durationCalculateRemainingTime.hours()}:${durationCalculateRemainingTime.minutes()}: ${durationCalculateRemainingTime.seconds()}`)

	}

	return (
		<div className='p' >
			<div className='main-content'>
				<Grid className='header' container>
					<Grid xs={6} className='flex'>
						<Typography variant="h4" style={{ color: "white", fontSize: "3rem", fontWeight: "900" }}>
							<div className='date'>
								{today}
							</div>

						</Typography>
						<Typography variant="h3" style={{ color: "white", fontWeight: "900" }}>
							<div className='text'>
								{selectedCity.arabicCity}
							</div>
						</Typography>

					</Grid>

					<Grid xs={6} className='flex'>
						<Typography>
							<div className='text'>
								متبقي حتى صلاة
								{prayerArray[nextPrayerIndex].displayName}
							</div>


						</Typography>

						<Typography className='text' variant="h3" style={{ color: "white", fontWeight: "900", direction: "ltr", fontSize: "4rem" }}>
							<div className='text'>
								{remainingTime}
							</div>

						</Typography>
					</Grid>

				</Grid>
				<Divider style={{ border: '1px solid', opacity: "0.2", width: "95%", margin: "auto", marginTop: "25px" }} />

				{/* Prayer Cards */}

				{/*===============================
						INJECT PRAYER-CARDS-DATA INTO JSX
						=================================*/}
				<Stack /* direction="row" justifyContent="center" gap='20px' */>
					<div className='prayer-card' style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
						{cardsDataDisplay}
					</div>
				</Stack >

				{/*== Prayer Cards ==*/}


				{/* Dropdown */}
				<Stack direction="row" justifyContent="center" >
					<FormControl style={{ width: "20%", marginTop: "30px" }}>
						<InputLabel id="demo-simple-select-label" style={{ color: "#4A3620", fontWeight: "900", fontSize: "1.2rem" }}>المدينة</InputLabel>

						<Select labelId="demo-simple-select-label" id="demo-simple-select" label="المدينة" onChange={handleCityChange}>
							{
								objectCities.map((city) => {
									return <MenuItem value={city.englishCity} >{city.arabicCity}</MenuItem>
								})
							}
						</Select>

					</FormControl>

				</Stack >
				{/*==Dropdowns==*/}

			</div >
		</div>
	)
}