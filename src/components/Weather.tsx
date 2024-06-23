import { FC, useEffect, useState } from 'react'
import { Box, Card, TextField } from '@mui/material'
import { cityWeatherResType, DailyType, locationResType } from '../common/types'
import Flag from 'react-world-flags'
import axios from 'axios'
import { weatherContainerStyle } from './Styles'
import { Day } from './Day'
import { format, isToday, parseISO } from 'date-fns'
import { enGB, uk } from 'date-fns/locale'

interface IWeatherProps {}

export const Weather: FC<IWeatherProps> = () => {
  const [locationInfo, setLocationInfo] = useState<locationResType | null>(null)
  const [dailyWeather, setDailyWeather] = useState<cityWeatherResType | null>(
    null,
  )
  const [city, setCity] = useState('')
  const [error, setError] = useState('')

  const formatDate = (date: string, countryCode: string = 'UA') => {
    const code = countryCode === 'UA' ? uk : enGB
    const targetDate = parseISO(date)

    if (isToday(targetDate)) {
      return countryCode === 'UA' ? 'сьогодні' : 'today'
    } else {
      return format(targetDate, 'eeee', { locale: code })
    }
  }

  function getWeatherIcons(dailyData: DailyType) {
    const weatherIcons = {
      0: '🌞', // Ясно
      1: '☁️', // Хмарно
      2: '🌧️', // Дощ
      3: '❄️', // Сніг
    }
    const day = dailyData.time
    const tMin = dailyData.temperature_2m_min
    const tMax = dailyData.temperature_2m_max
    const weatherCode = dailyData.weathercode

    return day.map((d, i) => {
      return {
        emoji: '',
        curDay: formatDate(d),
        temp: `${Math.floor(tMin[i])}° - ${Math.floor(tMax[i])}°`,
      }
    })
  }

  useEffect(() => {
    const getLocation = async () => {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=kharkiv`
      try {
        const res: locationResType = await axios.get(url)
        setLocationInfo(res)
      } catch (error: any) {
        setError(error.message)
      }
    }
    getLocation()
  }, [])

  useEffect(() => {
    if (locationInfo) {
      const { latitude, longitude, timezone } = locationInfo.data.results[0]
      const getWeather = async () => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min,`
        try {
          const res: cityWeatherResType = await axios.get(url)
          setDailyWeather(res)
        } catch (error: any) {
          setError(error.message)
        }
      }
      getWeather()
    }
  }, [locationInfo])

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <Card sx={weatherContainerStyle}>
      Weather
      <TextField
        label="Enter City"
        value={city}
        onChange={(e) => setCity(e.currentTarget.value)}
      />
      <Flag
        code={locationInfo?.data.results[0].country_code}
        style={{ width: '50px', height: '50px' }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'stretch',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        {dailyWeather &&
          getWeatherIcons(dailyWeather.data.daily).map((wether) => {
            return (
              <Day
                emoji={wether.emoji}
                curDay={wether.curDay}
                temp={wether.temp}
              />
            )
          })}
      </Box>
    </Card>
  )
}
