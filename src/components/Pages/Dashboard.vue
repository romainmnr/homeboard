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
      <div class="weather-tile">
        <div class="datetime">
          <div>Jeudi 14 Avril 2020 </div>
          <div>12:30</div>
        </div>
        <div class="today">
          <img src="/cloud.svg" />
          <div>18°C/20°C</div>
        </div>
    
      </div>
      <!-- <div class="blank-tile" /> -->



      <div class="tile" :class="{selected:isSelected}">
        <div class="tile-header">
          <div class="tile-icon tile-green"><i class="fas fa-home"></i></div>
          <div class="tile-title">
            <div>Title</div>
            <div>description here</div><!-- limited to 23 char -->
          </div>
          <div class="tile-actions">
            <i class="fas fa-palette"></i>
          </div>
        </div>
        <div class="tile-content">


          
          <div class="slider">
            <div class="slider-fill" style="width:50%"/>
          </div>
        </div>
      </div>
      
      <div class="tile" :class="{selected:isSelected}">
        <div class="tile-header">
          <div class="tile-icon tile-red"><i class="fas fa-home"></i></div>
          <div class="tile-title">
            <div>Living room</div>
            <div>Off</div>
          </div>
          <div class="tile-actions">
            <i class="fas fa-palette"></i>
          </div>
        </div>
        <div class="tile-content">
          <div class="btn-list small">
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
        </div>
      </div>

            
      <div class="tile" :class="{selected:isSelected}">
        <div class="tile-header">
          <div class="tile-icon tile-orange hover"><i class="fas fa-lightbulb"></i></div>
          <div class="tile-title">
            <div>Lamp</div>
            <div>Living room</div>
          </div>
          <div class="tile-actions">
            <i class="fas fa-sliders-h"></i>
          </div>
        </div>
        <div class="tile-header">
          <div class="tile-icon tile-orange hover"><i class="fas fa-lightbulb"></i></div>
          <div class="tile-title">
            <div>Lamp</div>
            <div>Living room</div>
          </div>
          <div class="tile-actions">
            <i class="fas fa-sliders-h"></i>
          </div>
        </div>
      </div>

      <div class="tile" :class="{selected:isSelected}">
        <div class="tile-header">
          <div class="tile-icon tile-purple"><i class="fas fa-fan"></i></div>
          <div class="tile-title">
            <div>Heater</div>
            <div>Bedroom</div>
          </div>
          <div class="tile-actions">
            <i class="fas fa-info-circle"></i>
          </div>
        </div>
        <div class="tile-content">
          <div class="control-number">
            <div class="btn btn-circle btn-grey"><i class="fas fa-minus"></i></div>
            <div>25°C</div>
            <div class="btn btn-circle btn-grey"><i class="fas fa-plus"></i></div>
          </div>
        </div>
      </div>

      <div class="tile tile-2x" :class="{selected:isSelected}">
        <div class="tile-header">
          <div class="tile-icon tile-blue"><i class="fas fa-home"></i></div>
          <div class="tile-title">
            <div>Scenes</div>
            <div></div>
          </div>
          <div class="tile-actions">
            <i class="fas fa-sliders-h"></i>
          </div>
        </div>
        <div class="tile-content">
    
          <div class="btn-list">
            <div>
              <div class="btn btn-circle btn-blue"><i class="fas fa-home"></i></div>
              <span>Home</span>
            </div>
            <div>
              <div class="btn btn-circle btn-purple"><i class="fas fa-sliders-h"></i></div>
              <span>Out</span>
            </div>
                <div>
              <div class="btn btn-circle btn-grey"><i class="fas fa-lightbulb"></i></div>
              <span>Home</span>
            </div>
            <div>
            <div class="btn btn-circle btn-black"><i class="fas fa-sliders-h"></i></div>
              <span>Out</span>
            </div>
            <div>
              <div class="btn btn-circle btn-orange"><i class="fas fa-home"></i></div>
              <span>Home</span>
            </div>
            <div>
              <div class="btn btn-circle btn-green"><i class="fas fa-lightbulb"></i></div>
              <span>Home</span>
            </div>
      
          </div>

        </div>
      </div>

      <div class="tile" :class="{selected:isSelected}">
        <div class="tile-header">
          <div class="tile-icon tile-blue">30°C</div>
          <div class="tile-title">
            <div>Temperature</div>
            <div>Bedroom</div>
          </div>
          <div class="tile-actions">
            <i class="fas fa-info-circle"></i>
          </div>
        </div>
      </div>
      <div class="tile tile-2x" :class="{selected:isSelected}">
        <div class="tile-header">
          <div class="tile-icon"><i class="fas fa-home"></i></div>
          <div class="tile-title">
            <div>Word of the day</div>
            <div></div>
          </div>
          <div class="tile-actions">
            <i class="fas fa-sliders-h"></i>
          </div>
        </div>
        <div class="tile-content">
            <div>description here sfsdf sdfsdf sdfdsf</div>
        </div>
      </div>

      <div class="tile" :class="{selected:isSelected}">
        <div class="tile-header">
          <div class="tile-icon tile-red"><i class="fas fa-home"></i></div>
          <div class="tile-title">
            <div>Title</div>
            <div>description here</div>
          </div>
          <div class="tile-actions">
            <i class="fas fa-sliders-h"></i>
          </div>
        </div>
        <div class="tile-content">
   
          <div class="control-value">
            <div>
              <div class="value"><i class="fas fa-arrow-down"></i> 120</div>
              <div class="unit">Mbps</div>
            </div>
            <div>
              <div class="value"><i class="fas fa-arrow-up"></i> 90</div>
              <div class="unit">Mbps</div>
            </div>
          </div>
          
        </div>
      </div>
            <div class="tile" :class="{selected:isSelected}">
        <div class="tile-header">
          <div class="tile-icon tile-green hover"><i class="fas fa-couch"></i></div>
          <div class="tile-title">
            <div>Lamp</div>
            <div>Living room</div>
          </div>
          <div class="tile-actions">
            <i class="fas fa-sliders-h"></i>
          </div>
        </div>
      </div>

      <div class="tile" :class="{selected:isSelected}">
        <div class="tile-header">
          <div class="tile-icon tile-green"><i class="fas fa-home"></i></div>
          <div class="tile-title">
            <div>Title</div>
            <div>description here</div><!-- limited to 23 char -->
          </div>
          <div class="tile-actions">
            <i class="fas fa-palette"></i>
          </div>
        </div>
        <div class="tile-content">
          <div class="slider">
            <div class="slider-fill" style="width:50%"/>
          </div>
        </div>
      </div>

    </div><!-- end of grid #1 -->
    
   
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data: function(){
    return {
      isSelected: false
    }
  }
}
</script>

