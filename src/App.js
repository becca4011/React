import logo from './logo.svg';
import './App.css'; // App 컴포넌트의 css
import { Component } from 'react';

// class type
class App extends Component {
  render() {
    return (
      // 반드시 이 태그 안쪽에 나머지 태그들이 있어야 함 (지우면 error)
      <div className="App">
        Hello, React
      </div>
    );
  }
}

export default App;
