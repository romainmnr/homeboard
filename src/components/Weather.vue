<template>
  <div class="weather-tile" v-if="weather">
    <div class="datetime">
      <div>{{ date }}</div>
      <div>{{ time }}</div>
    </div>
    <div class="today">
      <img :src="weather.condition.icon">
      <div>{{ weather.condition.text }}</div>
      <div>{{ weather.temp_c }}°C</div>
    </div>
    <div class="forecast">
      <div class="col">
        <div class="value">
          {{ weather.feelslike_c }}°C
        </div>
        <div class="label">
          Feel
        </div>
      </div>
      <div class="col">
        <div class="value">
          {{ weather.wind_kph }}Km/H
        </div>
        <div class="label">
          {{ weather.wind_dir }}
        </div>
      </div>
      <div class="col">
        <div class="value">
          {{ weather.precip_mm }}
        </div>
        <div class="label">
          mm
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import axios from 'axios'

export interface Weather {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  minutely?: (MinutelyEntity)[] | null;
  hourly?: (HourlyEntity)[] | null;
  daily?: (DailyEntity)[] | null;
  alerts?: (AlertsEntity)[] | null;
}
export interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather?: (WeatherEntity)[] | null;
}
export interface WeatherEntity {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface MinutelyEntity {
  dt: number;
  precipitation: number;
}
export interface HourlyEntity {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather?: (WeatherEntity)[] | null;
  pop: number;
}
export interface DailyEntity {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather?: (WeatherEntity)[] | null;
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
}
export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}
export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}
export interface AlertsEntity {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags?: (null)[] | null;
}

const weatherApiKey = ref("9997f78ebf6b4f99a15190339200605")
const date = ref('')
const time = ref('')
const position: Ref<GeolocationPosition | null> = ref(null)
const weather: Ref<Weather | null> = ref(null)


async function getWeather() {
  //https://www.weatherapi.com/docs/
  axios
    .get('https://api.weatherapi.com/v1/current.json', {
      params: {
        key: weatherApiKey.value,
        q: `${position.value?.coords.latitude},${position.value?.coords.longitude}`
      }
    })
    .then(response => {
      weather.value = response.data.current
    })
    .catch(error => {
      console.error('getWeather', error);
    });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(p => {
      position.value = p;
      getWeather()
    });
  }
}


onMounted(() => {
  getLocation();
})



</script>
