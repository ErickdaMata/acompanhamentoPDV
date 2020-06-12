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
                lprimary: '#D6EDFF',    //Beau Blue
                hprimary: '#89CFF0',    //Baby Blue
                lsecondary: '#00A7E1',  //Cerulean Crayola
                hsecondary: '#1C77C3',  //Spanish Blue
                error: '#F15D55',       //Fire Opal
                success: '#5ABFA6',     //Keppel
                warning: '#F9C784',     //Gold Crayola
                info: '#00A7E1',        //Cerulean Crayola
                light: '#F6F7EB',       //Ivory
                black: '#212738',       //Raisin Black
                gray: '#D6D6D6'         //Light Gray
            },
        },
    },
})

export default vuetify