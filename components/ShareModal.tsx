"use client";
import { useSelf } from "@liveblocks/react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import UserTypeSelector from "./UserTypeSelector";
import { setUser } from "@sentry/nextjs";
import Collaborator from "./Collaborator";
import { updateDocumentAccess } from "@/lib/actions/room.actions";

const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  const user = useSelf();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("viewer");

  const shareDocumentHandler = async () => {
    setLoading(true);
    await updateDocumentAccess({
      roomId,
      email,
      userType: userType,
      updatedBy: user?.info as User,
    });
    setLoading(false);
  };

  if (currentUserType === "editor")
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button
            className="flex gradient-blue h-9 gap-1 px-4"
            disabled={currentUserType !== "editor"}
          >
            <Image
              src="/assets/icons/share.svg"
              alt="share"
              width={20}
              height={20}
              className="min-w-4 md:size-5"
            />
            <p className="mr-1 hidden sm:block">Share</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="shad-dialog">
          <DialogHeader>
            <DialogTitle>Manage who can view this project</DialogTitle>
            <DialogDescription>
              Select witch users can view and edit this document
            </DialogDescription>
          </DialogHeader>
          <Label htmlFor="email" className="mt-6 text-blue-100">
            Email address
          </Label>
          <div className="flex items-center gap-3">
            <div className="flex flex-1 rounder-md bg-dark-400">
              <Input
                id="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="share-input"
              />
              <UserTypeSelector userType={userType} setUserType={setUserType} />
            </div>
            <Button
              type="submit"
              onClick={shareDocumentHandler}
              className="gradient-blue flex h-full gap-1 px-5"
              disabled={loading}
            >
              {loading ? "Sending..." : "Invite"}
            </Button>
          </div>
          <div className="my-2 space-y-2">
            <ul className="flex flex-col gap-4">
              {collaborators.map((collab, index) => (
                <Collaborator
                  key={collab.id}
                  roomId={roomId}
                  creatorId={creatorId}
                  email={collab.email}
                  collaborator={collab}
                  user={user?.info as User}
                />
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    );

  return <></>;
};

export default ShareModal;
