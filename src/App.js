import React, { Component } from 'react';
import TOC from "./components/TOC"; // 컴포넌트를 파일로 쪼갠 후, 가져옴
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import './App.css'; // App 컴포넌트의 css

// App 컴포넌트를 root 태그 안에 넣음
class App extends Component {
  // render보다 먼저 실행, 컴포넌트를 초기화시키고 싶을 때 사용
  constructor(props) {
    super(props); // state 값 초기화
    this.max_content_id = 3;
    // state : 앱 내부적으로 사용할 때 state 사용 (props의 값을 바꿀 수 있음)
    this.state = {
      // mode를 변경(welcome, read) → 링크 아래쪽의 글이 변경
      mode: 'create',
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

  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      // contents의 id와 클릭한 글씨의 id가 같은 경우
      if (data.id === this.state.selected_content_id) {
        // 그에 대한 타이틀과 설명을 넘김 (Content에서 띄워줌)
        return data;
      }
      i = i + 1;
    }
  }

  getContent() {
    var _title, _desc, _article = null;
    // WEB 글씨를 클릭한 경우
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }

    // HTML, CSS, JavaScript 글씨를 클릭한 경우
    else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }

    else if (this.state.mode === 'create') {
      // 컴포넌트를 이렇게 변경할 수도 있음
      _article = <CreateContent onSubmit={function (_title, _desc) {
        // 새로운 content 추가
        this.max_content_id = this.max_content_id + 1;
        // var _contents = this.state.contents.concat(
        //   { id: this.max_content_id, title: _title, desc: _desc }
        // )
        var newContents = Array.from(this.state.contents);
        newContents.push({ id: this.max_content_id, title: _title, desc: _desc });

        // push : 원본을 바꿈 
        // concat : 원본을 바꾸지 않고 복제 (기존 배열 + 추가한 값이 들어간 새로운 배열을 만듦 / immutable)
        // Array.from() & push : 원본을 바꾸지 않고 복제 (객체 변경 : Array.assign() / 배열 변경 : Array.from())

        this.setState({
          contents: newContents, // _contents
          mode: 'read',
          selected_content_id: this.max_content_id
        });
      }.bind(this)}></CreateContent>
    }

    else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function (_id, _title, _desc) {
        var newContents = Array.from(this.state.contents);
        var i = 0;
        while (i < newContents.length) {
          if (newContents[i].id === _id) {
            newContents[i] = { id: _id, title: _title, desc: _desc };
            break;
          }
          i = i + 1;
        }

        this.setState({
          contents: newContents,
          mode: 'read'
        });
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  // render() : 어떤 HTML을 그릴 것인지 정함 (props나 state가 변경되면 화면이 다시 그려짐 → render() 호출)
  render() {
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
              // 글씨를 클릭한 경우 모드를 read로 바꾸고, 해당 글씨의 id 전달 (event)
            });
          }.bind(this)}
          data={this.state.contents}>
        </TOC>

        <Control onChangeMode={function (_mode) {
          this.setState({
            mode: _mode
          })
        }.bind(this)}></Control>

        {this.getContent()}
      </div>
    );
  }
}

export default App;
