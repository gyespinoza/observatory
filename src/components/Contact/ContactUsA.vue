<script setup>
import ItemMap from "./ItemMap.vue";
import ItemContactInfo from "./ItemContactInfo.vue";
</script>

<template>
  <div class="custom">
  <div class="container section-coordination">
    <div class="row">
      <div class="col-lg-6 d-flex flex-column justify-content-center">
        <div class="section-icon">
          <i class="bi bi-layers-fill" />
        </div>
        <p class="mini-section-title">Responsable del Observatorio</p>
        
        <h1 class="section-title">Coordinaci&oacute;n</h1>
        <h2 class="text-subtitle">Mtra. Sara Oneida Baires Quintanilla</h2>
      </div>
      <div class="col-lg-6" style="text-align: center;">
        
        <img class="content-img" src="/img/contactImages/coordinadora.png" />
      </div>
    </div>
  </div>
</div>
  <div class="custom-container text-center">
    <div class="section-icon">
      <i class="bi bi-layers-fill"></i>
    </div>
    <p class="mini-section-title">Contactanos</p>
    <h1 class="section-title">Formas de Contactarnos</h1>
    <p class="text-content">
      Puedes contactarnos a través de las redes sociales de la Universidad
      Gerardo Barrios.
    </p>
  </div>

  <div class="custom-container">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <ItemContactInfo
            title="UGB Campus San Miguel"
            description="Calle Las Flores y Avenida Las Magnolias,
                Avenida Colonia Escalon, San Miguel"
          >
            <template v-slot:icon>
              <i class="bi bi-geo-alt" />
            </template>
          </ItemContactInfo>

          <ItemContactInfo
            title="UGB Campus Salitre"
            description="Calle Antigua a Quelepa, Caserío El Salitre, San Miguel.Entrada
                contigua a Centro Escolar el Salitre"
          >
            <template v-slot:icon>
              <i class="bi bi-geo-alt" />
            </template>
          </ItemContactInfo>

          <ItemContactInfo
            phoneNumber="2645 – 6585"
            secondPhoneNumber="7743 – 4301"
          >
            <template v-slot:icon>
              <i class="bi bi-telephone" />
            </template>
          </ItemContactInfo>

          <ItemContactInfo
            email="observatorio@ugb.edu.sv"
            secondEmail="consultas@ugb.edu.sv"
          >
            <template v-slot:icon>
              <i class="bi bi-envelope" />
            </template>
          </ItemContactInfo>
        </div>
        <ItemMap />
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-coordination {
  /*background-image: url(/img/contactImages/background.svg);
  background-size: cover;
  background-position: center;*/
  height: auto;
  
}

.custom{
  background-color: var(--f4);
  /*background: linear-gradient(to bottom left,var(--card4-gradient-color1),var(--card4-gradient-color2));*/
 }
.text-subtitle {
  font-size: 28px;
  font-weight: 700;
  color: var(--black);
  letter-spacing: var(--letter-spacing);
  margin-top: 3px;
  color: var(--green-900);
  text-align: center;
}

.content-img {
  max-width: 55%;
  height: auto;
}

.text-content {
  font-size: 20px;
  color: var(--gray);
  letter-spacing: var(--letter-spacing2);
  text-align: center;
}

@media (max-width: 992px) {
  .text-subtitle {
    font-size: 24px;
  }

  .text-content {
    font-size: 19px;
  }
}

@media (max-width: 768px) {
  .text-subtitle {
    font-size: 24px;
  }

  .text-content {
    font-size: 18px;
  }
}

@media (max-width: 576px) {
  .text-subtitle {
    font-size: 19px;
  }

  .text-content {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .text-subtitle {
    font-size: 16px;
  }

  .text-content {
    font-size: 16px;
  }
}
</style>
