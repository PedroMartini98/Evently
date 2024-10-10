import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import NavMenu from "./NavMenu";
import MobNav from "./MobNav";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between ">
        <Link className="w-36" href={"/"}>
          <Image
            src={"/assets/images/logo.svg"}
            width={128}
            height={36}
            alt="logo"
          ></Image>
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavMenu />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton />
            <MobNav />
          </SignedIn>
          <SignedOut>
            <Button>
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
