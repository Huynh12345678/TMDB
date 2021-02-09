import { Component } from 'react';

class BtnScrollToTop extends Component {
    componentDidMount() {
        window.addEventListener("scroll", this.handeleScroll); // remove brackets ()
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handeleScroll);
    }
    handeleScroll() {
        if (
            window.pageYOffset > 400 //get the current scroll position of the page.
        ) {
            var elem = document.getElementById("myBtn");
            elem.style.transform = 'translateY(0)';
            elem.style.opacity = '1';

        } else {
            elem = document.getElementById("myBtn");
            elem.style.transform = "translateY(100px)";
            elem.style.opacity = '0';
        }
    }
    topFunction() {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    button = {
        boxShadow: "0 0 0 .2rem rgba(38,143,255,.3)",
        transition: 'all .5s ease',
        bottom: "30px",
        right: "34px",
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        backgroundColor: 'black',
        color: 'white',
        zIndex: '999',
        transform: 'translateY(100px)',
        opacity: '0'
    }
    render() {
        return (
            <button onClick={this.topFunction} style={this.button} className='btn success position-fixed' id="myBtn" title="Go to top">
                ☝️
            </button>
        );
    }
}

export default BtnScrollToTop;