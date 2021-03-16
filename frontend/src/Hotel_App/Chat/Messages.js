import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RedditIcon from '@material-ui/icons/Reddit';
import Loader from '../images/loader.gif'



const Messages = (props) => {

    const renderMessages = ({client, server}) => {

        if(client && server){
            // console.log("client",client, "server", server)
            return(
                client.map((item,idx)=>{
                    return(
                        <>
                        <li key={idx}><h6><AccountCircleIcon/>You : {item}</h6></li>
                        {
                            server[idx]?
                            <li key={idx+1}><h6><RedditIcon/>Bot : {server[idx]}</h6></li>
                            :<><RedditIcon/><img style={{width:"30px"}} src={Loader} alt="loader"/></>
                        }
                       
                        </>
                    )
                })
            )
        }
    }

    return (
        renderMessages(props)
    )
}
export default Messages;