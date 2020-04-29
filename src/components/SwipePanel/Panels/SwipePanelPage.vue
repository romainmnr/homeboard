<template>
    <div class="swipe-panel-content"  >

     <div class="msg">
       <h1>No setting available</h1>
       <i class="fas fa-toolbox fa-4x"></i>
     </div>


      <div class="blocks" v-show="false">
        
        <div class="block">
          <div class="block-title">Scenes</div>
          <div class="bock-content">
            <div class="bordered-list">
              <div class="row">
                <div><i class="fas fa-home"></i></div>
                <div class="fill">Some txt</div>
                <div><i class="fas fa-chevron-right"></i></div>
              </div>
              <div class="row">
                <div><i class="fas fa-home"></i></div>
                <div class="fill">Some txt</div>
                <div><i class="fas fa-chevron-right"></i></div>
              </div>
              <div class="row">
                <div><i class="fas fa-home"></i></div>
                <div class="fill">Some txt</div>
                <div><i class="fas fa-chevron-right"></i></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div><!-- End of panel page -->

</template>
<script>
export default {
  name: 'SwipePanelPage',

}
</script>