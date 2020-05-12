import { LitElement } from "lit-element";
import "@material/mwc-button";
export default class ImageCaptureElement extends LitElement {
    canvas: any;
    player: any;
    videoContainer: any;
    static properties: {};
    static get styles(): import("lit-element").CSSResult;
    render(): import("lit-element").TemplateResult;
    capture(): void;
    firstUpdated(): void;
}
