export type locationResType = {
  data: {
    results: {
      admin1: string
      admin1_id: number
      country: string
      country_code: string
      country_id: number
      elevation: number
      feature_code: string
      id: number
      latitude: number
      longitude: number
      name: string
      population: number
      timezone: string
    }[]
  }
}

export type DailyType = {
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  time: string[]
  weathercode: number[]
}
export type cityWeatherResType = {
  data: {
    daily: DailyType
  }
}
