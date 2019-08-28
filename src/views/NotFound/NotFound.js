import React, { useEffect , useState } from 'react';

import { Link } from 'react-router-dom';

import imgSearch from '../../assets/svg/search.svg'
import './NotFound.css'

export default function NotFound() {
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
    // if(value.length >= 4){
      setSearchUser( value );
    // }
  }

  function listUpdateSearch(params) {
    debugger
    setSearchUser( params.login );
    setLoading(true)
  }


  return (
    <div className="notFound">
      <div className='row header'>
        <h1 className="col-sm-3 Github-Search">GitHub<span>Search</span></h1>
        <div className="col-sm-9 inputSearch">
          <input 
            value={searchUser}
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
        </div>
        <div className="col-sm-3 Github-Search"></div>
        <div className="col-sm-9 spaceList">
           <ul className='listSearch'>
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
      <p className="Not-found-message">User not found :(</p>
    </ div>
  );
}
