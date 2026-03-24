<script setup>
import { onMounted, nextTick, onBeforeUnmount } from 'vue'

onMounted(async () => {
  await nextTick()

  $('.accord-content').hide()

  $('.accord-btn').off('click.accordion').on('click.accordion', function () {
    const parent = $(this).closest('.accordion')
    const content = parent.find('.accord-content')

    $('.accordion').not(parent).removeClass('active')
    $('.accord-content').not(content).stop(true, true).slideUp()

    parent.toggleClass('active')
    content.stop(true, true).slideToggle()
  })
})

onBeforeUnmount(() => {
  $('.accord-btn').off('click.accordion')
})
</script>
<template>
       <section class="faqs-section">
    	<div class="auto-container">
        	<div class="sec-title text-center small-container padd-bott-30">
            	<h3 class="bigger-text">Contribución a través de proyectos</h3>
                <div class="text"> La Universidad Gerardo Barrios a través de la ejecución de proyectos en el Campus San Miguel y UGB Verde ha realizado diversidad de proyectos en los que se ha contribuido al medio ambiente de la manera siguiente:</div>
            </div>
            
        	<div class="row clearfix">
                
                <div class="col-md-6 col-sm-12 col-xs-12">
                    
                    <!--Accordion Box-->
                    <div class="accordion-box">
                        <!-- Accordion -->
                        <div class="accordion accordion-block">
                            <div class="accord-btn"><h4>Emisión CO2</h4></div>
                            <div class="accord-content">
                                <p>Desde el año 2015, la UGB ha dejado de emitir 40 kg de CO2, equivalente a 1,030 árboles absorbiendo CO2. Esto se compara con un volumen de 20 veces el edificio de Biblioteca UGB campus San Miguel.</p>
                            </div>
                        </div>
                        <!-- Accordion -->
                        <div class="accordion accordion-block">
                            <div class="accord-btn"><h4>Reciclaje</h4></div>
                            <div class="accord-content">
                                <p>Se reciclaron 16,537.10 kg de lata, plástico, papel y hierro, esto es equivalente al peso de microbuses tipo coaster.</p>
                            </div>
                        </div>
                       
                    </div>
                    
                </div>
                
                <div class="col-md-6 col-sm-12 col-xs-12">
                    
                    <!--Accordion Box-->
                    <div class="accordion-box">
                        <!-- Accordion -->
                        <div class="accordion accordion-block">
                            <div class="accord-btn"><h4>Uso de bolsas de plástico</h4></div>
                            <div class="accord-content">
                                <p>Las bolsas de plástico que se dejaron de utilizar equivalen a cubrir 13 veces con ese plástico la Avenida Roosevelt de San Miguel ó Cubrir 2 veces el camino desde San Miguel hasta San Francisco Gotera o Cubrir 2.5 veces el estadio de futbol más grande de Europa con capacidad de 99,354 personas.</p>
                            </div>
                        </div>
                        <!-- Accordion -->
                        <div class="accordion accordion-block">
                            <div class="accord-btn"><h4>Reforestación</h4></div>
                            <div class="accord-content">
                                <p>1,142 metros cuadrados de tierra reforestada, es decir, 4,000 árboles aproximadamente sembrados en Campus Salitre.</p>
                            </div>
                        </div>
                       
                    </div>
                    
                </div>

                
            </div>
    	</div>
    </section>
    
</template>