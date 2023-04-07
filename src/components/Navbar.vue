<script setup>
import { Navbar, NavbarLogo, NavbarCollapse, NavbarLink } from 'flowbite-vue'
</script>
<template>
  <Navbar class="w-screen fixed block w-full z-10 top-0">
    <template #logo>
      <NavbarLogo
        link="https://www.google.com/"
        alt="Flowbite logo"
        image-url="https://flowbite.com/docs/images/logo.svg"
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
        <NavbarLink>Système solaire</NavbarLink>
        <NavbarLink>Vos favoris</NavbarLink>
        <NavbarLink>Image du jours</NavbarLink>
      </NavbarCollapse>
    </template>
    <template #right-side>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Découvrir
      </button>
    </template>
  </Navbar>
</template>



