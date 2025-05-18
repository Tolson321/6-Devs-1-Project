"use client"

import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function UserProfile() {
  const { user } = useUser()
  const router = useRouter()

  // This would typically come from your database
  const subscription = {
    plan: "Free",
    documentsRemaining: 3,
    documentsPerMonth: 5
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>
        <CardDescription>
          Manage your subscription and account settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium">Current Plan</h3>
          <p className="text-2xl font-bold mt-1">{subscription.plan}</p>
          <p className="text-sm text-slate-500 mt-1">
            {subscription.documentsRemaining} documents remaining this month
          </p>
        </div>

        {subscription.plan === "Free" && (
          <Button 
            className="w-full"
            onClick={() => router.push("/pricing")}
          >
            Upgrade to Pro
          </Button>
        )}

        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2">Account Details</h3>
          <p className="text-sm text-slate-600">
            Email: {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 