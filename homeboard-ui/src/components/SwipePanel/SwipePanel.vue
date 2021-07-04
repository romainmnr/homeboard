<template>
  <div class="swipe-panel" :class="{opened:isOpen}" :style="{bottom:bottomPos}">
    <div
      class="drag-line"  
      @click="toggleMenu()" 
      @mousedown="startDrag" 
      @mouseup="stopDrag" />

    <div class="menu-header">
      <div v-if="isOpen" class="page-title" v-html="panelTitle" />
      <div v-else class="btn btn-txt btn-black" @click="showSelectRoom()">
        <div v-html="currentPageLabel" />
        <i class="fas fa-chevron-up" />
      </div>

      <div class="blank" @click="toggleMenu()" />
      <div class="linear-switch" :class="{'bg-grey-medium':isOpen}">
        <div 
          class="btn btn-circle btn-no-bg no-hover" 
          :class="{active: activePanelContent=== 'component'}"
          @click="switchContent('component')">
          <i class="fas fa-box-open" />
        </div>
        <div 
          class="btn btn-circle btn-no-bg no-hover" 
          :class="{active: activePanelContent=== 'page'}"
          @click="switchContent('page')">
          <i class="fas fa-th" />
        </div>
        <div 
          class="btn btn-circle btn-no-bg no-hover" 
          :class="{active: activePanelContent=== 'settings'}"
          @click="switchContent('settings') ">
          <i class="fas fa-sliders-h" />
        </div>
      </div>
    </div>

    <swipe-panel-settings v-show="activePanelContent == 'settings' " />
    <swipe-panel-page v-show="activePanelContent == 'page' " />
    <swipe-panel-component v-show="activePanelContent == 'component' " />
  </div>
</template>

<script>
import { EventBus } from '@/configs/EventBus';
import SwipePanelSettings from '@/components/SwipePanel/Panels/SwipePanelSettings'
import SwipePanelPage from '@/components/SwipePanel/Panels/SwipePanelPage'
import SwipePanelComponent from '@/components/SwipePanel/Panels/SwipePanelComponent'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components:{
    SwipePanelSettings,
    SwipePanelPage,
    SwipePanelComponent
  }
})
export default class SwipePanel extends Vue {

  get currentPage()
  {
    return this.$store.getters.getPage
  }

  get userProfile()
  {
    return this.$store.getters.getUserProfile
  }
  get isOpen(){
    return this.bottomPos == '0px';
  }
  get currentPageLabel(){
    return `<i class="${this.currentPage.icon}"></i> ${this.currentPage.name}`
  }
  
  data()
  {
    return {
      activePanelContent: '',
      bottomPos:'0px',
      panelTitle:'',
      selectedComponent:{},
    }
  }

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
    
  }

  showSelectRoom () {
    EventBus.$emit('SelectRoomDialog.show');
  }
  switchContent(name){
    this.activePanelContent = name;
    switch (name) {
      case 'settings':
        this.panelTitle = '<i class="fas fa-sliders-h"></i> Settings';
        break;
      case 'component':
        this.panelTitle = this.currentPageLabel +' <i class="fas fa-chevron-right"></i> '+ this.selectedComponent.title;
        break;
      default:
        this.panelTitle = this.currentPageLabel;
        break;
    }
    

  }
  toggleMenu () {
    if(this.isOpen){
      this.closeMenu()
    }else{
      this.openMenu()
    }
  }
  openMenu(){
    this.bottomPos= '0px';
    EventBus.$emit('MainContent.toggleOverlay', true)
  }
  closeMenu(){
    this.bottomPos=  '-70vh';
    EventBus.$emit('MainContent.toggleOverlay', false)
  }


  startDrag(){
    document.addEventListener('mousemove', this.moveCursor);
  }
  stopDrag(){
    document.removeEventListener('mousemove', this.moveCursor);
  }
  moveCursor(){

  }

}

</script>

