import { LitElement, html,css } from 'lit-element';
import { SigmaOne} from './sigma-one'
import './select-person'
import './item-homonym'
//import logo from './icono.png'

export class MyElement extends LitElement {
  static get properties() {
    return { 
      sigmaOne:{reflect:true},
      otro:{type:String}
    };
}
  
  static get styles() {
        return css`
          slot { 
            color: blue !important; 
          }
          /*
*  position: relative gives a new position context
*/
.wrapper {
  position: relative;
}

/* 
*  The .navi properties are for styling only
*  These properties can be changed or removed
*/
.navi {
  background-color: red;
  height: 40px;
}


/*
*  Position the #infoi element in the top-right
*  of the .wrapper element
*/
#infoi {
  position: absolute;
  top: 0;
  right: 0;
  background-color:blue;
  
  /*
  *  Styling only, the below can be changed or removed
  *  depending on your use case
  */
  height: 20px;
  padding: 10px 10px;
}
        `;
  }
  constructor() {
    super();
    this.otro = 'inicio'
    this.SigmaOne = new SigmaOne()
    document.addEventListener('checks', e => {
      console.log(e.detail)
      e.detail.counts>=1?console.log('habilita riesgos'):console.log("inhabilitado")
    })
  }

  render() {
    return html`
      <h1>Todos los componentes</h1>
      ${this.SigmaOne}
      <select-person @change-select="${this.changeSelectPerson}">
      </select-person>
      <div>
        ${this.change}
      </div>
      <slot name="container"></slot>
      <h1>
        Item
      </h1>
      <item-homonym data=${'eduardo'}></item-homonym>
      <filter-aacc-bbva advanced-filter>
        <div slot="filter-body">
          Soy fiyutretyuiopiuytrdyuiolter
        </div>
        <!--div slot="buttons">
          <button>ENVIA</button>
        </div-->
        <div slot="advanced-filter">
          <p>ESTOY EN ADVANCED-FILETR</p>
        </div>
      </filter-aacc-bbva>
      <img src='./icono.png'>
      <div class="wrapper">
        <div class="navi"></div>
        <div id="infoi">
          <img src="http://via.placeholder.com/32x20/000000/ffffff?text=?" height="20" width="32"/>
        </div>
      </div>
      <paper-button class="drawer-button"><iron-icon icon="icons:reporting" class="iconBottom"></iron-icon>Relación patrimonial</paper-button>
    `;
  }

  changeSelectPerson(e){
    console.log(e)
  }

}

customElements.define('my-element', MyElement);