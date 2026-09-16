import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface DeleteConfirmationProps {
  children: ReactNode;
  title: string;
  description: string;
  confirmBtnText: string;
  closeBtnText: string;
  handleConfirm: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  confirmDisabled?: boolean;
}

const DeleteConfirmation = ({
  children,
  title,
  description,
  confirmBtnText,
  closeBtnText,
  handleConfirm,
  open,
  onOpenChange,
  confirmDisabled,
}: DeleteConfirmationProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>{closeBtnText}</Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            disabled={confirmDisabled}
            onClick={handleConfirm}
          >
            {confirmBtnText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { DeleteConfirmation };
