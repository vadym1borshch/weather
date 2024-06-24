import { FC, useCallback, useEffect, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import Flag from 'react-world-flags'
import axios from 'axios'
import _ from 'lodash'

import { cityWeatherResType, DailyType, locationResType } from '../common/types'
import {
  cityNameBoxStyle,
  dayWeatherBoxStyle,
  errorBoxStyle,
  weatherContainerStyle
} from './Styles'
import { Day } from './Day'
import { formatDate, getWeatherIcon } from '../common/functions'

interface IWeatherProps {}

export const Weather: FC<IWeatherProps> = () => {
  const [locationInfo, setLocationInfo] = useState<locationResType | null>(null)
  const [dailyWeather, setDailyWeather] = useState<cityWeatherResType | null>(
    null,
  )
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceAction = useCallback(
    _.debounce((value: string) => {
      if (!value || value.length < 2) return
      setCity('')
      setIsLoading(true)
      const getLocation = async () => {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${value}`
        try {
          setLocationInfo(null)
          const res: locationResType = await axios.get(url)
          setLocationInfo(res)
        } catch (error: any) {
          setError(error.message)
        } finally {
          setIsLoading(false)
        }
      }
      getLocation()
    }, 3000),
    [],
  )

  const actualWeather = (dailyData: DailyType) => {
    const day = dailyData.time
    const tMin = dailyData.temperature_2m_min
    const tMax = dailyData.temperature_2m_max
    const weatherCode = dailyData.weathercode

    return day.map((d, i) => {
      return {
        emoji: getWeatherIcon(tMax[i], weatherCode[i]),
        curDay: formatDate(d, 'en'),
        temp: `${Math.floor(tMin[i])}° - ${Math.floor(tMax[i])}°`,
      }
    })
  }

  useEffect(() => {
    debounceAction(city)
    return () => {}
  }, [city, debounceAction])

  useEffect(() => {
    if (locationInfo) {
      setIsLoading(true)
      const { latitude, longitude, timezone } = locationInfo.data.results[0]
      const getWeather = async () => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min,`
        try {
          const res: cityWeatherResType = await axios.get(url)
          setDailyWeather(res)
        } catch (error: any) {
          setError(error.message)
        } finally {
          setIsLoading(false)
        }
      }
      getWeather()
    }
  }, [locationInfo])

  if (error) {
    return (
      <Box sx={errorBoxStyle}>
        <h1>{error}</h1>
        <Button onClick={() => window.location.reload()}>Restart</Button>
      </Box>
    )
  }

  return (
    <Box sx={weatherContainerStyle}>
      <h1>Actual Weather</h1>
      <TextField
        color="success"
        label="Enter City"
        value={city}
        onChange={(e) => setCity(e.currentTarget.value)}
      />
      {!isLoading && locationInfo && (
        <Box sx={cityNameBoxStyle}>
          <h3>{locationInfo?.data.results[0].name}</h3>
          <Flag
            code={locationInfo?.data.results[0].country_code}
            style={{ width: '50px', height: '50px' }}
          />
        </Box>
      )}
      <Box sx={dayWeatherBoxStyle}>
        {isLoading && <>Loading ...</>}
        {!isLoading &&
          dailyWeather &&
          actualWeather(dailyWeather.data.daily).map((weather, i) => {
            return (
              <Day
                key={i + weather.temp}
                emoji={weather.emoji}
                curDay={weather.curDay}
                temp={weather.temp}
              />
            )
          })}
      </Box>
    </Box>
  )
}
