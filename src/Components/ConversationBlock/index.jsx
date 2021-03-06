import style from './ConversationBlock.module.scss'

import { Conversation } from '../Conversation'
import UsersList from '../UsersList'


export const ConversationBlock = () => {
    return (
        <div className={style.conversation} >
            
            <Conversation  component="ConversationBlock"/>
            <UsersList/>
        </div>
    )
}