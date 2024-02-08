"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { Moon, Sun, List } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";
import { signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";

function NavigationBar() {
  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 w-full border-b">
      <div className="container flex h-14 justify-between">
        <NavigationMenu>
          <NavigationMenuList className="gap-6 text-sm">
            {/* Drawer */}
            <NavigationMenuItem className="sm:hidden">
              <Drawer direction="left">
                <DrawerTrigger asChild>
                  <Button variant="outline" size="icon">
                    <List />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="h-screen w-64">
                  <DrawerHeader>
                    <DrawerTitle className="text-center">
                      NUS Teaching Assistant
                    </DrawerTitle>
                  </DrawerHeader>
                  <Link
                    href="/tutorials"
                    className="mx-6 flex items-start py-2 text-foreground/60 hover:text-foreground/80"
                  >
                    Tutorials
                  </Link>
                  <Button
                    variant="outline"
                    className="mx-2"
                    onClick={() => signOut()}
                  >
                    Logout
                  </Button>
                </DrawerContent>
              </Drawer>
            </NavigationMenuItem>

            <NavigationMenuItem className="hidden md:block">
              <Link
                href="/tutorials"
                className="text-foreground/60 hover:text-foreground/80"
              >
                Tutorials
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex gap-4 py-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hidden md:block">
              <Avatar>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavigationBar />
      {children}
    </div>
  );
}
