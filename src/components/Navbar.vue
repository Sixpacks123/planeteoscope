<script setup>
import { Navbar, NavbarLogo, NavbarCollapse, NavbarLink } from 'flowbite-vue'
</script>
<template>
  <Navbar class="w-screen fixed block w-full z-10  top-0">
    <template #logo>
      <NavbarLogo
        link="https://www.google.com/"
        alt="logo"
        image-url="/src/assets/planetes.png"
      >
        PlanétoScope
      </NavbarLogo>
    </template>
    <template #default="{isShowMenu}">
      <NavbarCollapse :is-show-menu="isShowMenu">
        <NavbarLink is-active>
          Home
        </NavbarLink>
        <NavbarLink link="/astres">
          Liste des astres
        </NavbarLink>
        <NavbarLink link="/system">
          Système solaire
        </NavbarLink>
        <NavbarLink link="/fav">
          Vos favoris
        </NavbarLink>
        <NavbarLink link="/images">
          Image du jours
        </NavbarLink>
      </NavbarCollapse>
    </template>
  </Navbar>
</template>



