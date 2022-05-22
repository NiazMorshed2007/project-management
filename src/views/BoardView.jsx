import React, { useEffect } from "react";

const BoardView = (props) => {
  const { setCurrentView } = props;
  useEffect(() => {
    setCurrentView("board");
  });
  return <div>BoardView</div>;
};

export default BoardView;
