"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { LinkData } from "@/types/Linkdata";
import { toast } from "sonner";
export function DialogDelete({
  code,
  setLinks,
}: {
  code: string;
  setLinks: React.Dispatch<React.SetStateAction<LinkData[]>>;
}) {
  async function handleDelete(code: string) {
    try {
      const response = await fetch(`/api/links/${code}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete link");
      toast.success("Link deleted successfully!");
      setLinks((prev) => prev.filter((link: LinkData) => link.code !== code));
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-red-500">
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-600">Delete Link?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the short
            link and all of its associated click statistics.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={() => handleDelete(code)}>
              Yes, Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
