<script setup lang="ts">
import TransportLausanne from '@/components/TransportLausanne.vue'

import { ref, computed, onMounted } from 'vue'
import weatherCodes  from '@/assets/weather/weatherCodes.json' 

import { Chart } from 'vue-chartjs'
import 'chartjs-adapter-luxon';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  TimeScale,
  PointElement,
  LinearScale,
  BarElement,

} from 'chart.js'
import { DateTime } from 'luxon'
import DefaultForecast from "@/assets/weather/default-forecast.json"
import DefaultCurrent from "@/assets/weather/default-current.json"
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, TimeScale, PointElement, LinearScale, BarElement)
type DataSet = {
    [key: string]: unknown
  type: string,
  label: string,
  data: number[],
}
ChartJS.defaults.color = '#f2f2f2';
ChartJS.defaults.borderColor = '#282828';

const weatherApiKey = ref(import.meta.env.VITE_TOMORROW_API_KEY)
const date = ref(new Date())



const current= ref(DefaultCurrent)
const forecast= ref(DefaultForecast)


const currentWeatherText = computed(() => {
  if (current.value) {
    const code = current.value?.data.values.weatherCode
    return (weatherCodes.weatherCode as Record<string, string>)[String(code)]
  }

  return null

})

const weatherCodeImage = computed(() => {
  if (current.value) {
    const code = current.value?.data.values.weatherCode
    return String(code < 10000 ? code * 10 : code)
  }

  return ''

})


const chartOptionsToday = computed(() => {


  return {
    height: 500,
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Aujourd'hui"
      }
    },
    scales: {
      x: {
        type: 'time',
        display: true,
        offset: true,
        ticks: {
          source: 'data'
        },
        time: {
          unit: 'hour'
        },
      },
      
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    }


  }
})

const chartDataToday = computed(() => {
  const items = (forecast.value?.timelines.hourly ?? []).filter((e) => DateTime.now().hasSame(DateTime.fromISO(e.time), 'day'))

  const labels: DateTime[] = []


  const tempDataSet: DataSet  = {
    type: 'line',
    label: 'Temperature',
    borderColor: "#ff9101",
    cubicInterpolationMode: 'default',
    tension:0.4,
    data: [],
    yAxisID: 'y',
  }
  const rainDataSet: DataSet  = {
    type: 'bar',
    label: 'Précipitation mm/h',
    data: [],
    yAxisID: 'y1',
    borderRadius: 5,
    backgroundColor: "#3d5afe",


  }

  

  items
  .forEach((item) => {
    labels.push(DateTime.fromISO(item.time))
    
    tempDataSet.data.push(item.values.temperature)
    rainDataSet.data.push(item.values.rainAccumulation)

  })

  return {
    labels,
    datasets: [
      tempDataSet,
      rainDataSet,
    ]
  }
})





const chartOptionsForecast = computed(() => {


  return {
    height: 500,
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Semaine"
      }
    },
    scales: {
      x: {
        type: 'time',
        display: true,
        offset: true,
        ticks: {
          source: 'data'
        },
        time: {
          unit: 'hour'
        },
      },
      
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    }


  }
})

const chartDataForecast = computed(() => {
  const items = forecast.value?.timelines.daily ?? []

  const labels: DateTime[] = []

  const minTempDataSet: DataSet  = {
    type: 'line',
    label: 'Temperature Min',
    borderColor: "#FFE38B",
    data: [],
    borderDash: [5, 5],
        cubicInterpolationMode: 'default',
    tension:0.4,
    borderWidth:1,
    yAxisID: 'y',
  }


  const tempDataSet: DataSet  = {
    type: 'line',
    label: 'Temperature',
    borderColor: "#ff9101",
    cubicInterpolationMode: 'default',
    tension:0.4,
    data: [],
    yAxisID: 'y',
  }

  const maxTempDataSet: DataSet  = {
    type: 'line',
    label: 'Temperature Max',
    borderColor: "#FFE38B",
    borderDash: [5, 5],
    borderWidth:1,
        cubicInterpolationMode: 'default',
    tension:0.4,
    data: [],
    yAxisID: 'y',
  }

  items
  .forEach((item) => {
    labels.push(DateTime.fromISO(item.time))
    
    minTempDataSet.data.push(item.values.temperatureMin)
    tempDataSet.data.push(item.values.temperatureAvg)
    maxTempDataSet.data.push(item.values.temperatureMax)

  })

  return {
    labels,
    datasets: [
      minTempDataSet,
      tempDataSet,
      maxTempDataSet
    ]
  }
})





