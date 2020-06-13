<template>
  <div id="body-login">
      <div id="cabecalho">
          <label class="titulo">{{ titulo }}</label>
          <label class="versao">{{ versao }}</label>
      </div>

        <v-card class="mt-5 mx-5 px-5">
            <v-card-text>
                <v-form>
                    <v-text-field label="Identificação" v-model="usuario.user"
                        prepend-icon="mdi-account-box"></v-text-field>

                    <v-text-field label="Senha" v-model="usuario.senha"
                        prepend-icon="mdi-lock"
                        :type="exibirSenha? 'text' : 'password'"
                        :append-icon="exibirSenha? 'mdi-eye':'mdi-eye-off'"
                        @click:append="exibirSenha = !exibirSenha"></v-text-field>

                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            
            <v-card-actions class="d-flex flex-column justify-space-around">
                <v-btn id="botao-entrar" color="lsecondary white--text" large
                    class="font-weight-black"
                    :disabled="!online" @click.prevent="login">
                    {{ labelLogin }}
                </v-btn>
                
                <div id="link-senha" @click.prevent="esqueceuSenha">
                <a href="">Esqueci ou não possuo uma senha</a>
                </div>
            </v-card-actions>
        </v-card>


      <div id="bloco-central" v-if='1==2'>
          <form id="campos" name="formLogin" action="login" method="post">
              <div class="grupo-campo">
                  <div class="icone">
                      <img src="../assets/img/usuario.png" alt="">
                  </div>
                  <input id="usuario" class="entrada-dados" v-model="usuario.user"
                      name="usuario" type="text" placeholder="Identificação">
              </div>
              <div class="grupo-campo">
              <div class="icone">
                  <img src="../assets/img/pass.png" alt="">
              </div>
                  <input id="senha" class="entrada-dados" v-model="usuario.senha"
                      name="senha" type="password" placeholder="digite sua senha">
              </div>
              <!-- <button id="botao-entrar" class="botao forma" @click.prevent="login"> -->
              <div class="my-2">
                <v-btn id="botao-entrar" color="hsecondary" large
                    :disabled="!online" @click.prevent="login">
                    {{ labelLogin }}
                </v-btn>
              </div>
                    
              <!-- </button> -->
          </form>
          <div id="link-senha" @click.prevent="esqueceuSenha">
              <a href="">Esqueci ou não possuo uma senha</a>
          </div>
      </div>
    <v-overlay v-if="exibirMensagemSenha">
        <MensagemSenha />
    </v-overlay>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import { baseURL, userKey } from '@/global'
import MensagemSenha from './MensagemSenha'

export default { 
  name: 'Login',
  components: {MensagemSenha},
  props: {
    msg: String
  },
  data(){
    return {
        titulo: "Acompanhamento de PDV",
        versao: "Versão 0.1.0",
        labelLogin: "Entrar",
        exibirSenha : false,
        usuario: {},
        online: navigator.onLine
      }
  },
  computed: 
      mapGetters({
          exibirMensagemSenha: 'getExibirMensagemSenha'
      })
  ,
  methods:{
    login(){
        axios.post(baseURL, this.usuario)
            .then(resp => {
                if(resp.status == 201)
                    //Retornar objeto data = {...payload, token}
                    return resp.data
                })
            .then(sessao => {
                this.$store.commit('salvarSessao', sessao)
                localStorage.setItem(userKey, JSON.stringify(sessao))
                this.$router.push({path:'/relatorios'})
                })
            .catch(err => console.log('ERRO: '+ err.response.data))
    },
    esqueceuSenha(){
        this.$store.commit('comutarExibirMensagemSenha', this.exibirMensagemSenha)
    },
    atualizarOnline(){
        this.online = navigator.onLine
    }
  },
  beforeMount(){
      window.addEventListener('online', this.atualizarOnline)
      window.addEventListener('offline', this.atualizarOnline)
  },
  beforeDestroy(){
      window.removeEventListener('online', this.atualizarOnline)
      window.addEventListener('offline', this.atualizarOnline)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*
:root{ 
    --primaria-escura: #89cff0ff;
    --primaria-clara: #d6edffff;
    --botao-clara: #00a7e1ff;
    --botao-escura: hsla(207, 86%, 76%, 1);
    --letra-clara: #f6f7ebff;
    --letra-escura: #212738ff;
    --warning: #f9c784ff;
    --success: #5abfa6ff;
    --error: #f97068ff; 
}*/

*{
    /* border: solid 0.1px #333; */
    box-sizing: border-box;
}

body{
    min-height: -webkit-fill-available;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
}

#body-login{
    padding: 10vh 10vw;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-self: center;
}

#cabecalho{
    display: flex;
    flex-direction: column;
    align-self: center;
}

.titulo{
    margin: 0;
    font-size: 5.5vw;
    font-weight: 700;
    color: #1C77C3;
    align-self: flex-end;
}

.versao{
    margin: 0;
    font-size: 3.0vw;
    font-weight: 100;
    color: maroon;
    font-style: italic;
    align-self: flex-end;
}

#bloco-central{
    margin: 5vh;
    padding: 8vh 10vw;
    flex-direction: column;
    background-color:#D6EDFF;
    border: solid 5px #89CFF0;
    display: flex;
    align-self: center;
}

#botao-entrar{
    width: 100%;
}

.botao{
    font-size: 1.4em;
    text-align: center;
    text-decoration: none;
    display: block;
    padding: 10px 30px;
    width: 100%;
    border-radius: 10px;
    color: #F6F7EB;
    font-weight: 700;
    background-color: #00a7e1ff;
    box-sizing: border-box;
}

.grupo-campo{
    display: flex;
    margin: 14px 0;
    height: 40px;
}

.icone{
    display: block;
    height: 100%;
    width: 40px;
    min-width: 40px;
    border-left: solid 1px rgb(180, 180, 180);
    border-top: solid 1px rgb(180, 180, 180);
    border-bottom: solid 1px rgb(180, 180, 180);
    border-radius: 10px 0px 0px 10px;
    background-color: lightgray;
}

.entrada-dados{
    min-width: 100px;
    padding: 5px;
    height: 100%;
    border: solid 1px rgb(180, 180, 180);
    border-radius: 0px 10px 10px 0px;
    flex-grow: 1;
}

.grupo-campo img{
    padding: 10px;
    max-width: 100%;
}

#link-senha{
    padding: 20px 0;
    font-size: 2.7vw;
    color: #1C77C3;
    align-self: center;
}

/* Ajustes de tela */

@media (min-width: 700px){
    .titulo{
        font-size: 38.5px;
    }
    .versao{
        font-size: 21px;
    }
    #bloco-central{
        padding: 52px 70px;
    }
}

@media (min-width: 600px){
    #link-senha{
        font-size: 16px;
    }
}
</style>
