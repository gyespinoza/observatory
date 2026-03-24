<script setup>
import { RouterLink } from "vue-router";

const toggleMenu = () => {
  const nav = document.querySelector(".navbar-collapse");
  if (nav) {
    nav.classList.toggle("show");
  }
};
</script>

<template>
  <header class="main-header">
    <div class="top-bar">
      <div class="top-container">
        <!--Info Outer-->
        <div class="info-outer">
          <!--Info Box-->
          <ul class="info-box clearfix">
            <li><span class="icon flaticon-interface"></span><a href="#">observatorio@ugb.edu.sv</a></li>
            <li><span class="icon flaticon-technology-5"></span><a href="#">+503 2645 – 6585</a></li>
            <li class="social-links-one">
              <a href="#" class="facebook img-circle"><span class="fa fa-facebook-f"></span></a>
              <a href="#" class="twitter img-circle"><span class="fa fa-twitter"></span></a>
              <a href="#" class="google-plus img-circle"><span class="fa fa-google-plus"></span></a>
              <a href="#" class="linkedin img-circle"><span class="fa fa-linkedin"></span></a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="header-upper">
      <div class="auto-container clearfix">
        <!-- Logo -->
        <div class="logo">
          <RouterLink to="/">
            <img src="/img/logoVerde.png" alt="logo verde" style="height: 60px" />
            <img src="/img/ugblogo.png" alt="logo verde" style="height: 80px" />
          </RouterLink>
        </div>

        <!-- Nav Outer -->
        <div class="nav-outer clearfix">


          <a class="theme-btn btn-donate" href="https://observatorioverde.ugb.edu.sv/denuncias/" target="_blank">Denuncias</a>


          <!-- Main Menu -->
          <nav class="main-menu">
            <div class="navbar-header">
              <!-- Toggle Button -->
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"
                @click="toggleMenu">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>

            <div class="navbar-collapse collapse clearfix">
              <ul class="navigation">
                <li>
                  <RouterLink to="/">Inicio</RouterLink>
                </li>
                <li>
                  <RouterLink to="/sobre-nosotros">Sobre Nosotros</RouterLink>
                </li>
                <li>
                  <RouterLink to="/ugb-verde">UGB Verde</RouterLink>
                </li>
                <li class="dropdown"><a href="#">Estadísticas</a>
                  <ul>
                    <li><RouterLink to="/estadisticas">Reciclaje</RouterLink></li>
                    <li><RouterLink to="/monitoreo">Monitoreo ambiental</RouterLink></li>
                  </ul>

                </li>                
                <li>
                  <RouterLink to="/iniciativas">Iniciativas</RouterLink>
                </li>
                <li>
                  <RouterLink to="/contacto">Contacto</RouterLink>
                </li>
              </ul>
            </div>
          </nav>
          <!-- Main Menu End -->
        </div>
      </div>
    </div>
  </header>
</template>