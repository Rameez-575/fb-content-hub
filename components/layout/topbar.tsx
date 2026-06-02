"use client";

import { usePathname } from "next/navigation";
import { Search, Bell, Command } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useSidebarStore } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/library": "Content Library",
  "/dashboard/calendar": "Content Calendar",
  "/dashboard/queue": "Content Queue",
  "/dashboard/scheduler": "Post Scheduler",
  "/dashboard/ai": "AI Content Assistant",
  "/dashboard/analytics": "Analytics",
  "/dashboard/pages": "Facebook Pages",
  "/dashboard/team": "Team Management",
  "/dashboard/notifications": "Notifications",
  "/dashboard/settings/account": "Account Settings",
  "/dashboard/settings/team": "Team Settings",
  "/dashboard/settings/notifications": "Notification Settings",
  "/dashboard/settings/connections": "Connected Accounts",
  "/dashboard/settings/billing": "Billing & Subscription",
  "/dashboard/settings/security": "Security",
};

export function TopBar() {
  const pathname = usePathname();
  const collapsed = useSidebarStore((s) => s.collapsed);
  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 border-b border-light-border dark:border-dark-border",
        "bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl",
        "flex items-center justify-between px-6",
        "transition-all duration-200",
        collapsed ? "left-16" : "left-60"
      )}
    >
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 h-9 px-3 rounded-input bg-gray-100 dark:bg-white/5 text-sm text-dark-muted hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white dark:bg-dark-border text-[10px] font-mono">
            <Command className="h-3 w-3" />K
          </kbd>
        </button>

        <button className="relative p-2 rounded-input hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
        </button>

        <ThemeToggle />

        <button className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
        </button>
      </div>
    </header>
  );
}
