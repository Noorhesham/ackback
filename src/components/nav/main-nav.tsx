"use client";

import * as React from "react";
import { Calculator, Calendar, CreditCard, Settings, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { UserNav } from "./user-nav";
import { Button } from "../ui/button";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Sales Invoices",
    href: "/docs/primitives/alert-dialog",
    description: "Manage and create sales invoices.",
  },
  {
    title: "Purchase Orders",
    href: "/docs/primitives/hover-card",
    description: "Create and track purchase orders.",
  },
  {
    title: "Inventory Items",
    href: "/docs/primitives/progress",
    description: "Manage your inventory and stock levels.",
  },
  {
    title: "Reports",
    href: "/docs/primitives/scroll-area",
    description: "View and generate financial reports.",
  },
  {
    title: "Customers",
    href: "/docs/primitives/tabs",
    description: "Manage customer information and history.",
  },
  {
    title: "Vendors",
    href: "/docs/primitives/tooltip",
    description: "Manage vendor relationships and payments.",
  },
];

export function MainNav() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="font-bold text-xl">
            ERP System
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Accounting</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Calculator className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">Financial Management</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Comprehensive financial tools and reports
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/ledger" title="General Ledger">
                      Manage your accounts and transactions
                    </ListItem>
                    <ListItem href="/payables" title="Accounts Payable">
                      Track and manage vendor payments
                    </ListItem>
                    <ListItem href="/receivables" title="Accounts Receivable">
                      Monitor customer payments and invoices
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Inventory</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {components.map((component) => (
                      <ListItem key={component.title} title={component.title} href={component.href}>
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Sales</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/sales/invoices" title="Invoices">
                      Create and manage sales invoices
                    </ListItem>
                    <ListItem href="/sales/orders" title="Orders">
                      Process customer orders
                    </ListItem>
                    <ListItem href="/sales/customers" title="Customers">
                      Manage customer database
                    </ListItem>
                    <ListItem href="/sales/reports" title="Reports">
                      Sales analytics and reports
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
      <SubNav />
    </div>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

const SubNav = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center space-x-4">
        <Button variant="ghost">
          <Calendar className="h-4 w-4 mr-2" />
          Calendar
        </Button>
        <Button variant="ghost">
          <CreditCard className="h-4 w-4 mr-2" />
          Payments
        </Button>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        <Button variant="ghost">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};
