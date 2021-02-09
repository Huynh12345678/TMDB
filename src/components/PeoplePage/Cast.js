import React from 'react';
import chuyenDoiUrl from './../../helpers/urlSlug';
import { Link } from "react-router-dom";
const Cast = (props) => {
    return (
        <div className="col-sm-6 col-12  text-left">
            <h3>Cast&nbsp;<span>{props.cast.length}</span></h3>
            <div>
                {
                    props.cast.map((value, key) => {
                        return (
                            <div className='root' key={key}>
                                <Link to={'/person/' + value.id + '-' + chuyenDoiUrl(value.name)}><img style={{ objectFit: 'cover', backgroundColor: '#dbdbdb' }} width={66} height={66} src={value.profile_path} alt="" /></Link>
                                <div className='wrapper'>
                                    <Link to={'/person/' + value.id + '-' + chuyenDoiUrl(value.name)}>{value.name}</Link>
                                    <p>{value.character}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Cast;