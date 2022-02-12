import { Searchbar } from "../../Components/Searchbar";
import { ConversationBlock } from "../../Components/ConversationBlock";
import { MessageBlock } from "../../Components/MessageBlock";
import { Routes,Route } from "react-router-dom";

const Home = () => {
    return (
          <div className="flex-container">
          <div className="header">
            <Searchbar></Searchbar>
          </div>
      
          <div className="main"> 
            <ConversationBlock/>
            <MessageBlock/>
          </div>
        </div>
    )
};

export default Home;