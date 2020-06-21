<template>
  <div>
      <v-container class="mx-auto">
              <v-layout wrap class="justify-center justify-md-start">
                  <v-flex xs12 sm9 md6 lg4 v-for="(empresa, id) in empresas" :key="empresa">
                            <v-card 
                            class="mx-5 my-5 py-5 px-5 flex-column"
                            :to="{path: 'relatorios/' + id}"
                            >
                                <v-list-item-title
                                    class="headline mb-1">
                                    {{ empresa }}
                                </v-list-item-title>
                                <v-list-item-subtitle
                                    class="font-weight-light
                                        text-right">
                                    {{ horarios[id] }}
                                </v-list-item-subtitle>
                        </v-card>
                  </v-flex>
                        
              </v-layout> 
      </v-container>
  </div>
</template>

<script>
export default {
    props: {
        empresas : {
            type: Array,
            default: function() {
                return []
            }
        },
        horarios : {
            type: Array,
            default: function() {
                return []
            }
        }
    },
}
</script>

<style scoped>
.lista {
    list-style: none;
    padding: 0px;
    border: 1px solid #FFF;
    border-radius: 8px;
    overflow: hidden;
}

.lista .item-lista {
    padding: 15px 25px;
    cursor: pointer;
}

.lista .item-lista:hover {
    background-color: #FFF3;
}

.lista .item-lista:nth-child(n + 2) {
    border-top: 1px solid #FFF;
}
</style>