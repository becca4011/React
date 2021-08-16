import React, { Component } from 'react';
import TOC from "./components/TOC"; // 컴포넌트를 파일로 쪼갠 후, 가져옴
import Content from "./components/Content";
import Subject from "./components/Subject";
import './App.css'; // App 컴포넌트의 css

// App 컴포넌트를 root 태그 안에 넣음
class App extends Component {
  // render보다 먼저 실행, 컴포넌트를 초기화시키고 싶을 때 사용
  constructor(props) {
    super(props); // state 값 초기화
    // state : 앱 내부적으로 사용할 때 state 사용 (props의 값을 바꿀 수 있음)
    this.state = {
      subject: { title: "WEB", sub: "World Wide Web!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" }
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <Subject title={this.state.subject.title} sub={this.state.subject.sub}></Subject>
        <TOC data={this.state.contents}></TOC>
        <Content title="HTML" desc="HTML is HyperText Markup Language."></Content>
      </div>
    );
  }
}

export default App;
