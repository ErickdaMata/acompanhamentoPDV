<template>
  <div class="d-flex flex-column justify-space-around my-5 pt-5 px-5">
        <v-icon class="align-self-center" size='150' color="gray">mdi-cloud-off-outline</v-icon>
        <h1 class="align-self-center mx-5 mb-5">Offline</h1>
        <div class="align-itens-center mx-5 pt-5">Parece que não há conexão no momento</div>
        <v-btn outlined color="hprimary" class="my-5 mx-5">Tela inicial</v-btn>
    </div>
</template>

<script>
export default {
    name: 'Offline'
}
</script>

<style>

</style>