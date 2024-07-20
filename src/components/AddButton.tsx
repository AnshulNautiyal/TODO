import { IonButton, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { BUTTON_TYPE } from "../constant";
import { InputType } from "../type";

interface AddButtonType {
  handleClick?: () => void;
  type?: keyof typeof BUTTON_TYPE;
  isDisable?: boolean;
}

export default function AddButton({
  handleClick,
  type,
  isDisable,
}: AddButtonType): JSX.Element {
  if (type === BUTTON_TYPE.submit) {
    return (
      <IonButton
        onClick={handleClick}
        disabled={isDisable}
        color="success"
        expand="full"
      >
        Submit Task
      </IonButton>
    );
  } else if (type === BUTTON_TYPE.close) {
    return (
      <IonButton
        onClick={handleClick}
        color="danger"
        fill="solid"
        expand="full"
      >
        Close
      </IonButton>
    );
  } else if (type === BUTTON_TYPE.edit) {
    return (
      <IonButton
        onClick={handleClick}
        color="secondary"
        fill="solid"
        expand="full"
      >
        Update Task
      </IonButton>
    );
  } else if (type === BUTTON_TYPE.complete) {
    return (
      <IonButton
        onClick={handleClick}
        color="secondary"
        fill="solid"
        expand="full"
      >
        Complete
      </IonButton>
    );
  }
  return (
    <IonButton onClick={handleClick} className="addHeight" size="large">
      <IonIcon slot="icon-only" icon={addOutline} size="large"></IonIcon>
    </IonButton>
  );
}
