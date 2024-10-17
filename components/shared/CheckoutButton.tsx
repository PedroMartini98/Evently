import { IEvents } from "@/lib/mongodb/database/models/event.model";
import { IOrder } from "@/lib/mongodb/database/models/order.model";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Checkout from "./Checkout";
import { auth } from "@clerk/nextjs/server";

const CheckoutButton = ({ event }: { event: IEvents }) => {
  const { userId } = auth();
  const isEventFinished = new Date(event.endDateTime) < new Date();
  if (!userId) {
    throw new Error("User is not authenticated.");
  }
  return (
    <div className="flex items-center gap-3">
      {isEventFinished ? (
        <p className="text-red-400 p-2">Sorry, tickets no longer available</p>
      ) : (
        <>
          <SignedOut>
            <Button asChild size="lg" className="button rounded-full">
              <Link href="/sign-in">Buy Tickets</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
