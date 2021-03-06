import style from "./Searchbar.module.scss";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { SearchResults } from "../SearchResults";
import searchIcon from "./search_icon_label.png"

export const Searchbar = () => {
  const groups = useSelector(state => 
    state.groups.map((group) => 
    group.messages.map((message,index) =>{ let newMessage = {...message,index:index }; return newMessage})))
  const users = useSelector(state => state.users)

  const [searchResults, setSearchResult] = useState()
  const [input, setInput] = useState("");  
  const [hidden, setHidden] = useState(false)

  const search = (e) => {
    setInput(e.target.value);
    setHidden(false)
    const aa = []
    groups.map((messages) => aa.push(...messages))
    aa.map((message) => users.map((user) => {
      if (message.author === user.id) {
        message.name = user.name
        message.lastname = user.lastname
        message.photo = user.photo
        message.email = user.email
      }
      return message
    }))
    setSearchResult(aa.filter((message) =>
      message.text.toLowerCase().includes(input.toLowerCase()) || message.name.toLowerCase().includes(input.toLowerCase())))
  }


  return (
    <div className={style.searchbar}>
      <label htmlFor="inputSearchbar"><img src={searchIcon} alt='cerca'/></label>
      <input type="text" value={input} onChange={search} id="inputSearchbar"/>

      <h3 className={hidden === true ? style.hideResult : null} onClick={() => {setHidden(true);setInput('')}}>X</h3>
      {searchResults && <div className={`${style.searched} ${hidden === true && style.hideResult}`}>

        {searchResults.map((text, index) => (
          <SearchResults setHidden={setHidden} setInput={setInput} key={index} text={text} user={text} />
        ))}
      </div>}
    </div>
  );
};

