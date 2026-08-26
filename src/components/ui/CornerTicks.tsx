import { CornerTickIcon } from './Icons'
import './CornerTicks.css'

// Drop inside any `position: relative` bordered container to reproduce the
// reference design's recurring corner-tick decoration. `corners` lets a
// caller skip edges that abut another bordered element (e.g. a shared table
// column border) so ticks don't visually double up.
export function CornerTicks({
  corners = ['tl', 'tr', 'bl', 'br'],
}: {
  corners?: Array<'tl' | 'tr' | 'bl' | 'br'>
}) {
  return (
    <>
      {corners.map((corner) => (
        <CornerTickIcon key={corner} className={`corner-tick corner-tick--${corner}`} />
      ))}
    </>
  )
}
