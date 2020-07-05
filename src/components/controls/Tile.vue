
<template>

  <div class="tile" :class="[isSelected ? 'selected':'', tileSize]">
    <div class="tile-header">
      <div class="tile-icon" :class="[iconClass, isIconClickable ? 'hover' : '' ]" v-html="iconContent" @click="clickIcon()"></div>
      <div class="tile-title" @click="selectTile()">
        <div v-html="title"></div>
        <div v-html="subtitle"></div>
      </div>
      <div class="tile-actions" v-html="settingIcon" @click="clickSettings()"></div>
    </div>
    <div class="tile-content" v-if="contentType" >


      <div class="control-value" v-if="contentType == 'controlValue' ">
        <div>
          <div class="value"><i class="fas fa-arrow-down"></i> 120</div>
          <div class="unit">Mbps</div>
        </div>
        <div>
          <div class="value"><i class="fas fa-arrow-up"></i> 90</div>
          <div class="unit">Mbps</div>
        </div>
      </div>
      
      <div class="tile-header" v-if="contentType == 'doubleTile' ">
        <div class="tile-icon tile-orange hover"><i class="fas fa-lightbulb"></i></div>
        <div class="tile-title">
          <div>Lamp</div>
          <div>Living room</div>
        </div>
        <div class="tile-actions">
          <i class="fas fa-sliders-h"></i>
        </div>
      </div>


      <div class="btn-list small" :class="{small:contentConfig.compact}"  v-if="contentType == 'btnList' ">
        <div v-for=" (btn, idx) in contentConfig.buttons" :key="`btnlist-${id}-${idx}`">
          <div class="btn btn-circle btn-blue"><i class="fas fa-home"></i></div>
          <span>Ambiant</span>
        </div>
        /*
      "color"   : String|DynamicValue, 
      "icon"    : String|DynamicValue, 
      "label"   : String|DynamicValue, 
      "onClick" : Action
      */
      </div>



      <div class="slider"  
        v-if="contentType == 'slider' " 
        @mousedown="sliderMouseDown" 
        @mouseup="sliderMouseUp">
        <div class="slider-fill" :style="{width:sliderValue +'%'}"/>
      </div>



      <div class="control-number"  v-if="contentType == 'controlNumber' ">
        <div class="btn btn-circle btn-grey"><i class="fas fa-minus"></i></div>
        <div>25°C</div>
        <div class="btn btn-circle btn-grey"><i class="fas fa-plus"></i></div>
      </div>




    </div>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus.js';

export default {
  name: 'Tile',
  props:{
    config:{type:Object, default:()=>{return{}}}
  },
  data: function(){
    return {
      id: Date.now(),
      isSelected: false,
      tileSize: '', //tile-2x
      iconType: 'icon',// 'icon' or 'raw'
      isIconClickable: false,
      settingIcon: '<i class="fas fa-sliders-h"></i>',
      settingPanelType: '',
      contentType: '',// controlValue, doubleTile, btnList, slider, controlNumber
      iconAction: undefined,
      contentConfig: {},

      title: 'Title',
      subtitle: 'description here',
      iconContent: '<i class="fas fa-home"></i>',
      iconClass: 'tile-red',

      //-- Slider config
      sliderLazy: false,
      sliderValue: 50,
      sliderAction:undefined,


    }
  },
  mounted () {
    this.parseConfig()
    EventBus.$on('Tile.select', (config)=>{
      if(config.id != this.id)this.isSelected = false
    })
    EventBus.$on('update-ui', () => {
      this.parseConfig();
    })
    this.$socketClient.on('calcDynamicValue.reply', ({ tileField, pageId, tileId, value}) => {
      console.log('calcDynamicValue.reply', { tileField, pageId, tileId, value})
      if(this.id === tileId){
        this[tileField]= value
      }
    });

  },
  
  methods:{
    parseConfig (){
      this.id = this.config.id;
      this.tileSize = `tile-${this.config.size}x`;
      this.iconType = this.config.iconType;
      this.isIconClickable = this.config.isIconClickable;
      this.settingIcon = `<i class="${this.config.settingIcon}"></i>`,
      this.settingPanelType= this.config.settingPanelType;
      this.contentType = this.config.contentType;
      this.iconAction = this.config.iconAction;
      this.contentConfig = this.config.contentConfig;
      this.parseAllDynamicValue();
    },
    parseAllDynamicValue(){
      this.title = this.parseDynamicValue('title', this.config.title);// todo: substring
      this.subtitle = this.parseDynamicValue('subtitle', this.config.subtitle);// todo: substring
      this.iconClass = 'tile-' + this.parseDynamicValue('iconClass', this.config.iconColor);
      this.iconContent = this.iconType == 'icon' 
        ? `<i class="${this.parseDynamicValue('iconContent', this.config.iconContent)}"></i>`
        : this.parseDynamicValue('iconContent', this.config.iconContent);

    },
    parseDynamicValue(tileField, valueConfig){
      if( typeof valueConfig === 'string') {
        return valueConfig;
      }else{
        this.$socketClient.emit('calcDynamicValue', {
          tileField: tileField,
          pageId: this.$route.params.pageId,
          tileId: this.id
        })
        return valueConfig.default
      }
    },

    //-- Global functions
    clickIcon () {
      if(!this.isIconClickable) return false;
    },
    selectTile(){
      this.isSelected = !this.isSelected;
      EventBus.$emit('Tile.select', this.config);
    },
    clickSettings(){
      this.selectTile()
      EventBus.$emit('SwipePanel.open', 'component')
    },
    //-----


    //-- Slider
    sliderMouseDown (ev){
      document.addEventListener('mousemove', this.sliderListener);
      this.sliderXStart = ev.offsetX;
    },
    sliderMouseUp () {
      document.removeEventListener('mousemove',  this.sliderListener);
      if(this.sliderLazy){
        // call slider action here
      }
    },
    sliderListener (ev) {
      let diff = ev.offsetX- this.sliderXStart;
      this.sliderValue = Math.max(0, Math.min(this.sliderValue + (diff * 0.04) , 100)) 
      if(!this.sliderLazy){
        // call slider action here
      }
    },
    //------







  }
}
</script>

