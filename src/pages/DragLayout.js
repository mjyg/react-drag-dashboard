import React, { PureComponent } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import ReactEcharts from "echarts-for-react";
import { getBarChart, getLineChart, getPieChart } from "./chart";
import "./main.css";
import pieImage from "../assets/pieChart.png";
import barImage from "../assets/barChart.png";
import lineImage from "../assets/lineChart.png";
import tableImage from "../assets/table.png";
import styled from "styled-components";
import Draggable from "react-draggable";
import SingleTable from "./SingleTable";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class DragLayout extends PureComponent {
  static defaultProps = {
    cols: { lg: 24, md: 24, sm: 24, xs: 24, xxs: 24 },
    rowHeight: 100,
  };

  constructor(props) {
    super(props);

    this.state = {
      widgets: [],
    };
  }

  generateDOM = () => {
    return _.map(this.state.widgets, (l, i) => {
      let option;
      if (l.type === "bar") {
        option = getBarChart();
      } else if (l.type === "line") {
        option = getLineChart();
      } else if (l.type === "pie") {
        option = getPieChart();
      }
      let component = (
        <ReactEcharts
          option={option}
          notMerge={true}
          lazyUpdate={true}
          style={{ width: "100%", height: "100%" }}
        />
      );
      if (l.type === "table") {
        component = <SingleTable />;
      }
      return (
        <div key={l.i} data-grid={l}>
          <span className="remove" onClick={this.onRemoveItem.bind(this, i)}>
            x
          </span>
          {component}
        </div>
      );
    });
  };

  addChart(type, x, y) {
    console.log('original x,y', x, y)
    const width = document.getElementById("content").clientWidth;
    x = Math.floor((24 * (x - 227)) / (width - 40));
    y = Math.floor(y / this.props.rowHeight);
    console.log('calculated x,y', x ,y)
    const addItem = {
      x: x >= 0 && y >= 0 ? x : 0,
      y: y >= 0 && x >= 0 ? y : 0,
      w: 9,
      h: 2,
      i: new Date().getTime().toString(),
    };
    console.log('transfer x,y', addItem.x ,addItem.y)
    this.setState({
      widgets: this.state.widgets.concat({
        ...addItem,
        type,
      }),
    });
  }

  onRemoveItem(i) {
    this.setState({
      widgets: this.state.widgets.filter((item, index) => index !== i),
    });
  }

  handleStop = (e, type) => {
    this.addChart(type, e.x, e.y);
  };

  handleStart = (e) => {
    e.preventDefault();
    const copyElement = document.createElement("img");
    copyElement.setAttribute("src", e.target.getAttribute("src"));
    const style = `position: absolute;top: ${e.target.offsetTop}px;left: ${e.target.offsetLeft}px;z-index:2`;
    copyElement.setAttribute("style", style);
    e.target.parentNode.appendChild(copyElement);
  };

  render() {
    const LeftMenu = styled.div`
      width: 170px;
      border-right: 1px solid;
      height: 100vh;
      display: flex;
      flex-direction: column;
      padding-left: 24px;
      position: absolute;
      img {
        border: 1px solid;
        margin-bottom: 8px;
        width: 130px;
        height: 100px;
        z-index: 3;
      }
      img:hover {
        cursor: grab;
      }
    `;

    return (
      <>
        <LeftMenu>
          <Draggable
            onStop={(e) => this.handleStop(e, "pie")}
            onStart={this.handleStart}
            bounds={{ left: 80 }}
          >
            <img src={pieImage} alt="无法显示" />
          </Draggable>
          <Draggable
            onStop={(e) => this.handleStop(e, "line")}
            onStart={this.handleStart}
            bounds={{ left: 80 }}
          >
            <img src={lineImage} alt="无法显示" />
          </Draggable>
          <Draggable
            onStop={(e) => this.handleStop(e, "bar")}
            onStart={this.handleStart}
            bounds={{ left: 80 }}
          >
            <img src={barImage} alt="无法显示" />
          </Draggable>
          <Draggable
            onStop={(e) => this.handleStop(e, "table")}
            onStart={this.handleStart}
            bounds={{ left: 80 }}
          >
            <img src={tableImage} alt="无法显示" />
          </Draggable>
        </LeftMenu>
        <div
          style={{
            padding: 20,
            height: "100vh",
            marginLeft: 169,
            overflow: "auto",
          }}
          id="content"
        >
          <ResponsiveReactGridLayout {...this.props}>
            {this.generateDOM()}
          </ResponsiveReactGridLayout>
        </div>
      </>
    );
  }
}
