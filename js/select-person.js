import { LitElement, html,css } from 'lit-element';

export class SelectPerson extends LitElement {
    static get properties() {
        return { 
          change: { type: String}
        };
    }
    constructor() {
        super();
        this.propertyName = "soy la propiedad de sigma"
      }

    static get styles() {
        return css`
          h1 { background: red; }
        `;
      }



  render() {
    return html`
      <select name="cars" id="cars" @change=${this.cambie}>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    `;
  }
  
  cambie(e){
      let valor = e.target.value
      console.log("cambio el select")   
      let event =  new CustomEvent('change-select', {
        detail: {
          valor: valor
        },
        bubbles: true,
        composed: true
      })
    this.dispatchEvent(event)
  }
}

customElements.define('select-person', SelectPerson);