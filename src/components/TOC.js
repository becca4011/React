import React, { Component } from 'react'; // 컴포넌트 생성할 때 꼭 넣기

class TOC extends Component {
    shouldComponentUpdate(newProps, newState) {
        // 1. render() 이전에 실행 
        // 2. return값 true : render() 호출, false : render() 호출 X
        // 3. 새롭게 바뀐 값(newProps)과 이전 값(this.props.data)에 접근 가능
        // APP.js에서 push가 아닌 concat이나 Array.from() 해야 이 코드가 정상적으로 작동
        if (this.props.data === newProps.data) {
            return false; // props가 변경되지 않은 경우
        }
        return true; // props가 변경된 경우
    }
    render() {
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while (i < data.length) {
            lists.push(
                <li key={data[i].id}>
                    <a
                        href={"/content/" + data[i].id}
                        data-id={data[i].id}
                        onClick={function (e) {
                            e.preventDefault();
                            this.props.onChangePage(e.target.dataset.id); // 
                            // target은 선택된(클릭한) 태그, dataset은 그에 대한 정보를 가짐
                        }.bind(this)}

                    // 위와 같은 동작을 하는 코드
                    // onClick={function (id, e) {
                    //     e.preventDefault();
                    //     this.props.onChangePage(id);
                    // }.bind(this, data[i].id)}
                    >{data[i].title}</a>
                </li>)
            i = i + 1;
        }
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default TOC; // 외무에서 TOC 클래스를 가져가서 사용 가능