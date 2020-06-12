<template>
    <v-alert type="info" class="px-4 mx-4 d-flex"
        elevation='4'>
      <h3 class="headline">
          Seu suporte operacional pode ajudar!
      </h3>

      <v-divider
        class="my-4 info"
        style="opacity: 0.8"
      ></v-divider>

      <div>
            Para alteração ou cadastramento de senha de acesso,
          entre em contato conosco pelo número (21) 2234-5678.
      </div>
      <div class="d-flex flex-row-reverse">
          <v-btn outlined class=""
            @click.prevent="fecharMensagem">
            Entendi
          </v-btn>
      </div>
    </v-alert>
</template>

<script>
export default {
    name: 'MensagemSenha',
    methods: {
        fecharMensagem(){
          this.$store.commit('comutarExibirMensagemSenha', this.exibirMensagemSenha)
        }
    }
}
</script>

<style>
</style>