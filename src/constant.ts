const BUTTON_TYPE = {
  submit: "submit",
  close: "close",
  edit: "edit",
  complete: "complete",
} as const;

const TASK_STATUS = {
  todo: "TO_DO",
  inprogress: "IN_PROGRESS",
  completed: "COMPLETED",
};

export { BUTTON_TYPE, TASK_STATUS };
