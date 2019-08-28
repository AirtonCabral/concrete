import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import './Home.css';
import imgSearch from '../../assets/svg/search.svg'

export default function Home() {
  const [ loading, setLoading ] = useState(true)
  const [ users, setUsers ]  = useState({})
  // const [ usertoSearch, setUserstoSearch] = useState({})
  const [ searchUser, setSearchUser ]  = useState('')

  useEffect(() => { 
    const fetchUrl = async() => {
      const options = {
        headers: {
          'User-Agent': 'concreteApp',
          'clientId': '15694229'
        }
      };
			const usersResponse = await fetch(`https://api.github.com/search/users?q=${searchUser}&per_page=10`, options.headerss);
			const jsonUser = await usersResponse.json();
      console.log(jsonUser.items)
      if(jsonUser.items){
        setUsers(jsonUser.items)
        setLoading(false)
      }
		}
		fetchUrl()
	},[searchUser])

  function handleChangeText (value) {
      setSearchUser( value );
  }

  function listUpdateSearch(params) {
    debugger
    setSearchUser( params.login );
    setLoading(true)
  }

  return (
    <>
			<div className="container Home">7
				<h1 className="Github-Search">GitHub<span>Search</span></h1>
        <div className="input-group sm-12">
          <input value={searchUser}
                onChange={ (e) => handleChangeText(e.target.value) }
                name='user'
                type="text" 
                className="form-control" 
                placeholder="Search for user..." 
                required/>
          <div className="input-group-append">
          <Link to={`/Person/?login=${searchUser}`}>
            <button className="btn" type="button" id="button-addon2" > 
              <img src={imgSearch} alt='botão de procura'/> 
            </button>
          </Link>
          </div>
          <ul className='col-sm-12'>
            {loading ? '' : ( 
              users.map((user)=> {
                return (
                      <li key={user.login} onClick={() => listUpdateSearch(user)}>
                        {user.login}
                      </li>
                  )
              })
            )}
          </ul>
			</div>
      </div>
    </>
  );
}
