var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, query } from "lit-element";
import "@material/mwc-button";
export default class ImageCaptureElement extends LitElement {
    static get styles() {
        return css `
      :host {
        border: 1px solid #000;
        display: block;
        padding: 1rem;
      }

      mwc-button {
        width: 100%;
      }

      #grid {
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(2, 1fr);
      }

      #outer-grid {
        display: grid;
        grid-gap: 1rem;
      }
    `;
    }
    render() {
        return html `
      <div id="outer-grid">
        <div id="grid">
          <div id="videoContainer">
            <video id="player" controls autoplay></video>
          </div>
          <canvas id="canvas"></canvas>
        </div>
        <span id="action">
          <mwc-button @click=${this.capture} outlined>Capture</mwc-button>
        </span>
      </div>
    `;
    }
    capture() {
        this.canvas
            .getContext("2d")
            .drawImage(this.player, 0, 0, this.canvas.width, this.canvas.height);
    }
    firstUpdated() {
        const containerInfo = this.videoContainer.getBoundingClientRect();
        const width = `${containerInfo.width}px`;
        this.player.style.width = width;
        this.canvas.style.width = width;
        this.player.addEventListener("loadeddata", () => {
            const playerInfo = this.player.getBoundingClientRect();
            this.canvas.style.height = `${playerInfo.height}px`;
        });
        navigator.mediaDevices
            .getUserMedia({
            video: true,
        })
            .then((stream) => {
            this.player.srcObject = stream;
        });
    }
}
ImageCaptureElement.properties = {};
__decorate([
    query("#canvas")
], ImageCaptureElement.prototype, "canvas", void 0);
__decorate([
    query("#player")
], ImageCaptureElement.prototype, "player", void 0);
__decorate([
    query("#videoContainer")
], ImageCaptureElement.prototype, "videoContainer", void 0);
customElements.define("image-capture-element", ImageCaptureElement);
