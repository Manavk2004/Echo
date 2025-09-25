"use client"
import { use } from "react"
import { Button } from "@workspace/ui/components/button"
import { WidgetView } from "@/modules/ui/views/widget-view"
interface Props{
  searchParams: Promise<{
    organizationId: string
  }>
}

export default function Page({ searchParams }: Props) {

  const { organizationId } = use(searchParams)

  return (
    <WidgetView organizationId={organizationId}/>
  )
}
