import { IonInput, IonTextarea, IonIcon } from "@ionic/react";
import { createOutline, trashOutline } from "ionicons/icons";
import { BUTTON_TYPE, TASK_STATUS } from "../constant";
import AddButton from "./AddButton";
import { memo } from "react";
import { CardTaskType } from "../type";

function CardTask({
  id,
  title,
  description,
  status,
  isEdit,
  isDisable,
  isNewTaskAdding,
  editTask,
  deleteTask,
  updateTask,
  SubmitNewTask,
  handleContent,
  toggleAddTaskUI,
  taskComplete,
}: CardTaskType) {
  return (
    <div
      className={`cardTask ${status === TASK_STATUS.completed ? "disableComplete" : ""}`}
    >
      <div
        className={`cardTask-firstRow ${!isNewTaskAdding ? "addBorder" : ""}`}
      >
        <div className="cardTask-title">
          {isNewTaskAdding || isEdit ? (
            <IonInput
              label="Title"
              labelPlacement="floating"
              value={title}
              clearInput={true}
              fill="outline"
              onIonInput={(e) => handleContent(e, "title")}
            ></IonInput>
          ) : (
            <h2 className="title-width">{title}</h2>
          )}
        </div>
        {!isNewTaskAdding ? (
          <div className="cardTask-icons">
            {status === TASK_STATUS.todo ? (
              <IonIcon
                hidden={status === TASK_STATUS.completed ? true : false}
                className="editIcon"
                slot="icon-only"
                icon={createOutline}
                size="large"
                color="primary"
                onClick={() => editTask && id && editTask(id, true)}
              ></IonIcon>
            ) : null}
            <IonIcon
              className="deleteIcon"
              slot="icon-only"
              icon={trashOutline}
              size="large"
              color="danger"
              onClick={() => deleteTask && id && deleteTask(id)}
            ></IonIcon>
          </div>
        ) : null}
      </div>

      <div className="cardTask-desciption">
        {isNewTaskAdding || isEdit ? (
          <IonTextarea
            label="Description"
            labelPlacement="floating"
            fill="outline"
            rows={5}
            autoGrow={true}
            value={description}
            onIonInput={(e) => handleContent(e, "")}
          ></IonTextarea>
        ) : (
          <p>{description}</p>
        )}
      </div>
      {isEdit ? (
        <AddButton
          isDisable={isDisable}
          handleClick={() => updateTask && id && updateTask(id, false)}
          type={BUTTON_TYPE.edit}
        />
      ) : null}
      {isNewTaskAdding ? (
        <div className="cardTask-buttons">
          <AddButton
            isDisable={isDisable}
            handleClick={SubmitNewTask}
            type={BUTTON_TYPE.submit}
          />

          <AddButton handleClick={toggleAddTaskUI} type={BUTTON_TYPE.close} />
        </div>
      ) : null}
      {status === TASK_STATUS.todo && !isEdit ? (
        <div className="cardTask-buttons">
          <AddButton
            handleClick={() => taskComplete && id && taskComplete(id)}
            type={BUTTON_TYPE.complete}
          />
        </div>
      ) : null}
    </div>
  );
}

export default memo(CardTask);
