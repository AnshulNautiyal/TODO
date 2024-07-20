import { useCallback, useEffect, useState } from "react";
import { TextareaChangeEventDetail } from "@ionic/react";
import type { IonTextareaCustomEvent } from "@ionic/core";
import AddButton from "./components/AddButton";
import CardTask from "./components/CardTask";
import { InputType } from "./type";
import { TASK_STATUS } from "./constant";
import "./styles.css";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

type TaskListType = {
  [key: string]: {
    title: string;
    description: string;
    isEdit: boolean;
    status: keyof typeof TASK_STATUS;
  };
};
export default function TodoApplication() {
  const [taskList, setTaskList] = useState<TaskListType>({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [isNewTaskAdding, setIsNewTaskAdding] = useState(false);

  const toggleAddTaskUI = useCallback(() => {
    setIsNewTaskAdding((prevState) => !prevState);
    setTitle("");
    setDescription("");
    setIsDisable(true);
  }, []);

  const handleContent = useCallback(
    (e: IonTextareaCustomEvent<TextareaChangeEventDetail>, type: InputType) => {
      const {
        target: { value },
      } = e;
      if (type === "title")
        setTitle(value || ""); // saving title for current task
      else setDescription(value || ""); // saving description for current task
    },
    [title, description],
  );

  const SubmitNewTask = useCallback(() => {
    setTaskList((prevState) => {
      return {
        [generateUUID()]: {
          title,
          description,
          isEdit: false,
          status: TASK_STATUS.todo,
        },
        ...prevState,
      };
    });
    setTitle("");
    setDescription("");
    setIsNewTaskAdding(false);
  }, [title, description]);

  const deleteTask = useCallback(
    (id: string) => {
      console.log(id);
      const newState = { ...taskList };
      if (id) delete newState[id];
      setTaskList(newState);
    },
    [taskList],
  );

  const editTask = useCallback(
    (id: string, isEdit: boolean) => {
      setTitle(taskList[id].title || "");
      setDescription(taskList[id].description || "");

      setTaskList((prevState) => {
        return {
          ...prevState,
          [id]: {
            ...prevState[id],
            isEdit,
          },
        };
      });
    },
    [taskList],
  );
  const updateTask = useCallback(
    (id: string, isEdit: boolean) => {
      setTaskList((prevState) => {
        return {
          ...prevState,
          [id]: {
            ...prevState[id],
            isEdit,
            title,
            description,
          },
        };
      });
    },
    [title, description],
  );
  const taskComplete = useCallback(
    (id: string) => {
      setTaskList((prevState) => {
        return {
          ...prevState,
          [id]: {
            ...prevState[id],
            status: TASK_STATUS.completed,
          },
        };
      });
    },
    [title, description],
  );

  useEffect(() => {
    if (title && description) setIsDisable(false);
    else setIsDisable(true);
  }, [title, description]);

  // fetch the persisted data to show in UI after user refresh page
  useEffect(() => {
    const getLocalStorageData = JSON.parse(
      localStorage.getItem("TaskList") as string,
    );
    getLocalStorageData && setTaskList(getLocalStorageData);
  }, []);

  // persist data in localStorage jsut before user refresh page with alert message
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      localStorage.setItem("TaskList", JSON.stringify(taskList));
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [taskList]);

  return (
    <div className="App">
      <h1>Add To Items</h1>
      <AddButton handleClick={toggleAddTaskUI} />
      {isNewTaskAdding ? (
        <CardTask
          title={title}
          description={description}
          isDisable={isDisable}
          isNewTaskAdding={isNewTaskAdding}
          SubmitNewTask={SubmitNewTask}
          toggleAddTaskUI={toggleAddTaskUI}
          handleContent={handleContent}
        />
      ) : null}
      <div className="cardTaskConatiner">
        {Object.entries(taskList).map((items) => {
          return (
            <CardTask
              key={items[0]}
              id={items[0]}
              title={items[1].isEdit ? title : items[1].title}
              description={items[1].isEdit ? description : items[1].description}
              status={items[1].status}
              isEdit={items[1].isEdit}
              editTask={editTask}
              deleteTask={deleteTask}
              SubmitNewTask={SubmitNewTask}
              handleContent={handleContent}
              updateTask={updateTask}
              taskComplete={taskComplete}
            />
          );
        })}
      </div>
    </div>
  );
}
