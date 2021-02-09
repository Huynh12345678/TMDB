import { useMediaQuery } from 'react-responsive'
import ReactReadMoreReadLess from "react-read-more-read-less";
const Biography = (props) => {
    const person = props.person;
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 767.98px)'
    })
    return (
        <>
            <h3>Biography</h3>
            <div className='content' style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                <p style={{ textAlign: 'justify', textJustify: 'inner-word' }}>
                    {
                        isMobileDevice ? (<>{person.biography !== '' ? (<ReactReadMoreReadLess
                            charLimit={350}
                            readMoreText={"Read more →"}
                            readLessText={""}
                            readMoreClassName="read-more-less--more"
                            readLessClassName="read-more-less--less"
                        >
                            {person.biography}
                        </ReactReadMoreReadLess>) : "We don't have a biography for " + person.name}</>) :
                            (<>
                                {
                                    person.biography !== '' ? (<ReactReadMoreReadLess
                                        charLimit={900}
                                        readMoreText={"Read more →"}
                                        readLessText={""}
                                        readMoreClassName="read-more-less--more"
                                        readLessClassName="read-more-less--less"
                                    >
                                        {person.biography}
                                    </ReactReadMoreReadLess>) : "We don't have a biography for " + person.name
                                }
                            </>)
                    }
                </p>
                {/* <p>{personInfo.biography}</p> */}
            </div>

        </>
    );
};

export default Biography;