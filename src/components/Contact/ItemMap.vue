<template>
  <div class="col-lg-6 justify-content-center align-items-center">
    <div class="map-responsive">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3879.758631478354!2d-88.19462332573701!3d13.488965303326193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f7b2a58d2095515%3A0xfb0914d1181e605f!2sUniversidad%20Gerardo%20Barrios!5e0!3m2!1ses-419!2ssv!4v1688014473014!5m2!1ses-419!2ssv"
        width="750"
        height="750"
        style="border: 0"
        allowfullscreen="true"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>

<style>
.map-responsive {
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 100%;
}

.map-responsive iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
