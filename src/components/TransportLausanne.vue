
<template>
  <div v-if="stationInfo">
    <h3>{{  stationInfo?.station.name }}</h3>
    <table class="styled-table">

      <tr
        v-for="(row, rowIndex) in items"
        :key="`row-${rowIndex}`"
      >
        <td
          v-for="(cell, cellIndex) in row"
        :key="`cell-${cellIndex}`"
        >{{ cell }}</td>
      </tr>
    </table>

  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import { onMounted, ref, type Ref } from 'vue'
import axios from 'axios'
import type { TransportApiStationboardReply } from '@/types'

// https://transport.opendata.ch/examples/stationboard.html

const stationInfo: Ref<TransportApiStationboardReply | null > = ref(null)
const items: Ref<Array<string>[]> = ref([])

async function getStationInfo() {

  try {
  
    console.log('Getting weather data...')
    const response = await axios
      .get('http://transport.opendata.ch/v1/stationboard', {
        params: {
          // station: 'Lausanne, Valency',
          id:'8592124',// Valency
          limit: 4,
        }
      })

    console.log(response.data)
    stationInfo.value = response.data
    items.value = []

    if (stationInfo.value?.stationboard) {
      let i = 0; const iMax = stationInfo.value.stationboard.length
      for (; i < iMax; i += 1) {
        const journey = stationInfo.value.stationboard[i]
        let delayed = false


        let date = DateTime.fromISO(journey.stop.departure, { locale: "fr" })
        if (journey.stop.prognosis?.departure) {
          date = DateTime.fromISO(journey.stop.prognosis.departure, { locale: "fr" })
          delayed = journey.stop.prognosis.departure !== journey.stop.departure
        }


        items.value.push([
          date.toLocaleString(DateTime.TIME_24_SIMPLE) ?? '',
          journey.number,
          journey.to,
          `${delayed ? '⚠️' : ''} ${date.toRelative() ?? ''}`,

        ])
      }

    }


  } catch (error) {
    console.error(error)
  }
}



onMounted(() => {
  getStationInfo()
})

</script>


<style lang="css" scoped>



</style>
