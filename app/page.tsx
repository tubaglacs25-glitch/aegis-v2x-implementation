import { headers } from 'next/headers'
import { AegisDashboard } from '@/components/aegis-dashboard'
import { auth } from '@/lib/auth'

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() })
  return <AegisDashboard operatorName={session?.user.name ?? 'Demo visitor'} isDemo={!session?.user} />
}
