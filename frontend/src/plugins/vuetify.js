import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const vuetify = new Vuetify({
    theme: {
        options: {
            customProperties: true,
            variations: false
        },
        themes: {
            light: {
                lprimeira: '#D6EDFF',   //Beau Blue
                hprimeira: '#89CFF0',   //Baby Blue
                lsegunda: '#00A7E1',    //Cerulean Crayola
                hsegunda: '#1C77C3',    //Spanish Blue
                erro: '#F15D55',        //Fire Opal
                sucesso: '#5ABFA6',     //Keppel
                alerta: '#F9C784',      //Gold Crayola
                info: '#00A7E1',        //Cerulean Crayola
                branco: '#F6F7EB',      //Ivory
                preto: '#212738',       //Raisin Black
                cinza: '#D6D6D6'        //Light Gray
            },
        },
    },
})

export default vuetify