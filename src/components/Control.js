import React, { Component } from 'react';

// 컴포넌트 (정리정돈 도구)
class Control extends Component {
    // render 함수가 반드시 있어야 함
    // 속성(props) : {this.props.[이름]} (아래 App 컴포넌트에 적어놓은 이름과 같게 해야 함)
    render() {
        return (
            <ul>
                <li><a href="/create" onClick={function (e) {
                    e.preventDefault();
                    this.props.onChangeMode('create');
                }.bind(this)}>create</a></li>

                <li><a href="/update" onClick={function (e) {
                    e.preventDefault();
                    this.props.onChangeMode('update');
                }.bind(this)}>update</a></li>

                <li><input onClick={function (e) {
                    e.preventDefault();
                    this.props.onChangeMode('delete');
                }.bind(this)} type="button" value="delete"></input></li>
            </ul>
        );
    }
}

export default Control;