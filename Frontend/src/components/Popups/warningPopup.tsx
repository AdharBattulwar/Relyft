import { DialogClose } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

export function WarningPopup() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" children={"Resend Code"} />
      </DialogTrigger>
      <DialogContent className="w-full p-6">
        <DialogHeader className="justifly-center flex flex-col">
          <DialogDescription className="text-sm font-normal flex flex-col gap-2">
            <Button className="w-full bg-gray-200 rounded-xl p-3">
              Resend code By SMS
            </Button>

            <DialogClose>
              <Button className="w-full bg-black text-white rounded-xl p-3">
                Cancel
              </Button>
            </DialogClose>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
