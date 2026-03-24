<script setup>
import ItemCardDirectory from "./ItemCardDirectory.vue";
</script>
<template>
  <section class="section-directorio">
    <div class="section-directorio-sombra">
      <div class="container">
        <div class="content">
          <h1 class="titulo">Instituciones Ligadas al Proyecto</h1>
          <div class="sub-titulo">
            <h2>Trabajando juntos, hacemos más...</h2>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section-card">
    <div class="custom-container">
      <div class="container">
        <div class="section-icon">
          <i class="bi bi-layers-fill" />
        </div>
        <p class="mini-section-title">Directorio</p>
        <h1 class="section-title">Nuestras Alianzas</h1>
        <div class="row">
          <ItemCardDirectory
            title="Mesa de Cambio Climático de El Salvador"
            email="mesacambioclimatico@gmail.com"
            phoneNumer="7744-4576"
            address="San Salvador, El Salvador."
          />

          <ItemCardDirectory
            title="Ministerio de Medio Ambiente"
            webSite="https://www.ambiente.gob.sv/"
            phoneNumer="2665-8383"
            address="Colonia Ciudad Jardín, calle Los Naranjos, #22, San Miguel."
          />

          <ItemCardDirectory
            title="Fundación Segundo Montes"
            email="Fsegundomontes@gmail.com"
            phoneNumer="2680-5574"
            address="Carretera a Perkin Km 192 1/2, caserío San Luis, Meanguera Morazán"
          />

          <ItemCardDirectory
            title="Programa de las Naciones Unidas para el Desarrollo"
            email="https://www.undp.org/es"
            phoneNumer="2263-0066"
            address="Edificio Naciones Unidas, Blvd. Orden de Malta Sur, No. 2-B, Elena, Antiguo Cuscatlan, La Libertad."
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-directorio {
  background: url("/img/directoryImages/portadaDirectorio.jpg") center;
  width: 100%;
  min-height: 80vh;
  background-size: cover;
  position: relative;
  z-index: 3;
}
.section-directorio-sombra {
  position: absolute;
  background: rgba(27, 47, 69, 0.8);
  inset: 0;
}
.content {
  padding: 20rem 5rem;
}

.titulo {
  color: var(--green-900);
  font-size: var(--h1);
  font-weight: 700;
}
.sub-titulo {
  color: var(--white);
  padding-left: 2rem;
  border-left: 0.2rem solid var(--green-900);
  margin: 40px 0;
  font-size: var(--h2);
  margin-top: 0.3rem;
}
.sub-titulo h2 {
  margin-top: 3.2rem;
  margin-bottom: 1.6rem;
}

@media (max-width: 768px) {
  .titulo,
  .sub-titulo {
    font-size: 3rem;
    text-align: center;
  }
}
</style>
