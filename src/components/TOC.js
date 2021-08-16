import React, { Component } from 'react'; // 컴포넌트 생성할 때 꼭 넣기

class TOC extends Component {
    render() {
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while (i < data.length) {
            lists.push(<li key={data[i].id}><a href={"/content/" + data[i].id}>{data[i].title}</a></li>)
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