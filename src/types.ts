export interface RealTimeWeather {
  data: RtWeatherData
  location: RtWeatherLocation
}

export interface RtWeatherData {
  time: string
  values: RtWeatherDataValues
}

export interface RtWeatherDataValues {
  cloudBase: number
  cloudCeiling: number
  cloudCover: number
  dewPoint: number
  freezingRainIntensity: number
  humidity: number
  precipitationProbability: number
  pressureSurfaceLevel: number
  rainIntensity: number
  sleetIntensity: number
  snowIntensity: number
  temperature: number
  temperatureApparent: number
  uvHealthConcern: number
  uvIndex: number
  visibility: number
  weatherCode: number
  windDirection: number
  windGust: number
  windSpeed: number
}

export interface RtWeatherLocation {
  lat: number
  lon: number
  name: string
  type: string
}



export interface TransportApiStationboardReply {
  station: TransportStation
  stationboard: TransportJourneyWithStop[]
}

export type TransportJourneyWithStop = TransportJourney & { stop: TransportStop}

export type TransportStation = {
  id: string
  name: string
  score: unknown
  coordinate: TransportCoordinate
  distance: unknown
}

export type TransportCoordinate = {
  type: string
  x: number
  y: number
}

export type TransportJourney = {
  name: string
  category: string | null
  subcategory: unknown
  categoryCode: number | null
  number: string
  operator: string
  to: string
  passList: TransportPassList[]
  capacity1st: string | null
  capacity2nd: string | null
}


export type TransportStop = {
  station: TransportLocation
  arrival: string | null
  arrivalTimestamp: number | null
  departure: string 
  departureTimestamp: number
  delay?: number | null
  platform: string
  prognosis: TransportPrognosis
  realtimeAvailability: unknown
  location: TransportLocation
}

export type TransportLocation = {
  id: string
  name: string

  score: unknown
  coordinate: TransportCoordinate
  distance: unknown
}


export type TransportPassList = {
  station: TransportLocation
  arrival?: string
  arrivalTimestamp?: number
  departure?: string
  departureTimestamp?: number
  delay?: number
  platform?: string
  prognosis: TransportPrognosis
  realtimeAvailability: unknown
  location: TransportLocation
}


export interface TransportPrognosis {
  platform: string| null
  arrival?: string| null
  departure?: string| null
  delay?: number| null
  capacity1st: string| null
  capacity2nd: string| null
}





