<template>
  <div class="dashboard">
    <div class="grid">
            
      <div class="welcome-tile">
        <div class="welcome-tile-header">
          <div>Good morning,</div>
          <div>Romain!</div>
        </div>
        <span>Living room is opening</span>
        <div class="welcome-tile-link" @click="isSelected=!isSelected">See all activities</div>
      </div>
      
      <div class="weather-tile" @click="selectWeather()">
        <div class="datetime">
          <div>{{date}}</div>
          <div>{{time}}</div>
        </div>
        <div class="today">
          <img :src="weather.condition.icon" />
          <div>{{weather.condition.text}}</div>
          <div>{{weather.temp_c}}°C</div>
        </div>
        <div class="forecast">
          <div class="col">
            <div class="value">{{weather.feelslike_c}}°C</div>
            <div class="label">Feel</div>
          </div>
          <div class="col">
            <div class="value">{{weather.wind_kph}}Km/H</div>
            <div class="label">{{weather.wind_dir}}</div>
          </div>
          <div class="col">
            <div class="value">{{weather.precip_mm}}</div>
            <div class="label">mm</div>
          </div>
        </div>
      </div>
    
      <!-- <div class="blank-tile" /> -->

      <tile v-for="tile in page.tiles" :key="tile.id" :config="tile" />

    </div><!-- end of grid #1 -->
  </div>
</template>

<script>
import Tile from './../controls/Tile'
import moment from 'moment'
import axios from 'axios'
import { EventBus } from '@/EventBus.js';


export default {
  name: 'Dashboard',
  props: {   
    page: {type:Object, default:()=>{return {}}}
  },
  components:{
    Tile
  },
  data: function(){
    return {
      isSelected: false,
      weatherApiKey: "9997f78ebf6b4f99a15190339200605",
      date:'',
      time:'',
      position: undefined, //position.coords.latitude, position.coords.longitude;
      weather: {condition:{}}

    }
  },
  mounted(){
    moment.locale('fr');
    this.init();
    setInterval(() => {
      this.init();
    }, 6000);
  },

  methods:{
    init(){
      this.getLocation();
      this.date = moment().format("dddd Do MMMM YYYY");
      this.time =  moment().format("HH:mm");
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.position = position;
          this.getWeather()
        });
      }
    },
    getWeather(){
      //https://www.weatherapi.com/docs/
      axios
      .get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: this.weatherApiKey,
          q:`${this.position.coords.latitude},${this.position.coords.longitude}`
        }
      })
      .then( response => {
        this.weather = response.data.current
      })
      .catch(error => {
        console.error('getWeather', error);
      });
    },
    selectWeather(){
      EventBus.$emit('Tile.select', {id:'000',title:'Weather',settingPanelType:'weather'});
      EventBus.$emit('SwipePanel.open', 'component');
    }
  }

}
</script>

