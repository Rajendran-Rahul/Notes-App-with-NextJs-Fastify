"use client";

import { useState } from "react";
import { fetchData, delete_note } from "@/api";
import { ApiResponse } from "@/lib/schema/notes.types";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DeleteConfirmation } from "@/components/notes/DeleteConfirmationPopup";

interface DeleteNoteProps {
  id: number;
  variant: "icon" | "button";
}

const DeleteNote = ({ id, variant }: DeleteNoteProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    setPending(true);
    try {
      const res = await fetchData<ApiResponse>(delete_note, "DELETE", { id });
      toast.success(res.message);
      setOpen(false);
      // detail page: the note is gone, refreshing would 404
      if (variant === "button") router.push("/");
      else router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete note");
    } finally {
      setPending(false);
    }
  };

  return (
    <DeleteConfirmation
      open={open}
      onOpenChange={setOpen}
      title="Are you absolutely sure?"
      description="Deleting the note will remove it from database"
      confirmBtnText={pending ? "Deleting…" : "Confirm"}
      closeBtnText="Cancel"
      confirmDisabled={pending}
      handleConfirm={handleDelete}
    >
      {variant === "icon" ? (
        <button type="button" aria-label="Delete note">
          <Trash className="size-4 cursor-pointer hover:text-red-600" />
        </button>
      ) : (
        <Button variant="destructive" className="rounded">
          Delete
        </Button>
      )}
    </DeleteConfirmation>
  );
};

export { DeleteNote };
