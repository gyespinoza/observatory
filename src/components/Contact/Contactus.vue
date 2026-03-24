<script setup>
import ItemMap from "./ItemMap.vue";
</script>
<template>
    <!--Default Section / Other Info-->
    <section class="default-section other-info">
        <div class="auto-container">
            <div class="row clearfix">
                <!--Info Column-->
                <div class="column info-column col-lg-5 col-md-6 col-sm-12 col-xs-12">
                    <article class="inner-box">
                        <h3 class="margin-bott-20">Formas de Contactarnos</h3>
                        <div class="text margin-bott-40">
                            Puedes contactarnos a través de las redes sociales de la Universidad Gerardo Barrios.
                        </div>
                        <ul class="info-box">
                            <li><span class="icon flaticon-location"></span><strong>UGB Campus Central</strong> Calle
                                Las Flores y Avenida Las Magnolias, Avenida Colonia Escalon, San Miguel</li>
                            <li><span class="icon flaticon-location"></span><strong>UGB Campus Salitre</strong> Calle
                                Antigua a Quelepa, Caserío El Salitre, San Miguel.Entrada contigua a Centro Escolar el
                                Salitre</li>
                            <li><span class="icon flaticon-technology-5"></span><strong>Teléfonos</strong> +503 26456585
                                / +503 77434301</li>
                            <li><span class="icon flaticon-interface-1"></span><strong>Correo</strong>
                                observatorio@ugb.edu.sv / consultas@ugb.edu.sv</li>
                        </ul>
                    </article>
                </div>

                <!--Image Column-->
                <div class="column image-column col-lg-7 col-md-6 col-sm-12 col-xs-12">
                    <article class="inner-box">
                        <figure class="image-box"><img src="/img/contact.jpg" alt=""></figure>
                    </article>
                </div>

            </div>
        </div>
    </section>

    <!--Contact Section-->
    <section class="contact-section mapa-full">
        <div class="container-fluid">
            <div class="row clearfix">
                <div class="column map-column col-lg-12 col-md-12 col-sm-12 col-xs-12">                   

                    <article class="inner-box">
                        <div class="map-container">
                            <div class="map-canvas">
                                <ItemMap />
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>

</template>
<style scoped>
.mapa-full,
.mapa-full 
.mapa-full .row,
.mapa-full .map-column,
.mapa-full .inner-box,
.mapa-full .map-container,
.mapa-full .map-canvas {
    width: 100%;
}

.mapa-full .map-canvas {
    height: 500px;
    min-height: 500px;
    overflow: hidden;
}

.mapa-full .map-canvas iframe,
.mapa-full .map-canvas > div {
    width: 100% !important;
    height: 100% !important;
}
</style>