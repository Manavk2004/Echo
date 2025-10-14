import { Provider } from "jotai"
import { AuthGuard } from "../../../components/auth-guard"
import { DashboardSideBar } from "../../../components/dashboard-sidebar"
import { OrganizationGuard } from "../../../components/organization-guard"
import { SidebarProvider } from "@workspace/ui/components/sidebar"
import { cookies } from "next/headers"

export const DashboardLayout = async ({ children }: {children: React.ReactNode }) => { 
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    return(
        
        <AuthGuard>
            <OrganizationGuard>
                <Provider>
                    <SidebarProvider defaultOpen={defaultOpen}>
                        <DashboardSideBar />
                        <main className="flex flex-1 flex-col">
                            {children}
                        </main>
                    </SidebarProvider>
                </Provider>
            </OrganizationGuard>
        </AuthGuard>

    )
}