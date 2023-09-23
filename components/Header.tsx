"use client";
import { fontZenMaruGothic } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { BookOpen, DoorOpen, User2 } from "lucide-react";
import { useSession } from "next-auth/react";

import { signOut } from "@/features/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleClick = () => {
    signOut();
  };

  return (
    <nav className="grid h-12 shadow duration-100">
      <div className="container flex w-full items-center justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  pathname === "/"
                    ? `pointer-events-none`
                    : `pointer-events-auto`,
                )}
              >
                <BookOpen className="text-gray-700" />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-black/40">
              <p className={fontZenMaruGothic.className}>返回首頁</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {session?.user && !session.user.isAnonymous ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleClick}>
                  <DoorOpen />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-black/40">
                <p className={`${fontZenMaruGothic.className}`}>登出</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/signin"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    pathname === "/signin"
                      ? `pointer-events-none`
                      : `pointer-events-auto`,
                  )}
                >
                  <User2 />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-black/40">
                <p className={fontZenMaruGothic.className}>登入畫面</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </nav>
  );
};

export default Header;
