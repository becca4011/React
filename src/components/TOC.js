import React, { Component } from 'react'; // 컴포넌트 생성할 때 꼭 넣기

class TOC extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><a href="1.html">HTML</a></li>
                    <li><a href="2.html">CSS</a></li>
                    <li><a href="3.html">JavaScript</a></li>
                </ul>
            </nav>
        );
    }
}

export default TOC; // 외무에서 TOC 클래스를 가져가서 사용 가능