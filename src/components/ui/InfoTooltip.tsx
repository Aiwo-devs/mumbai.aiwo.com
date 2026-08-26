import { useId, useState } from 'react'
import { InfoIcon } from './Icons'
import './InfoTooltip.css'

export function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <span
      className="info-tooltip"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="info-tooltip__trigger"
        aria-describedby={id}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <InfoIcon className="info-tooltip__icon" />
      </button>
      <span id={id} role="tooltip" className={open ? 'info-tooltip__bubble info-tooltip__bubble--open' : 'info-tooltip__bubble'}>
        {text}
      </span>
    </span>
  )
}
