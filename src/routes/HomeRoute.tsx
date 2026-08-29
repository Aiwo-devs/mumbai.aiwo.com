import { ServiceSiteLayout } from '../service-site/ServiceSiteLayout'
import HomePage from '../service-site/pages/HomePage'

export default function HomeRoute() {
  return (
    <ServiceSiteLayout>
      <HomePage />
    </ServiceSiteLayout>
  )
}
