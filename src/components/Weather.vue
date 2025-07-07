<template>
  <div class="weather-tile" v-if="!position">
    <button @click="getLocation" >Refresh</button>
  </div>
  <div class="weather-tile" v-if="weather">
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

export interface WeatherReply {
  location: Location
  current: Current
}

export interface Location {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

export interface Current {
  last_updated_epoch: number
  last_updated: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: Condition
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  vis_km: number
  vis_miles: number
  uv: number
  gust_mph: number
  gust_kph: number
}

export interface Condition {
  text: string
  icon: string
  code: number
}


const weatherApiKey = ref("9997f78ebf6b4f99a15190339200605")
const position: Ref<GeolocationPosition | null> = ref(null)
const weather: Ref<Current | null> = ref(null)


async function getWeather() {
  if(!position.value) return false

  try {
  
    //https://www.weatherapi.com/docs/

    console.log('Getting weather data...')
    const response = await axios
      .get('https://api.weatherapi.com/v1/currentv.json', {
        params: {
          key: weatherApiKey.value,
          q: `${position.value?.coords.latitude},${position.value?.coords.longitude}`
        }
      })

    console.log(response.data)

    weather.value = response.data.current

  } catch (error) {
    console.error(error)
  }
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(p => {
    console.log(p)
    position.value = p;
    getWeather()
  },
  (e) => console.error(e),
  { enableHighAccuracy: true }
);
}



// setInterval(() => {
//   getWeather()
// }, 60*1000)


</script>


<style lang="css" scoped>


.weather-tile
{

}

</style>