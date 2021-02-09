import { useRef, useState } from 'react'
import clsx from "clsx";

function ImageZoom({ zoom, src, alt, background, id, width, height }) {
    const key = id;
    const zoomRef = useRef(zoom.clone({ background }))
    const [ImageLoaded, loadImage] = useState({
        id: false
    });
    const ImageLoad = (key) => loadImage({ ...ImageLoaded, [key]: true });
    function attachZoom(image) {
        zoomRef.current.attach(image)
    }
    return <img
        style={{ zIndex: '999' }}
        src={src}
        alt={alt}
        ref={attachZoom}
        onLoad={() => ImageLoad(key)}
        className={clsx('img-fluid medium-zoom-image', ImageLoaded[key] ? 'image__loaded' : 'image__loading')}
        width={width}
        height={height}
        loading='lazy'
    />
}

export default ImageZoom