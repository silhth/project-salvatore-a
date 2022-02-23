import style from './ModalMobile.module.scss'

import { Conversation } from '../Conversation'

export const ModalMobile = (props) => {
 
    return (
        <div className={`${style.modalMobile} ${props.hideGroup === true  && style.hideGroups}`}>
            <Conversation component="modalMobile"/>
        </div>
    )
}