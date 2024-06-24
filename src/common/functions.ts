import { enGB, uk } from 'date-fns/locale'
import { format, isToday, parseISO } from 'date-fns'

export const getWeatherIcon = (tMax: number, weatherCode:number) => {
  const weatherIcons:{[key: number]: string} = {
    0: '🌞',   // Clear sky
    1: '🌤️',  // Mainly clear
    2: '⛅',   // Partly cloudy
    3: '☁️',   // Overcast
    45: '🌫️', // Fog and depositing rime fog
    48: '🌫️', // Fog and depositing rime fog
    51: '🌧️', // Drizzle: Light intensity
    53: '🌧️', // Drizzle: Moderate intensity
    55: '🌧️', // Drizzle: Dense intensity
    56: '❄️',  // Freezing Drizzle: Light intensity
    57: '❄️',  // Freezing Drizzle: Dense intensity
    61: '🌧️', // Rain: Slight intensity
    63: '🌧️', // Rain: Moderate intensity
    65: '🌧️', // Rain: Heavy intensity
    66: '❄️',  // Freezing Rain: Light intensity
    67: '❄️',  // Freezing Rain: Heavy intensity
    71: '🌨️', // Snow fall: Slight intensity
    73: '🌨️', // Snow fall: Moderate intensity
    75: '🌨️', // Snow fall: Heavy intensity
    77: '🌨️', // Snow grains
    80: '🌧️', // Rain showers: Slight intensity
    81: '🌧️', // Rain showers: Moderate intensity
    82: '🌧️', // Rain showers: Violent intensity
    85: '🌨️', // Snow showers: Slight intensity
    86: '🌨️', // Snow showers: Heavy intensity
    95: '⛈️', // Thunderstorm: Slight or moderate
    96: '⛈️', // Thunderstorm with slight hail
    99: '⛈️'  // Thunderstorm with heavy hail
  };
if (weatherCode) {
  return weatherIcons[weatherCode]
}
  return Math.floor(tMax) > 30
    ? '🌞'
    : Math.floor(tMax) > 20
      ? '🌤'
      : Math.floor(tMax) > 10
        ? '☁️'
        : '🌧️';
}

export const formatDate = (date: string, countryCode: string = 'UA') => {
  const code = countryCode === 'UA' ? uk : enGB
  const targetDate = parseISO(date)

  if (isToday(targetDate)) {
    return countryCode === 'UA' ? 'сьогодні' : 'Today'
  } else {
    return format(targetDate, 'EE', { locale: code })
  }
}

