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
      // mode를 변경(welcome, read) → 링크 아래쪽의 글이 변경
      mode: 'welcome',
      subject: { title: 'WEB', sub: 'World Wide Web!' },
      welcome: { title: 'Welcome', desc: 'Hello, React!!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for information' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive' }
      ]
    }
  }

  // render() : 어떤 HTML을 그릴 것인지 정함 (props나 state가 변경되면 화면이 다시 그려짐 → render() 호출)
  render() {
    var _title, _desc = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }
    else if (this.state.mode === 'read') {
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }

    return (
      // 각각의 render() 함수를 호출함 (App → Subject → TOC → Content 순으로 호출)
      <div className="App">
        <Subject title={this.state.subject.title} sub={this.state.subject.sub}></Subject>
        <TOC data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
