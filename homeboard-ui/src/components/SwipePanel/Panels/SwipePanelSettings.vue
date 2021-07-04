<template>
  <div class="swipe-panel-content">
    <div class="user">
      <div class="user-thumb" style="background-image:url('https://s2.qwant.com/thumbr/0x380/6/6/6d85e34c13f08eb4650cea423ba25ce7f66184df1e05cdeeeddc89b6e02326/perfect-profile-picture-all-about-face.jpg?u=https%3A%2F%2Fstatic.makeuseof.com%2Fwp-content%2Fuploads%2F2015%2F11%2Fperfect-profile-picture-all-about-face.jpg')" />
      <div class="user-name">
        Romain
      </div>
      <div class="user-email">
        meunier.rm@gmail.com
      </div>
    </div>

    <div v-show="false" class="msg">
      <h1>No setting available</h1>
      <i class="fas fa-toolbox fa-4x" />
    </div>

    <div class="blocks">
      <div class="block">
        <div class="block-title">
          Settings
        </div>
        <div class="bock-content">
          <div class="bordered-list">
            <div class="row">
              <div><i class="fas fa-home" /></div>
              <div class="fill">
                Some txt
              </div>
              <div><i class="fas fa-chevron-right" /></div>
            </div>
            <div class="row">
              <div><i class="fas fa-home" /></div>
              <div class="fill">
                Some txt
              </div>
              <div><i class="fas fa-chevron-right" /></div>
            </div>
            <div class="row">
              <div><i class="fas fa-home" /></div>
              <div class="fill">
                Some txt
              </div>
              <div><i class="fas fa-chevron-right" /></div>
            </div>
          </div>
        </div>
      </div>
      <div class="block">
        <div class="block-title">
          Rooms
        </div>
        <div class="bock-content">
          <div class="bordered-list">
            <div class="row">
              <div><i class="fas fa-home" /></div>
              <div class="fill">
                Some txt
              </div>
              <div><i class="fas fa-chevron-right" /></div>
            </div>
            <div class="row">
              <div><i class="fas fa-home" /></div>
              <div class="fill">
                Some txt
              </div>
              <div><i class="fas fa-chevron-right" /></div>
            </div>
            <div class="row">
              <div><i class="fas fa-home" /></div>
              <div class="fill">
                Some txt
              </div>
              <div><i class="fas fa-chevron-right" /></div>
            </div>
          </div>
        </div>
      </div>
      <div class="block">
        <div class="block-title">
          Scenes
        </div>
        <div class="bock-content">
          <div class="bordered-list">
            <div class="row">
              <div><i class="fas fa-home" /></div>
              <div class="fill">
                Some txt
              </div>
              <div><i class="fas fa-chevron-right" /></div>
            </div>
            <div class="row">
              <div><i class="fas fa-home" /></div>
              <div class="fill">
                Some txt
              </div>
              <div><i class="fas fa-chevron-right" /></div>
            </div>
            <div class="row">
              <div><i class="fas fa-home" /></div>
              <div class="fill">
                Some txt
              </div>
              <div><i class="fas fa-chevron-right" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div><!-- End of panel setting -->
</template>
<script>
export default {
  name: 'SwipePanelSettings',

}
</script>