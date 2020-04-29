
<template>

  <div class="tile" :class="{selected:isSelected}">
    <div class="tile-header">
      <div class="tile-icon" :class="{iconClass, 'hover':isClickable}" v-html="iconValue" @click="clickIcon()"></div>
      <div class="tile-title" @click="selectTile()">
        <div>{{title}}</div>
        <div>{{description}}</div>
      </div>
      <div class="tile-actions" v-html="settingIcon" @click="clickSettings()"></div>
    </div>
    <div class="tile-content" v-if="contentType" >


      <div class="control-value" v-if="contentType == 'control-value' ">
        <div>
          <div class="value"><i class="fas fa-arrow-down"></i> 120</div>
          <div class="unit">Mbps</div>
        </div>
        <div>
          <div class="value"><i class="fas fa-arrow-up"></i> 90</div>
          <div class="unit">Mbps</div>
        </div>
      </div>
      
      <div class="tile-header" v-if="contentType == 'tile-header' ">
        <div class="tile-icon tile-orange hover"><i class="fas fa-lightbulb"></i></div>
        <div class="tile-title">
          <div>Lamp</div>
          <div>Living room</div>
        </div>
        <div class="tile-actions">
          <i class="fas fa-sliders-h"></i>
        </div>
      </div>


      <div class="btn-list small"  v-if="contentType == 'btn-list' ">
        <div>
          <div class="btn btn-circle btn-blue"><i class="fas fa-home"></i></div>
          <span>Ambiant</span>
        </div>
        <div>
          <div class="btn btn-circle btn-purple"><i class="fas fa-sliders-h"></i></div>
          <span>TV</span>
        </div>
        <div>
          <div class="btn btn-circle btn-grey"><i class="fas fa-lightbulb"></i></div>
          <span>Cosy</span>
        </div>
      </div>



      <div class="slider"  v-if="contentType == 'slider' ">
        <div class="slider-fill" style="width:50%"/>
      </div>



      <div class="control-number"  v-if="contentType == 'control-number' ">
        <div class="btn btn-circle btn-grey"><i class="fas fa-minus"></i></div>
        <div>25°C</div>
        <div class="btn btn-circle btn-grey"><i class="fas fa-plus"></i></div>
      </div>




    </div>
  </div>
</template>

<script>
import { EventBus } from '@/scripts/EventBus.js';

export default {
  name: 'Tile',
  props:{

    /**
     * @property {}
     */
    config:{type:String, default:()=>{return{}}}

  },
  data: function(){
    return {
      isSelected: false,
      isClickable: false,

      title: 'Title',
      description: 'A description here',
      iconValue: '<i class="fas fa-home"></i>',
      iconClass: 'tile-red',
      settingIcon: '<i class="fas fa-sliders-h"></i>',

      contentType: '',
      contentConfig:''

    }
  },
  mounted () {
  },
  methods:{
    clickIcon () {
      if(!this.isClickable) return false;

    },
    selectTile(){
      this.isSelected = !this.isSelected;
      EventBus.$emit('Tile.select', {
        isSelected: this.isSelected,
        // add tile info
      })
    },
    clickSettings(){
      this.selectTile()
      EventBus.$emit('Tile.clickSettings', {
        // add tile info
      })
    }


  }
}
</script>

