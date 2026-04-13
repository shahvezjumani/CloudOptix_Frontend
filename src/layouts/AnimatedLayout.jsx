import { AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'

export default function AnimatedLayout() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Outlet key={location.pathname} />
    </AnimatePresence>
  )
}