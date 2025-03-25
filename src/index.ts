import {IconHidden} from "@codexteam/icons"

class EditorJSInlineSpoiler {
  api        : any
  button     : HTMLButtonElement | null
  state      : boolean

  static get isInline() {
    return true
  }

  static get shortcut() {
    return "Ctrl+Shift+S"
  }

  static get sanitize() {
    return {
      span: true
    }
  }

  static get CSS() {
    return "editorjs-inline-spoiler"
  }

  static title: string = "Spoiler"
  
  addInlineCSS(span: HTMLSpanElement) {
    span.style.backgroundColor = "hsla(0, 0%, 6%, 1)"
    span.style.padding         = "2px"
    span.style.cursor          = "pointer"
    span.style.borderRadius    = "4px"
  }

  constructor({ api }) {
    this.api    = api
    this.button = null
    this.state  = false
  }

  getToolIcon(): string {
    return IconHidden
  }

  render() {
    this.button           = document.createElement("BUTTON") as HTMLButtonElement
    this.button.type      = "button"
    this.button.innerHTML = this.getToolIcon()
    this.button.classList.add(this.api.styles.inlineToolButton)

    return this.button
  }

  surround(range: Range) {
    if (!range) {
      return
    }

    if (this.state) {
      this.unwrap(range)
      return
    }

    this.wrap(range)
  }

  wrap(range: Range) {
    const selectedText = range.extractContents()
    const spoiler      = document.createElement("SPAN")

    spoiler.setAttribute("aria-label", "spoiler-text")
    spoiler.setAttribute("data-show", "false")
    spoiler.classList.add(EditorJSInlineSpoiler.CSS)
    this.addInlineCSS(spoiler)

    spoiler.addEventListener("mouseover", () => {
      spoiler.setAttribute("data-show", "true")
      spoiler.style.backgroundColor = "hsla(0, 0%, 6%, 0.2)"
    })

    spoiler.addEventListener("mouseleave", () => {
      spoiler.setAttribute("data-show", "false")
      spoiler.style.backgroundColor = "hsla(0, 0%, 6%, 1)"
    })

    spoiler.appendChild(selectedText)
    range.insertNode(spoiler)

    this.api.selection.expandToTag(spoiler)
  }

  unwrap(range: Range) {
    const spoiler      = this.api.selection.findParentTag("SPAN", EditorJSInlineSpoiler.CSS)
    const selectedText = range.extractContents()

    const isEmpty = spoiler.innerHTML.length === 0

    if (spoiler && isEmpty) {
      spoiler.remove()
      range.insertNode(selectedText)
    }

    if (!isEmpty) {
      range.insertNode(selectedText)
    }
  }

  checkState(selection: Selection) {
    const tag = this.api.selection.findParentTag("SPAN", EditorJSInlineSpoiler.CSS)

    this.state = !!tag

    if (this.button) {
      this.button.classList.toggle(this.api.styles.inlineToolButtonActive, this.state)
    }

    return this.state
  }
}

export default EditorJSInlineSpoiler