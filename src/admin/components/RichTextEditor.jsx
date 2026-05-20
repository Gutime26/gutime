import { useEffect, useRef } from 'react'

export default function RichTextEditor({ value, onChange, label }) {
  const editorRef = useRef(null)
  const initialized = useRef(false)

  // Sync initial/async value into contentEditable (only when it arrives from outside)
  useEffect(() => {
    const el = editorRef.current
    if (!el) return
    if (!initialized.current) {
      el.innerHTML = value || ''
      if (value) initialized.current = true
    }
  }, [value])

  function exec(command, val = null) {
    document.execCommand(command, false, val)
    editorRef.current?.focus()
    sync()
  }

  function sync() {
    onChange(editorRef.current?.innerHTML || '')
  }

  function handleInput() {
    initialized.current = true
    sync()
  }

  function handleLink(e) {
    e.preventDefault()
    const url = window.prompt('URL del link (es. https://…):')
    if (url) exec('createLink', url)
  }

  function handleKeyDown(e) {
    // Tab inserts a non-breaking space instead of changing focus
    if (e.key === 'Tab') {
      e.preventDefault()
      exec('insertText', '    ')
    }
  }

  function btn(label, command, val = null, title = '') {
    return (
      <button
        type="button"
        title={title || label}
        onMouseDown={e => { e.preventDefault(); exec(command, val) }}
      >
        {label}
      </button>
    )
  }

  return (
    <div className="adm-field">
      {label && <label>{label}</label>}
      <div className="rte">
        <div className="rte-toolbar">
          <button type="button" title="Grassetto" onMouseDown={e => { e.preventDefault(); exec('bold') }}><b>B</b></button>
          <button type="button" title="Corsivo" onMouseDown={e => { e.preventDefault(); exec('italic') }}><i>I</i></button>
          <button type="button" title="Sottolineato" onMouseDown={e => { e.preventDefault(); exec('underline') }}><u>U</u></button>
          <span className="rte-sep" />
          <button type="button" title="Titolo H2" onMouseDown={e => { e.preventDefault(); exec('formatBlock', 'h2') }}>H2</button>
          <button type="button" title="Titolo H3" onMouseDown={e => { e.preventDefault(); exec('formatBlock', 'h3') }}>H3</button>
          <button type="button" title="Paragrafo normale" onMouseDown={e => { e.preventDefault(); exec('formatBlock', 'p') }}>¶</button>
          <span className="rte-sep" />
          <button type="button" title="Elenco puntato" onMouseDown={e => { e.preventDefault(); exec('insertUnorderedList') }}>• Lista</button>
          <button type="button" title="Elenco numerato" onMouseDown={e => { e.preventDefault(); exec('insertOrderedList') }}>1. Lista</button>
          <button type="button" title="Citazione" onMouseDown={e => { e.preventDefault(); exec('formatBlock', 'blockquote') }}>❝</button>
          <span className="rte-sep" />
          <button type="button" title="Inserisci link" onMouseDown={handleLink}>🔗 Link</button>
          <button type="button" title="Rimuovi link" onMouseDown={e => { e.preventDefault(); exec('unlink') }}>🔗✕</button>
          <span className="rte-sep" />
          <button type="button" title="Rimuovi formattazione" onMouseDown={e => { e.preventDefault(); exec('removeFormat') }}>✕ Fmt</button>
        </div>
        <div
          ref={editorRef}
          className="rte-body"
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}
