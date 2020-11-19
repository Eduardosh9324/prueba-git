import { LitElement, html,css } from 'lit-element';

export class ItemHomonym extends LitElement {
    static get properties() {
        return { 
          data: { type:String}
        };
    }
    constructor() {
        super();
        this.data = 'miñe'
      }

    static get styles() {
        return css`
         
        `;
      }



  render() {
    return html`
      <div>
          Este es mi nombre ${this.data}
      </div>
    `;
  }

}

customElements.define('item-homonym', ItemHomonym);