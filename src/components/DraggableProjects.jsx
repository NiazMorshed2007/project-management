import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import Ex from "./ex";

const DraggableProjects = (props) => {
  const { org } = props;
  const globalTask = [
    {
      task_priority: "none",
      task_id: "dsfg_dsfgsdf_gsd",
      task_name: "dsfg dsfgsdf gsd",
      task_status: "todo",
    },
    {
      task_id: "dsfg_dsfgdsfg_dsfg",
      task_status: "todo",
      task_priority: "none",
      task_name: "dsfg dsfgdsfg dsfg",
    },
    {
      task_id: "dsf_gsd_fgsd_fg",
      task_priority: "none",
      task_status: "todo",
      task_name: "dsf gsd fgsd fg",
    },
    {
      task_id: "fdgsdfg",
      task_name: "fdgsdfg",
      task_priority: "none",
      task_status: "todo",
    },
  ];
  return (
    <div>
      <DragDropContext
        onDragEnd={(...param) => {
          const srcI = param[0].source.index;
          const desI = param[0].destination?.index;
        }}
      >
        <Droppable droppableId={"droppable-1"}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              className="tasks-wrapper pb-3 d-flex flex-column"
              {...provided.droppableProps}
            >
              {globalTask.map((task, i) => (
                <Draggable
                  key={task.task_id + "-" + i}
                  draggableId={"draggable-" + task.task_id}
                  index={i}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Ex>{task.task_name}</Ex>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* <DragDropContext
        onDragEnd={(...param) => {
          const srcI = param[0].source.index;
          const desI = param[0].destination?.index;
        }}
      >
        <Droppable droppableId={"droppable"}>
          {(provided) => (
            <ul
              ref={provided.innerRef}
              className="tasks-wrapper pb-3 d-flex flex-column"
              {...provided.droppableProps}
            >
              {org.projects.map((project, i) => (
                <Draggable
                  key={project.project_id}
                  draggableId={project.project_id}
                  index={i}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="h-10 bg-white w-72 border">
                        {project.project_name}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext> */}
    </div>
  );
};

export default DraggableProjects;
