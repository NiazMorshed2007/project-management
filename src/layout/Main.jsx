import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

const Main = (props) => {
  const { children, Notpadding = false } = props;
  return (
    <main className="relative h-screen">
      <div className="mt-2">
        <div
          style={{
            paddingRight: !Notpadding && "13%",
            paddingLeft: !Notpadding && "13%",
            height: "calc(100vh - 120px)",
          }}
          className={`inner ${!Notpadding && "mt-5 pb-10"} `}
        >
          <Scrollbars
            autoHeight
            autoHide
            autoHeightMin={250}
            autoHeightMax={520}
            style={{ width: 100 + "%" }}
          >
            {children}
          </Scrollbars>
        </div>
      </div>
    </main>
  );
};

export default Main;
