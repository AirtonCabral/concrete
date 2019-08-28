import React, { useEffect, useState} from 'react';
import QueryString from 'query-string'

import SideUser from "../../components/sideUser/sideUser";
import Repos from "../../components/Repos/Repos";


// import imgSearch from '../../assets/svg/search.svg'
import './Person.css'

export default function Person() {
  const [ query, setQuery ] = useState('')
  const [ userInfo, setUserInfo ] = useState({login: 'AirtonCabral'})
  const [ searchRepo, setSearchRepo ] = useState('')
  const [ repos, setRepos] = useState('')
  const [ loading, setLoading ] = useState(true) 
  const [ countStars, setCountStars ] = useState(0)

  useEffect(() => {
    debugger
    const parsed = QueryString.parse(window.location.search);
    setQuery(parsed)
   },[])

  useEffect(() => { 
    const fetchUrl = async() => {
			const usersInfoResponse = await fetch(`https://api.github.com/users/${query.login}`);
			const jsonUserInfo = await usersInfoResponse.json();

      if(await jsonUserInfo) {
        console.log(jsonUserInfo);
        setUserInfo(jsonUserInfo);
        // window.location.href = window.location.origin + '/NotFound'
      }
		}
		fetchUrl()
	},[query])

  useEffect(() => { 
    const fetchRepos = async() => {
			const reposResponse = await fetch(`https://api.github.com/users/${query.login}/repos`);
			const jsonRepos = await reposResponse.json();

      if(await jsonRepos) {
        setRepos(jsonRepos);
        setLoading(false)
      }
		}
		fetchRepos()
  },[query])

  useEffect(()=>{
    debugger
    if(repos.length > 1){
      let soma = 0
      
      repos.map( repo => { 
        soma = soma + repo.stargazers_count
        return repos
      })
      
      setCountStars(soma)
    }
    
  },[repos])

  function changeReposText(value) {
    if(value.length === 0) {
      const parsed = QueryString.parse(window.location.search);
      setQuery(parsed)
      setSearchRepo(value)
    } else {
      const reposAfterSearch  = []
      const flat = repos.map( (x) => {
        let lowercase =x.name.toLowerCase()
        if(lowercase.indexOf(searchRepo) === 0) {
          return reposAfterSearch.push(x)
        }
        return repos
      })
      setSearchRepo(value)
      setRepos(reposAfterSearch)
    }
    
  }


  return (
    <>
			<div className="container-fluid row Person">
				<div className="sideUserContent">
          <SideUser userInfo={userInfo} countStars={countStars}></SideUser>
        </div>
        <div className="mainRepoContent">
          <div className="input-group col-sm-12">
            <input value={searchRepo}
                  onChange={(e) => { changeReposText(e.target.value) } }
                  name='user'
                  type="text" 
                  className="form-control" 
                  placeholder="Search for Repositories..." />
            <button className="btn"
                    type="button" 
                    id="button-addon2" > 
              {/* <img src={imgSearch} alt='botão de procura'/>  */}
            </button>
          </div>
          { loading ? '' : ( repos.map((repo) => {
            return(<Repos key={repo.id} repo={repo}></Repos>)
          })) }
        </div>
			</div>
    </>
  );
}