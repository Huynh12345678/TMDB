import ModalVideo from 'react-modal-video'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import '../../css/_icon.scss';
import { fetchInfoVideo } from '../../api/fetchInfoVideo';
import { Typography } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive'

const Card = styled.div`
margin-bottom:30px;
&:last-child{
    margin-bottom:0px;
}
`
const Div = styled.div`
border-top:1px solid rgba(227,227,227,1);
border-bottom:1px solid rgba(227,227,227,1);
border-right:1px solid rgba(227,227,227,1);
border-radius:8px;
overflow:hidden;
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`

const Play = styled.div`
transition: all 0.2s;
&:hover {
    opacity: 0.6;
}
`
const Info = styled.div`

width:100%;
display:flex;
flex-direction:column;
justify-content:space-between;
`
const Child = styled.div`
padding:10px 16px;
`
const Span = styled.span`
background-size:cover;
display:flex;
width: 20px;
height: 14.09px;
margin-right:6px;
&:last-child{
    margin-left:4px;
    width:17.6px;
    height:17.6px;
    opacity:0.6;
}
`
const VideoCard = ({ item, index, type }) => {
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 991.98px)'
    })
    const id = item.key;
    const [isOpen, setOpen] = useState({ id: false })
    const openModal = (id) => {
        setOpen({
            [id]: true
        });
    }
    const closeModal = (id) => {
        setOpen({
            [id]: false
        });
    }
    const [info, setInfo] = useState(null);
    useEffect(() => {
        !isMobileDevice && setInfo(null);
        const fetch = async () => {
            await fetchInfoVideo(id).then((res) => {
                if (res) {
                    setInfo({
                        name: item.name,
                        date: res.info.publishedAt,
                        runtime: res.info.runtime,
                        channel: res.info.channelTitle,
                        idChannel: res.info.channelId
                    })
                } else {
                    setInfo({
                        name: item.name,
                        date: '-',
                        runtime: '-',
                        channel: '-',
                        idChannel: '-'
                    })
                }
            })
        }
        fetch();
    }, [id, isMobileDevice, item.name])
    return info && <Card className="col-12" key={index} style={{ paddingLeft: isMobileDevice ? '15px' : '24px' }}>
        <ModalVideo
            channel='youtube'
            isOpen={isOpen[id]}
            videoId={id}
            onClose={() => closeModal(id)}
        />
        <Div className='d-md-flex'>
            <div style={{ minWidth: '350px', height: "197px", backgroundImage: `url('https://i.ytimg.com/vi/${item.key}/hqdefault.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className='d-flex  justify-content-center align-items-center' id="video">
                <div className='d-flex justify-content-center align-items-center' style={{ paddingLeft: '2px', borderRadius: '100%', width: '65px', height: '65px', background: 'rgba(0,0,0,0.7)' }}>
                    <Play className='btnPlay' onClick={() => openModal(id)} style={{ backgroundImage: `url('https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-175-play-806cb05551791b8dedd7f8d38fd3bd806e2d397fcfeaa00a5cc9129f0819fd07.svg')`, width: '35px', height: '35px', filter: 'invert(1)' }}></Play>
                </div>
            </div>
            <Info className='info'>
                <Child>
                    <b>{info.name}</b>
                    <br />
                    <span style={{ fontSize: '14.4px' }}>{type} • {info.runtime} • {info.date}</span>
                </Child>
                <Child style={{ backgroundColor: '#F7F7F7', display: 'flex', alignItems: 'center' }}>
                    <Span className='youtube_icon'></Span>
                    <Typography style={{ opacity: '0.6', fontSize: '14.5px' }}><a href={'https://www.youtube.com/channel/' + info.idChannel} target='_blank' rel="noreferrer">{info.channel}</a></Typography>
                    <Span className='verifyCheck_icon'></Span>
                </Child>
            </Info>
        </Div>
    </Card>
};

export default VideoCard;