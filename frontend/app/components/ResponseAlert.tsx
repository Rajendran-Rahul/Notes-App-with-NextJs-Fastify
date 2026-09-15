import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { ResponseAlertProps } from "../lib/notes.types";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";

const ResponseAlert = ({
  title,
  alertDescription,
  variant,
}: ResponseAlertProps) => {
  return (
    <Alert variant={variant}>
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{alertDescription}</AlertDescription>
      <AlertAction>
        <Button variant="outline">Enable</Button>
      </AlertAction>
    </Alert>
  );
};

export default ResponseAlert;
