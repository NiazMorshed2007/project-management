import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const updateOrganizations = (org, project) => {
  if (project && org) {
    updateDoc(doc(db, "organizations", project.org_serverId), {
      projects: org.projects,
    });
  }
};
export default updateOrganizations();
