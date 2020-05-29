import React from "react";
import styled from "styled-components";
import { DragLoyouts } from "./DragLayout";


// const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function Main(props) {
  const LeftMenu = styled.div`
    width: 300px;
    height: 100vh;
  `;

  const RightLayout = styled.div`
    width: calc(100vh - 300px);
    height: 100vh;
    float: right;
  `;

  return (
    <>
      <LeftMenu>
        <img
          src="../assets/chart/pieChart.png"
          width={100}
          height={100}
          alt=""
        />
      </LeftMenu>
      <RightLayout>
        {/*<ResponsiveReactGridLayout />*/}
      </RightLayout>
    </>
  );
}
