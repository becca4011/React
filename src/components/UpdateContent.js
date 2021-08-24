import React, { Component } from 'react';

class UpdateContent extends Component {
    // props → state
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.data.id,
            title: this.props.data.title,
            desc: this.props.data.desc
        }
        this.inputFormHandler = this.inputFormHandler.bind(this);
        // inputFormHandler() 함수에 bind(this) 적용 
        // 이 함수를 사용할 때 bind(this) 붙이지 않아도 됨
    }

    inputFormHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <article>
                <h2>Update</h2>
                <form action="/create_process" method="post"
                    onSubmit={function (e) {
                        // submit 버튼을 눌렀을 때 입력된 값이 전달
                        e.preventDefault();
                        this.props.onSubmit(
                            this.state.id,
                            this.state.title,
                            this.state.desc
                        );
                    }.bind(this)}
                >
                    <input type="hidden" name="id" value={this.state.id}></input>
                    <p>
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            value={this.state.title}
                            onChange={this.inputFormHandler}>
                        </input>
                    </p>
                    <p>
                        <textarea
                            name="desc"
                            placeholder="description"
                            value={this.state.desc}
                            onChange={this.inputFormHandler}>
                        </textarea>
                    </p>
                    <p><input type="submit"></input></p>
                </form>
            </article>
        );
    }
}

export default UpdateContent;