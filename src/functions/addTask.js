import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { generateId } from "./idGenerator";

const addTask = (name, project, org, tabId, dispatch) => {
  if (name !== "") {
    const newTask = {
      task_name: name,
      task_id: generateId(name) + (Math.random() * 1000).toString(),
      task_tabId: tabId,
      task_status: "todo",
      task_priority: "none",
      task_progress: 0,
    };
    project.tasks.push({
      ...newTask,
    });
    updateDoc(doc(db, "organizations", project.org_serverId), {
      projects: org.projects,
    });
  }
  dispatch("");
  // hgfsjsajf
};

export default addTask;
