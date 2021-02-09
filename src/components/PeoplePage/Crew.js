import React, { Fragment } from 'react';
import chuyenDoiUrl from './../../helpers/urlSlug';
import { Link } from "react-router-dom";
const Crew = (props) => {
    const Art = props.crew.filter((item) => { return item.department === 'Art' });
    const Camera = props.crew.filter((item) => { return item.department === 'Camera' });
    const Costume = props.crew.filter((item) => { return item.department === 'Costume & Make-Up' });
    const Crew = props.crew.filter((item) => { return item.department === 'Crew' });
    const Directing = props.crew.filter((item) => { return item.department === 'Directing' });
    const Editing = props.crew.filter((item) => { return item.department === 'Editing' });
    const Lighting = props.crew.filter((item) => { return item.department === 'Lighting' });
    const Production = props.crew.filter((item) => { return item.department === 'Production' });
    const Sound = props.crew.filter((item) => { return item.department === 'Sound' });
    const Visual = props.crew.filter((item) => { return item.department === 'Visual Effects' });
    const Writing = props.crew.filter((item) => { return item.department === 'Writing' });
    const show = (item) => {
        return (
            <div className='root'>
                <Link to={'/person/' + item.id + '-' + chuyenDoiUrl(item.name)}><img style={{ objectFit: 'cover', backgroundColor: '#dbdbdb' }} width={66} height={66} src={item.profile_path} alt="" /></Link>
                <div className='wrapper'>
                    <Link to={'/person/' + item.id + '-' + chuyenDoiUrl(item.name)}>{item.name}</Link>
                    <p>{item.job}</p>
                </div>
            </div>
        )
    }


    return (
        <div className="col-sm-6 col-12 text-left mt-sm-0 mt-3">
            <h3>Crew&nbsp;<span>{props.crew.length}</span></h3>
            {
                Art.length !== 0 && (
                    <div className='job'>
                        <h4>Art</h4>
                        {
                            Art.map((item, key) => {
                                return <Fragment key={key}>{show(item)}</Fragment>
                            })
                        }
                    </div>
                )
            }
            {
                Camera.length !== 0 && (
                    <div className='job'>
                        <h4>Camera</h4>
                        {
                            Camera.map((item, key) => {
                                return <Fragment key={key}>{show(item)}</Fragment>
                            })
                        }
                    </div>
                )
            }
            {
                Costume.length !== 0 && (
                    <div className='job'>
                        <h4>Costume & Make-Up</h4>
                        {
                            Costume.map((item, key) => {
                                return <Fragment key={key}>{show(item)}</Fragment>
                            })
                        }
                    </div>
                )
            }
            {
                Crew.length !== 0 && (
                    <div className='job'>
                        <h4>Crew</h4>
                        {
                            Crew.map((item, key) => {
                                return <Fragment key={key}>{show(item)}</Fragment>
                            })
                        }
                    </div>
                )
            }
            {
                Directing.length !== 0 && (
                    <div className='job'>
                        <h4>Directing</h4>
                        {
                            Directing.map((item, key) => {
                                return <Fragment key={key}>{show(item)}</Fragment>
                            })
                        }
                    </div>
                )
            }
            {
                Editing.length !== 0 && (
                    <div className='job'>
                        <h4>Editing</h4>
                        {
                            Editing.map((item, key) => {
                                return <Fragment key={key}>{show(item)}</Fragment>
                            })
                        }
                    </div>
                )
            }
            {
                Lighting.length !== 0 && (
                    <div className='job'>
                        <h4>Lighting</h4>
                        {
                            Lighting.map((item, key) => {
                                return <Fragment key={key}>{show(item)}</Fragment>
                            })
                        }
                    </div>
                )
            }
            {
                Production.length !== 0 && (
                    <div className='job'>
                        <h4>Production</h4>
                        {
                            Production.map((item, key) => {
                                return <Fragment key={key}>{show(item)}</Fragment>
                            })
                        }
                    </div>
                )
            }
            {
                Sound.length !== 0 && (
                    <div className='job'>
                        <h4>Sound</h4>
                        {
                            Sound.map((item, key) => {
                                return <Fragment key={key}>{show(item)}</Fragment>
                            })
                        }
                    </div>
                )
            }
            {
                Visual.length !== 0 && (
                    <div className='job'>
                        <h4>Visual Effects</h4>
                        {
                            Visual.map((item, key) => {
                                return <Fragment key={key}>{show(item)}</Fragment>
                            })
                        }
                    </div>
                )
            }
            {
                Writing.length !== 0 && (
                    <div className='job'>
                        <h4>Writing</h4>
                        {
                            Writing.map((item, key) => {
                                return <Fragment key={key}>{show(item)}</Fragment>
                            })
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Crew;