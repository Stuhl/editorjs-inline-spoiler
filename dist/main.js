var $8zHUo$codexteamicons = require("@codexteam/icons");


function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $882b6d93070905b3$export$2e2bcd8739ae039);

class $882b6d93070905b3$var$EditorJSInlineSpoiler {
    static get isInline() {
        return true;
    }
    static get shortcut() {
        return "Ctrl+Shift+S";
    }
    static get sanitize() {
        return {
            span: true
        };
    }
    static get CSS() {
        return "editorjs-inline-spoiler";
    }
    static{
        this.title = "Hotkey";
    }
    addInlineCSS(span) {
        span.style.backgroundColor = "hsla(0, 0%, 6%, 1)";
    }
    constructor({ api: api }){
        this.api = api;
        this.button = null;
        this.state = false;
    }
    getToolIcon() {
        return 0, $8zHUo$codexteamicons.IconHidden;
    }
    render() {
        this.button = document.createElement("BUTTON");
        this.button.type = "button";
        this.button.innerHTML = this.getToolIcon();
        this.button.classList.add(this.api.styles.inlineToolButton);
        return this.button;
    }
    surround(range) {
        if (!range) return;
        if (this.state) {
            this.unwrap(range);
            return;
        }
        this.wrap(range);
    }
    wrap(range) {
        const selectedText = range.extractContents();
        const spoiler = document.createElement("SPAN");
        spoiler.classList.add($882b6d93070905b3$var$EditorJSInlineSpoiler.CSS);
        this.addInlineCSS(spoiler);
        spoiler.appendChild(selectedText);
        range.insertNode(spoiler);
        this.api.selection.expandToTag(spoiler);
    }
    unwrap(range) {
        const selectedText = range.extractContents();
        const spoiler = this.api.selection.findParentTag("SPAN", $882b6d93070905b3$var$EditorJSInlineSpoiler.CSS);
        if (spoiler) {
            spoiler.remove();
            range.insertNode(selectedText);
        }
    }
    checkState(selection) {
        const tag = this.api.selection.findParentTag("SPAN", $882b6d93070905b3$var$EditorJSInlineSpoiler.CSS);
        this.state = !!tag;
        if (this.button) this.button.classList.toggle(this.api.styles.inlineToolButtonActive, this.state);
        return this.state;
    }
}
var $882b6d93070905b3$export$2e2bcd8739ae039 = $882b6d93070905b3$var$EditorJSInlineSpoiler;


//# sourceMappingURL=main.js.map
