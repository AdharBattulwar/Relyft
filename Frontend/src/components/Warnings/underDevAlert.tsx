import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import React from "react";

type Props = object;

const UnderDevAlert: React.FC<Props> = () => {
  return (
    <div className="fixed z-50 m-4">
      <AlertDialog defaultOpen={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              This Website is Under Development
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please note that this website is currently under development.
              Responses may take longer than usual. Thank you for your patience.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-myGreen p-2 rounded-xl hover:bg-mygreen-500">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UnderDevAlert;
