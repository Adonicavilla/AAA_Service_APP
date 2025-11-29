import React, { useEffect, useRef } from 'react'

function Modal({ open, onClose, title, description, children, initialFocusRef }){
  const panelRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!open) return
    previouslyFocused.current = document.activeElement

    const panel = panelRef.current
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const getFocusable = () => panel ? Array.from(panel.querySelectorAll(focusableSelector)).filter(el => !el.hasAttribute('disabled')) : []

    const focusable = getFocusable()
    const toFocus = (initialFocusRef && initialFocusRef.current) || focusable[0]
    if (toFocus) {
      try { toFocus.focus() } catch (e) {}
    }

    function onKey(e){
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return }
      if (e.key === 'Tab') {
        const f = getFocusable()
        if (f.length === 0) { e.preventDefault(); return }
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      try { previouslyFocused.current?.focus() } catch (err) {}
    }
  }, [open, onClose, initialFocusRef])

  if (!open) return null

  function handleBackdropMouseDown(e){
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-backdrop" onMouseDown={handleBackdropMouseDown} role="presentation">
      <div className="modal-panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby={title ? 'modal-title' : undefined} aria-describedby={description ? 'modal-desc' : undefined}>
        {title && <h3 id="modal-title">{title}</h3>}
        {description && <p id="modal-desc" className="sr-only">{description}</p>}
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

// Helper subcomponent for modal actions
Modal.Actions = function ModalActions({ children, className='' }){
  return (
    <div className={`modal-actions ${className}`}>{children}</div>
  )
}

export default Modal
