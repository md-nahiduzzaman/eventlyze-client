"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Star,
  Settings,
  LogOut,
  ChevronRight,
  CalendarPlus,
  UserCog,
  DollarSign,
  HomeIcon,
  PersonStanding,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { handleClientLogout } from "@/hooks/handleClientLogout";
import { toast } from "sonner";

export function DashboardSidebarMenu({ data }: any) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
    },
    ...(data?.role === "USER"
      ? [
        {
          label: "Create Event",
          icon: CalendarPlus,
          href: "/dashboard/create-event",
          color: "text-violet-500",
        },
      ]
      : []),
   
    {
      label: `${data?.role === "USER" ? "My" : "All"} Events`,
      icon: Calendar,
      href: "/dashboard/events",
      color: "text-violet-500",
    },
    {
      label: "Participants",
      icon: PersonStanding,
      href: "/dashboard/participants",
      color: "text-teal-500",
    },
    {
      label: "Invitations",
      icon: Users,
      href: "/dashboard/invitations",
      color: "text-pink-500",
    },
    {
      label: "Payments",
      icon: DollarSign,
      href: "/dashboard/payments",
      color: "text-orange-500",
    },
    // {
    //   label: "Messages",
    //   icon: MessageSquare,
    //   href: "/dashboard/messages",
    //   color: "text-orange-500",
    //   badge: 5,
    // },
    {
      label: "Reviews",
      icon: Star,
      href: "/dashboard/reviews",
      color: "text-yellow-500",
    },
    ...(data?.role === "ADMIN"
      ? [
        {
          label: "User Management",
          icon: UserCog,
          href: "/dashboard/manage-users",
          color: "text-primary",
        },
        {
          label: "Subscriber",
          icon: Mail,
          href: "/dashboard/subscriber",
          color: "text-primary",
        },
      ]
      : []),

    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  const handleLogout = () => {
    handleClientLogout()
    toast.success("Logout Successful!")
  }
  return (
    <div className="fixed left-0 top-0 w-full max-w-[300px]">
      <div className="flex flex-col border-r h-screen w-full">
        <div className="flex h-14 items-center border-b px-4">
          <Link
            href="/dashboard"
            className="flex items-start flex-col font-semibold"
          >
            <span className={cn(isCollapsed && "sr-only")}>Dashboard</span>
            <span className="text-[10px] text-muted-foreground">{data?.name} Logged as {data?.role}</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 rotate-180 md:hidden"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === route.href
                    ? "bg-accent text-accent-foreground"
                    : "transparent"
                )}
              >
                <route.icon className={cn("h-5 w-5", route.color)} />
                <span className={cn(isCollapsed && "hidden")}>
                  {route.label}
                </span>
              </Link>
            ))}
          </nav>
        </ScrollArea>

        <div className="mt-auto border-t p-4">
          <div
            className={cn(
              "flex items-center justify-between gap-2",
              isCollapsed && "flex-col"
            )}
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">

                <AvatarFallback>{data?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className={cn(isCollapsed && "hidden")}>
                <p className="text-xs text-muted-foreground">
                  {data?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {data?.email}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button

                variant="outline"
                size="icon"
                className="h-8 w-8 text-muted-foreground"
              >
                <Link href="/">
                  <HomeIcon className="h-4 w-4" />
                </Link>

              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="icon"
                className="h-8 w-8 text-muted-foreground"
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
