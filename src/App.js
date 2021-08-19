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
      mode: 'read',
      selected_content_id: 2,
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
    // WEB 글씨를 클릭한 경우
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }

    // HTML, CSS, JavaScript 글씨를 클릭한 경우
    else if (this.state.mode === 'read') {
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        // contents의 id와 클릭한 글씨의 id가 같은 경우
        if (data.id === this.state.selected_content_id) {
          // 그에 대한 타이틀과 설명을 넘김 (Content에서 띄워줌)
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
    }

    return (
      // 각각의 render() 함수를 호출함 (App → Subject → TOC → Content 순으로 호출)
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          // WEB 글씨를 눌렀을 때 이 함수가 실행되도록 함
          onChangePage={function () {
            this.setState({ mode: 'welcome' }); // bind(this)를 쓰고, setState를 사용해야 변경됨
            // bind(this) : this 가리키는 것이 이 컴포넌트가 되도록 함 (강제로 함수 안에 this를 넣음)
            // funvtion.bind(인자) : 함수의 블록 안의 this는 인자가 됨 (새로운 함수가 복제되어 만들어짐)
            // render() 안에서 this : render()가 속해있는 컴포넌트를 뜻함 
            // 함수 안에서 this : 아무 값도 없음

            // this.state.mode = 'welcome'; 코드가 안되는 이유
            // 1. this는 아무것도 가리키지 않아 error → bind(this)로 해결
            // 2. react는 state의 값이 변경되었다는 것을 모름 → setState()로 변경된 값을 react가 알도록 함
          }.bind(this)}>
        </Subject>

        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
              // 글씨를 클릭한 경우 모드를 read로 바꾸고, 해당 글씨의 id 전달
            });
          }.bind(this)}
          data={this.state.contents}
        >
        </TOC>

        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
