<template>
  <div>
    <h3>Ce jour là:</h3>
    <ul>
      <li
        v-for="(sentence, index) in onThisDay?.births"
        :key="`births-${index}`"
      >{{ sentence.text }}</li>
    </ul>
    <p>{{ sentence }}</p>
    <p>{{ birthSentence }}</p>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, type Ref } from 'vue'

type OnThisDayItem = {
  text: string
}

type OnThisDay = {
  selected: OnThisDayItem[]
  births: OnThisDayItem[]
}

const apiKey = ref(import.meta.env.VITE_WIKIMEDIA_TOKEN)

const onThisDay: Ref<OnThisDay | null> = ref(null)



const sentence = computed(() => {

  if (
    !!onThisDay.value && typeof onThisDay.value === 'object'
    && 'selected' in onThisDay.value && Array.isArray(onThisDay.value.selected) && onThisDay.value.selected.length > 0
    && onThisDay.value.selected[0]
  ) {
    return onThisDay.value.selected[0].text
  }

  return ''
})


const birthSentence = computed(() => {

  if (
    !!onThisDay.value && typeof onThisDay.value === 'object'
    && 'births' in onThisDay.value && Array.isArray(onThisDay.value.births) && onThisDay.value.births.length > 0
    && onThisDay.value.births[0]
  ) {
    return onThisDay.value.births[0].text
  }

  return ''
})




async function getData() {
  try {
  

    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2,'0');
    const day = String(today.getDate()).padStart(2,'0');
    const url = `https://api.wikimedia.org/feed/v1/wikipedia/fr/onthisday/all/${month}/${day}`;

    const response = await fetch( url,
        {
            headers: {
                'Authorization': `Bearer ${apiKey.value}`,
                'Api-User-Agent': 'Homeboard'
            }
        }
    );
    onThisDay.value = await response.json()

    
    // console.log('Getting weather data...')
    // const response = await axios
    //   .get(`https://fetedujour.fr/api/v2/${apiKey}/json`, { maxRedirects: 2,  })

    // console.log(response.data)
    // const data: unknown = response.data

    // if (!!data && typeof data == 'object') {
    //   if ('name' in data && typeof data.name === 'string') {
    //     fete.value = data.name

    //   } else if('saints' in data && Array.isArray(data.saints)) {
    //     fete.value = data.saints.map((s) => `St${s.gender === 'F' ? 'e' : ''} ${s.name}`).join(', ')
    //   }

    // }

  } catch (error) {
    console.error(error)
  }
}


onMounted(() => {
  getData()
})

</script>