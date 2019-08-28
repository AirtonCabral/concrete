import React from 'react';
import { Link } from 'react-router-dom';
import "./sideUser.css";

import organization from '../../assets/svg/organization-icon.svg'
import location from '../../assets/svg/location-icon.svg'
import stars from '../../assets/svg/star-icon.svg'
import public_repos from '../../assets/svg/repositorie-icon.svg'
import followers from '../../assets/svg/followers-icon.svg'

const SideUser = props => {

    return (
        <div className="sideuser">
            <Link to='/'>
				<h1 className="Github-Search">GitHub<span>Search</span></h1>
			</Link>
            <img className="user-avatar" src={props.userInfo.avatar_url + '.png'} alt='imagem de avatar'/>
            <h2 className='user-name'>{props.userInfo.name}</h2>
            <h3 className="user-login">{props.userInfo.login}</h3>
            <div className="lead">
				<div>
					<img src={organization} 
						className="icon" alt='Organização' />
						{ props.userInfo.company === null ? "N/A" : ( props.userInfo.company )}
						
				</div>
				<div>
					<img src={location} 
						className="icon" alt='Localização' />
						{ props.userInfo.location === null ? "N/A" : ( props.userInfo.location )}
				</div>
				<div>
					<img src={stars} 
						className="icon" alt='Esrelas' />
						{ props.countStars === null ? "N/A" : ( props.countStars )}
				</div>
				<div>
					<img src={public_repos} 
						className="icon" alt='Repositorios' />
						{ props.userInfo.public_repos === null ? "N/A" : ( props.userInfo.public_repos )}
				</div>
				<div>
					<img src={followers} 
						className="icon" alt='Repositorios' />
						{ props.userInfo.followers === null ? "N/A" : ( props.userInfo.followers )}
				</div>
            </div>
        </div>
    )
	}
	
	export default SideUser