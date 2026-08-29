import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Each route is its own chunk, including the specific service's data (long
// FAQ/pricing/testimonial content) — visiting one page no longer downloads
// the other five. Suspense fallback is empty rather than a spinner: chunks
// are small and route changes are already gated by a real navigation click,
// so a flash of a loading state would read as a regression, not a feature.
const HomeRoute = lazy(() => import('./routes/HomeRoute'))
const IvTherapyRoute = lazy(() => import('./routes/IvTherapyRoute'))
const PostureScreeningRoute = lazy(() => import('./routes/PostureScreeningRoute'))
const RmrRoute = lazy(() => import('./routes/RmrRoute'))
const EmsSculptingRoute = lazy(() => import('./routes/EmsSculptingRoute'))
const Vo2MaxRoute = lazy(() => import('./routes/Vo2MaxRoute'))
const SleepcationRoute = lazy(() => import('./routes/SleepcationRoute'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/services/iv-therapy" element={<IvTherapyRoute />} />
          <Route path="/services/posture-screening" element={<PostureScreeningRoute />} />
          <Route path="/services/rmr" element={<RmrRoute />} />
          <Route path="/services/ems-sculpting" element={<EmsSculptingRoute />} />
          <Route path="/services/vo2-max" element={<Vo2MaxRoute />} />
          <Route path="/services/sleepcation" element={<SleepcationRoute />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
