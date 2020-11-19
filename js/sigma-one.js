import { LitElement, html,css } from 'lit-element';

export class SigmaOne extends LitElement {
    static get properties() {
        return { 
          propertyName: { type: String},
          array: {type: Array},
          contador: {type: Number}
        };
    }
    constructor() {
        super();
        this.propertyName = "soy la propiedad de sigma"
        this.array=[];
        this.contador = 0;
      }

    static get styles() {
        return css`
        :host{
          height:100%;
        }
          h1 { background: red; }
          div{
              display:flex;
              flex-direction:column;
          }
        `;
      }



  render() {
    return html`
      <h1>Soy sigma y esta es mi propiedad = ${this.propertyName}</h1>
      <div style="display:flex; width:30px">
       <p>CV <input id="1234567"type="checkbox" @change="${this.checkBox}" ></p>
       <p>ACTA <input type="checkbox" @change="${this.checkBox}"></p>
       <p>CURP <input type="checkbox" @change="${this.checkBox}"></p>
       <p>INE <input type="checkbox" @change="${this.checkBox}"></p>
      </div>
      <button @click="${this.toggle}">toggle collapse</button>
      <iron-collapse horizontal id="collapse" opened>
        <div>Content goes here...</div>
      </iron-collapse>
    `;
  }

  checkBox(e){
      if(e.target.checked){
          this.contador = this.contador + 1
      }else{
          this.contador = this.contador - 1
      }
      console.log('numero de checks',this.contador)
      let event =  new CustomEvent('checks', {
        detail: {
          counts: this.contador
        },
        bubbles: true,
        composed: true
      })
    this.dispatchEvent(event)
  }

  toggle() {
    //console.log(e.target)
    let iron = this.shadowRoot.querySelector("#collapse");
    console.log(iron)
  }


}

customElements.define('sigma-one', SigmaOne);