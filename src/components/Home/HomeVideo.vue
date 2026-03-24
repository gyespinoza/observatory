<template>
    <section class="featured-fluid-section">
        <div class="outer clearfix">
      <div class="image-column">
  <iframe
    class="video-frame"
    src="https://www.youtube.com/embed/vTou7sBeAaQ?autoplay=1&mute=1&controls=0&loop=1&playlist=vTou7sBeAaQ&playsinline=1"
    title="Video background"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen
  ></iframe>
</div>

            <article class="column text-column dark-column wow fadeInRight" data-wow-delay="0ms"
                data-wow-duration="1500ms" style="background-image:url(images/resource/fluid-image-2.jpg);">
                <div class="content-box pull-left">
                    <h2>Conoce <span class="theme_color">más</span></h2>
                    <div class="title-text">
                        Un poco de historia sobre el <strong>observatorio verde</strong>
                    </div>
                    <div class="text">
                        A finales del año 2019, la Universidad Gerardo Barrios, a través de la Vicerrectoría de Investigación presentó el Observatorio Verde de Desarrollo Sostenible, que surge después de desarrollar dos simposios sobre economía circular en los que se identifica necesidades en la zona oriental, observando que es necesario un ente que ejecute y analice rigurosamente datos y que brinde un seguimiento a las acciones sustentables que se realizan, con el fin de llevar acabo los Objetivos de Desarrollo Sostenibles desde El Salvador. 
                    </div>
                </div>

                <div class="clearfix"></div>
            </article>
        </div>
    </section>
</template>
<style scoped>
.outer {
  display: flex !important;
  align-items: stretch;
  flex-wrap: wrap;
}

.image-column,
.text-column {
  float: none !important;
  width: 50% !important;
  flex: 0 0 50%;
}

.image-column {
  position: relative;
  overflow: hidden;
  min-height: 520px; /* fallback real para que el iframe sí aparezca */
}

.image-column .video-frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.text-column {
  display: flex;
  align-items: center;
}

.text-column .content-box {
  padding: 35px 30px 35px 60px;
  width: 100%;
}

/* tablet y móvil */
@media (max-width: 991px) {
  .outer {
    flex-direction: column;
  }

  .image-column,
  .text-column {
    width: 100% !important;
    flex: 0 0 100%;
  }

  .image-column {
    min-height: 320px;
  }

  .text-column .content-box {
    padding: 30px 20px;
  }
}

@media (max-width: 576px) {
  .image-column {
    min-height: 220px;
  }
}
</style>