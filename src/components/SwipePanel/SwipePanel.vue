<template>
  <div class="swipe-panel" :class="{opened:isOpen}" :style="{bottom:bottomPos}">
    <div class="drag-line"  
    @click="toggleMenu()" 
    @mousedown="startDrag" 
    @mouseup="stopDrag" />

    <div class="menu-header">
      <div class="page-title" v-if="isOpen" v-html="panelTitle"></div>
      <div class="btn btn-txt btn-black" v-else @click="showSelectRoom()">
        <div v-html="currentPage"></div>
        <i class="fas fa-chevron-up"></i>
      </div>

      <div class="blank" @click="toggleMenu()" />
      <div class="linear-switch" :class="{'bg-grey-medium':isOpen}">
        <div 
          class="btn btn-circle btn-no-bg no-hover" 
          :class="{active: activePanelContent=== 'component'}"
          @click="switchContent('component')">
          <i class="fas fa-box-open"></i>
        </div>
        <div 
          class="btn btn-circle btn-no-bg no-hover" 
          :class="{active: activePanelContent=== 'page'}"
          @click="switchContent('page')">
          <i class="fas fa-th"></i>
        </div>
        <div 
          class="btn btn-circle btn-no-bg no-hover" 
          :class="{active: activePanelContent=== 'settings'}"
          @click="switchContent('settings') ">
          <i class="fas fa-sliders-h"></i>
        </div>
      </div>
    </div>

   <swipe-panel-settings  v-show="activePanelContent == 'settings' " />
   <swipe-panel-page  v-show="activePanelContent == 'page' " />
   <swipe-panel-component  v-show="activePanelContent == 'component' " />

  </div>
</template>

<script>
import { EventBus } from '@/EventBus.js';
import SwipePanelSettings from '@/components/SwipePanel/Panels/SwipePanelSettings'
import SwipePanelPage from '@/components/SwipePanel/Panels/SwipePanelPage'
import SwipePanelComponent from '@/components/SwipePanel/Panels/SwipePanelComponent'


export default {
  name: 'SwipePanel',
  components:{
    SwipePanelSettings,
    SwipePanelPage,
    SwipePanelComponent
  },
  data: function(){
    return {
      activePanelContent: '',
      bottomPos:'0px',
      panelTitle:'',
      currentPage:'<i class="fas fa-home"></i> Dashboard',
      selectedComponent:{},
    }
  },
  mounted(){
    this.closeMenu()
    this.switchContent('settings')
    EventBus.$on('MainContent.clickOverlay', ()=>{
      this.closeMenu()
    })
    EventBus.$on('SwipePanel.open', (tab)=>{
      this.switchContent(tab);
      this.openMenu();
    })
    EventBus.$on('Tile.select', (tileConfig)=>{
      this.selectedComponent = tileConfig
    })
    
  },
  computed:{
    isOpen(){
      return this.bottomPos == '0px';
    }
  },
  methods:{
    showSelectRoom () {
      EventBus.$emit('SelectRoomDialog.show');
    },
    switchContent(name){
      this.activePanelContent = name;
      switch (name) {
        case 'settings':
        this.panelTitle = '<i class="fas fa-sliders-h"></i> Settings';
          break;
        case 'component':
          this.panelTitle = this.currentPage +' <i class="fas fa-chevron-right"></i> '+ this.selectedComponent.title;
          break;
        default:
          this.panelTitle = this.currentPage;
          break;
      }
      

    },
    toggleMenu () {
      if(this.isOpen){
        this.closeMenu()
      }else{
        this.openMenu()
      }
    },
    openMenu(){
      this.bottomPos= '0px';
      EventBus.$emit('MainContent.toggleOverlay', true)
    },
    closeMenu(){
      this.bottomPos=  '-70vh';
      EventBus.$emit('MainContent.toggleOverlay', false)
    },


    startDrag(){
      document.addEventListener('mousemove', this.moveCursor);
    },
    stopDrag(){
      document.removeEventListener('mousemove', this.moveCursor);
    },
    moveCursor(){

    }


  }
}
</script>