async function getCurrentWeather() {

  try {
    const response = await fetch(`https://api.tomorrow.io/v4/weather/realtime?location=Lausanne&apikey=${weatherApiKey.value}`)
    
    const json = await response.json()
    console.log(json)
    current.value = json

  } catch (error) {
    console.error(error)
  }
}



async function getForecast() {
  try {
    const response = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=Lausanne&apikey=${weatherApiKey.value}&units=metric`)
    
    const json = await response.json()
    console.log(json)
    forecast.value = json

  } catch (error) {
    console.error(error)
  }
}





function refreshClock() {
  date.value = new Date()
}



 
async function fetchAll() {

  await getCurrentWeather()
  await getForecast()

}

onMounted(() => {
  // fetchAll()
})


setInterval(() => {
  refreshClock()
}, 2000)

</script>



<template>
  <header>
    <img :src="`/weather-icons/${weatherCodeImage}.png`"  class="weather-image"/>

    <div class="datetime">
      <h1>{{ date.toLocaleDateString('fr-CH', { weekday: "long", month: "long", day: "numeric" }) }}</h1>
      <h2>{{ `0${date.getHours()}`.slice(-2) }}:{{ `0${date.getMinutes()}`.slice(-2) }}</h2>
      <p>{{ currentWeatherText }}</p>

    </div>

    <div class="current-weather"  v-if="current">
      <h1>{{current.data.values.temperature}}°C</h1>
      
      <span>
        <p>☀️ {{ current.data.values.uvIndex }}</p>&nbsp;&nbsp;&nbsp;
        <p>💨 {{current.data.values.windSpeed}} m/s</p>

      </span>
      <span>
        <p>💦 {{ current.data.values.humidity }}%</p>&nbsp;&nbsp;&nbsp;
        <p>☔️  {{ current.data.values.rainIntensity }} mm/h - {{current.data.values.precipitationProbability}}%</p>
      </span>

    </div>

    <div class="spacer" />
    <TransportLausanne />
  </header>

  <main>
    <!-- <OnThisDay /> -->

    <div>
      <Chart  :data="chartDataToday" :options="chartOptionsToday" />
      <Chart  :data="chartDataForecast" :options="chartOptionsForecast" />

    </div>
    <div>
      
    </div>

  </main>
</template>

<style scoped>
header
{
  line-height: 1.5;
  display: flex;
  place-items: flex-start;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
}


header > div
{
  margin: 0 20px;
}

.spacer
{
  flex-grow: 1;
}


.weather-image
{
  max-width: 100px;
}

.datetime
{

}


.current-weather
{
  display: flex;
  align-items: flex-start;
  flex-direction: column;

}
.current-weather > span
{
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}

.current-weather h1
{
  margin: 5px;

}

.current-humidity 
{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  margin: 5px;
}

.current-humidity  img {
  width: 20px;
  margin: 0 ;
  margin-right: 10px;

}


.current-precipitation  {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  margin: 5px;

}

.current-precipitation  img {
  width: 20px;
  margin: 0 ;
  margin-right: 10px;

}



.weather-details p {
  font-size: large;

}

main
{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
main > div
{
 flex-grow: 1;
  max-width: 50%;
  display: flex;
  flex-direction: column;
}



</style>
