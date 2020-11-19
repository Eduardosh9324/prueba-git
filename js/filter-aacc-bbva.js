import { html, LitElement, css } from 'lit-element';

//import '.@polymer/iron-icons'
import '@polymer/iron-icons'
import '@polymer/paper-icon-button'
//import '@polymer/paper-icon-button/paper-icon-button.js';

class FilterAaccBbva extends LitElement {
  static get properties() {
    return {
      scrollY: {type: Number},
      top: {type: Number},
      filterSection: {type: String},
      screenSize: {type: Number},
      advancedFilter: {type: Boolean, attribute: "advanced-filter"},
      HideBackButton: {type: Boolean, attribute: "hide-back-button"}
    };
  }

  constructor(){
    super()
    this.screenSize = 0;
    this.advancedFilter = false;
    this.HideBackButton = false;
  }

  static get styles() {
    return css`
    #cont-filter {
      background-color: #555555;
      color: white;
      padding: 5px 16px 5px;
      display: flex;
      /*position: fixed;*/
      width: 100%;
      top: 64px;
      z-index: 1;
      align-items: center;
      flex-wrap: wrap; 
    }
    #cont-back-btn {
      display: flex;
      justify-content: left;
      flex-direction: column;
      width: 5%;
    }
    #cont-inputs {
      display: flex;
      justify-content: flex-end;
      width: 75%;
    }

    #cont-inputs > ::slotted(*){
      display: flex;
    }

    #cont-buttons {
      width: auto;
      display: flex;
      justify-content: space-around;
    }
    #cont-buttons ::slotted(*) {
      --paper-icon-button-disabled-text: var(--bbva-400);
    }

    #cont-advanced-filter{
      width: 100%;
      overflow:hidden;
      transition:height 0.6s ease-out;
      height:auto;
    }

    #cont-advanced-filter ::slotted(*){
      display:flex;
      flex-wrap: wrap;
    }
    `
  }

  render() {
    return html`
    <div id="cont-filter">
      <div id="cont-back-btn">
      ${!this.HideBackButton ? html`
        <paper-icon-button @click=${this.backBtnClicked} icon="icons:return"></paper-icon-button>
      `: ''}
      </div>
      <div id="cont-inputs">
        <slot name="filter-body"></slot>
      </div>
      <div id="cont-buttons">
        ${this.advancedFilter 
        ? html`
            <div class="advanced-filter" @click="${this._openCloseFilter}">
              <!--paper-icon-button icon="icons:filter"></paper-icon-button-->
              <button>filter advanced</button>
            </div>`
        : ''
        }      
        <slot name="buttons"></slot>
      </div>
      ${ this.advancedFilter ? 
        html`
          <div id="cont-advanced-filter">
            <slot name="advanced-filter"></slot>
          </div>
        ` : ''
      }
        
    </div>
    `;
  }

  connectedCallback(){
    super.connectedCallback();
    this.screenSize = window.innerWidth;
    window.addEventListener("resize", () => {
      this.screenSize = window.innerWidth;
      let contentCollapsible = this.shadowRoot.querySelector("#cont-advanced-filter");
      if(contentCollapsible) {
        let isCollapsed = contentCollapsible.getAttribute('data-collapsed') === 'true'
        if(!isCollapsed){
          contentCollapsible.style.height = 'auto';
        }
      }
    });
  }

  firstUpdated(changedProperties){
    let collapseContainer = this.advancedFilter;
    let contentCollapsible = this.shadowRoot.querySelector("#cont-advanced-filter");
    if (contentCollapsible){
        contentCollapsible.style.height = '0px';
        contentCollapsible.setAttribute('data-collapsed', collapseContainer);
    }
  }

  updated(changedProperties){
    let containerInputs = this.shadowRoot.getElementById("cont-inputs");
    let numFilters = this.shadowRoot.querySelector("slot[name='filter-body']");
  }

  _collapseFilter() {
    let contentCollapsible = this.shadowRoot.querySelector("#cont-advanced-filter");
    
    let currentHeight =  contentCollapsible.scrollHeight + 'px';
    (() => {
        contentCollapsible.style.height = currentHeight;
        (() => {
            contentCollapsible.style.height = '0px';
        })()
    })()
    contentCollapsible.setAttribute('data-collapsed', 'true');
}


_expandFilter() {
    let contentCollapsible = this.shadowRoot.querySelector("#cont-advanced-filter");
    let sectionHeight = contentCollapsible.scrollHeight;
    contentCollapsible.style.height = sectionHeight + 'px';
    contentCollapsible.setAttribute('data-collapsed', 'false');
}

_openCloseFilter(){
    let contentCollapsible = this.shadowRoot.querySelector("#cont-advanced-filter");
    let isCollapsed = contentCollapsible.getAttribute('data-collapsed') === 'true'
    if(isCollapsed){
      this._expandFilter()
      this.collapsed = false;
    } else {
      this._collapseFilter()
      this.collapsed = true;
    }
}

  backBtnClicked(){
    const event = new CustomEvent('back-btn-clicked', {
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(event);
  }
}

window.customElements.define("filter-aacc-bbva", FilterAaccBbva);