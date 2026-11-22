import { headers } from 'next/headers'
import { AegisDashboard } from '@/components/aegis-dashboard'
import { FirstVisitIntro } from '@/components/aegis-intro'
import { auth } from '@/lib/auth'

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return <FirstVisitIntro />
  return <AegisDashboard operatorName={session.user.name} />
}
