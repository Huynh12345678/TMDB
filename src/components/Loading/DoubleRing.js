import '../../scss/components/Loading/DoubleRing.scss';
const DoubleRing = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    }
    return (
        <div className="la-ball-clip-rotate-multiple la-dark la-2x" style={style}>
            <div />
            <div />
        </div>
    );
};

export default DoubleRing;