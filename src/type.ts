import { TextareaChangeEventDetail } from "@ionic/react";
import type { IonTextareaCustomEvent } from "@ionic/core";
import { TASK_STATUS } from "./constant";

type InputType = "title" | "";

interface CardTaskType {
  id?: string;
  title: string;
  description: string;
  status?: keyof typeof TASK_STATUS;
  isEdit?: boolean;
  isDisable?: boolean;
  isNewTaskAdding?: boolean;
  editTask?: (id: string, isEdit: boolean) => void;
  deleteTask?: (id: string) => void;
  updateTask?: (id: string, isEdit: boolean) => void;
  SubmitNewTask: () => void;
  handleContent: (
    e: IonTextareaCustomEvent<TextareaChangeEventDetail>,
    type: InputType,
  ) => void;
  toggleAddTaskUI?: () => void;
  taskComplete?: (id: string) => void;
}

export { CardTaskType, InputType };
