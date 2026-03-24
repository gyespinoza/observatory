<template>
  <section class="main-slider revolution-slider">
    <div class="tp-banner-container">
      <div class="tp-banner">
        <ul>
          <li data-transition="fade" data-slotamount="1" data-masterspeed="1000" data-saveperformance="off"
            data-title="Iniciativas UGB">
            <img src="/img/carrouselImages/5.jpg"  style="width: 100%; height: 400px; object-fit: cover;" />
              <div class="slider-overlay"></div>
            <div class="tp-caption sfr sfb tp-resizeme" data-x="left" data-hoffset="90" data-y="center"
              data-voffset="-50" data-speed="1500" data-start="1000" data-easing="easeOutExpo" data-splitin="none"
              data-splitout="none" data-elementdelay="0.01" data-endelementdelay="0.3" data-endspeed="1200"
              data-endeasing="Power4.easeIn">
              <h1><span class="normal-font">Observatorio Verde</span> UGB</h1>
            </div>

            <div class="tp-caption sfl sfb tp-resizeme" data-x="left" data-hoffset="90" data-y="center"
              data-voffset="40" data-speed="1500" data-start="1500" data-easing="easeOutExpo" data-splitin="none"
              data-splitout="none" data-elementdelay="0.01" data-endelementdelay="0.3" data-endspeed="1200"
              data-endeasing="Power4.easeIn">
              <h3 class="bg-color">Descubre lo mejor del observatorio verde</h3>
            </div>
          </li>


          <li data-transition="slidedown" data-slotamount="1" data-masterspeed="1000" data-saveperformance="off"
            data-title="Iniciativas UGB">
            <img src="/img/carrouselImages/9.jpg" style="width: 100%; height: 400px; object-fit: cover;" />
              <div class="slider-overlay"></div>

            <div class="tp-caption sfr sfb tp-resizeme" data-x="left" data-hoffset="90" data-y="center"
              data-voffset="-50" data-speed="1500" data-start="1000" data-easing="easeOutExpo" data-splitin="none"
              data-splitout="none" data-elementdelay="0.01" data-endelementdelay="0.3" data-endspeed="1200"
              data-endeasing="Power4.easeIn">
              <h1><span class="normal-font">Iniciativas</span> UGB</h1>
            </div>

            <div class="tp-caption sfl sfb tp-resizeme" data-x="left" data-hoffset="90" data-y="center"
              data-voffset="40" data-speed="1500" data-start="1500" data-easing="easeOutExpo" data-splitin="none"
              data-splitout="none" data-elementdelay="0.01" data-endelementdelay="0.3" data-endspeed="1200"
              data-endeasing="Power4.easeIn">
              <h3 class="bg-color">Conoce las iniciativas del observatorio verde</h3>
            </div>
          </li>


          <li data-transition="fade" data-slotamount="1" data-masterspeed="1000" data-saveperformance="off">
            <img src="/img/carrouselImages/10.jpg" style="width: 100%; height: 400px; object-fit: cover;" />
              <div class="slider-overlay"></div>

            <div class="tp-caption sfr sfb tp-resizeme" data-x="left" data-hoffset="90" data-y="center"
              data-voffset="-50" data-speed="1500" data-start="1000" data-easing="easeOutExpo" data-splitin="none"
              data-splitout="none" data-elementdelay="0.01" data-endelementdelay="0.3" data-endspeed="1200"
              data-endeasing="Power4.easeIn">
              <h1><span class="normal-font">UGB </span> Verde</h1>
            </div>

            <div class="tp-caption sfl sfb tp-resizeme" data-x="left" data-hoffset="90" data-y="center"
              data-voffset="40" data-speed="1500" data-start="1500" data-easing="easeOutExpo" data-splitin="none"
              data-splitout="none" data-elementdelay="0.01" data-endelementdelay="0.3" data-endspeed="1200"
              data-endeasing="Power4.easeIn">
              <h3 class="bg-color">Ya viste nuestro proyecto de UGB Verde?</h3>
            </div>
          </li>



          <li data-transition="fade" data-slotamount="1" data-masterspeed="1000" data-saveperformance="off">
            <!-- Imagen -->
            <img src="/img/carrouselImages/11.jpg" style="width: 100%; height: 400px; object-fit: cover;" />

            
            <div class="slider-overlay"></div>

            <!-- Texto -->
            <div class="tp-caption sfr sfb tp-resizeme" data-x="left" data-hoffset="90" data-y="center"
              data-voffset="-50" data-speed="1500" data-start="1000" data-easing="easeOutExpo">
              <h1><span class="normal-font">Mantente en </span> contacto</h1>
            </div>

            <div class="tp-caption sfl sfb tp-resizeme" data-x="left" data-hoffset="90" data-y="center"
              data-voffset="40" data-speed="1500" data-start="1500" data-easing="easeOutExpo">

              <h3 class="bg-color">
                Te gusta la naturaleza? Visita nuestro observatorio verde
              </h3>
            </div>

          </li>


        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Carrousel",
  mounted() {
    this.$nextTick(() => {
      const $ = window.jQuery;

      if (!$) {
        console.error("jQuery no está cargado");
        return;
      }

      if (typeof $.fn.revolution === "undefined") {
        console.error("El plugin Revolution Slider no está cargado");
        return;
      }

      const $banner = $(".tp-banner");

      if ($banner.length) {
        $banner.show().revolution({
          delay: 9000,
          startwidth: 1170,
          startheight: 600,
          hideThumbs: 10,
          fullWidth: "on",
          forceFullWidth: "on"
        });
      }
    });
  },
  beforeUnmount() {
    const $ = window.jQuery;
    if ($ && $.fn.revolution) {
      const $banner = $(".tp-banner");
      if ($banner.data("revolution")) {
        try {
          $banner.revkill();
        } catch (e) {
          console.warn("No se pudo destruir el slider:", e);
        }
      }
    }
  }
};
</script>
<style scoped>
.slider-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45); 
  z-index: 1;
}

.tp-caption {
  z-index: 2 !important;
}
</style>