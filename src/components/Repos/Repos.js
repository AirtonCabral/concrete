import React from 'react';

import './Respos.css'
import stars from '../../assets/svg/star-icon.svg'

const Repos = props => {
    return (
        <div className='Repos'>
            <h1 className="repo-name">{props.repo.name}</h1>
            <h4 className="repo-description">{props.repo.description}<br/></h4>
            <p className="star-count">
                <img src={stars} 
                    className="icon" alt='Esrelas' />
                {props.repo.stargazers_count}
            </p>
        </div>
        )
}
export default Repos