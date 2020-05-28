<template>
  <div id="body-login">
      <div id="cabecalho">
          <label class="titulo">{{ titulo }}</label>
          <label class="versao">{{ versao }}</label>
      </div>
      <div id="bloco-central">
          <form id="campos" name="formLogin" action="login" method="post">
              <div class="grupo-campo">
                  <div class="icone">
                      <img src="assets/img/usuario.png" alt="">
                  </div>
                  <input id="usuario" class="entrada-dados"
                      name="usuario" type="text" placeholder="Identificação">
                  
              </div>
              <div class="grupo-campo">
              <div class="icone">
                  <img src="assets/img/pass.png" alt="">
              </div>
                  <input id="senha" class="entrada-dados" 
                      name="senha" type="password" placeholder="digite sua senha">
              </div>
              <div id="botao-entrar">
                  <button class="botao forma">Entrar</button>
              </div>
          </form>
          <div id="link-senha" @click="esqueceuSenha">
              <a href="">Esqueci ou não possuo uma senha</a>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      titulo: "Acompanhamento de PDV",
      versao: "Versão 0.1.0"
      }
  },
  methods:{
    esqueceuSenha(){
      return alert(`Seu suporte operacional pode ajudar! 

        Para alteração ou cadastramento de senha de acesso, entre em contato conosco pelo número (21) 2234-5678.`)
    }
  },
  name: 'Login',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
    /* border: solid 0.1px #333; */
    box-sizing: border-box;
}

body{
    min-height: -webkit-fill-available;
    background-color: bisque;
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
    color:brown;
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
    background-color: rgb(255, 231, 163);
    border: solid 5px rgb(255, 213, 134);
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
    color: #fff;
    background-color: orange;
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
