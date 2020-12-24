import { LitElement, html, css } from 'lit-element';

class SimpleCarousel extends LitElement {
  static get styles() {
    return css`
      snap-carousel {
        display: block;
      }

      .snaplist_drag {
        scroll-snap-type: none !important;
      }

      .snaplist_drag * {
        user-select: none !important;
        pointer-events: none;
      }
    `;
  }

  render() {
    return html` <div tabindex="0" aria-label="carousel" /> `;
  }
}

customElements.define('simplecarousel', SimpleCarousel);
