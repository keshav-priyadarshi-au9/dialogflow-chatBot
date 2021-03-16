import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";
import MicIcon from "@material-ui/icons/Mic";
import RedditIcon from "@material-ui/icons/Reddit";
import axios from "axios";
import Messages from "../Chat/Messages";
import "./chatmodal.css";
import Loader from '../images/loader.gif'

const ChatModal = (props) => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [clientResponse, setClientResponse] = useState([]);
  const [serverResponse, setServerResponse] = useState([]);
  const [listening, setListening] = useState(false)
  // const [chats, setChats] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    let welcome = "How may I assist you ? "
    speechSynthesis.speak( new SpeechSynthesisUtterance(welcome))
  };

  const clientHandler = (event) => {
    let input = event.target.value;
    setQuery(input);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setClientResponse([...clientResponse, query]);
    callBot();
  };

  const voiceHandler = () => {
    recognition.start()
    setListening(true)
    recognition.onresult=(event)=>{
      const speechToText = event.results[0][0].transcript;
      setQuery(speechToText)
      setListening(false)
      console.log(speechToText)
    } 
  };

  const callBot = () => {
    console.log(clientResponse)
    let obj = { text: query };

    axios
      .post("http://localhost:2400/chatbot", obj)
      // .post("https://travenation-controller.herokuapp.com/chatbot", obj)

      .then((response) => {
        setServerResponse([...serverResponse, response.data]);
        speechSynthesis.speak( new SpeechSynthesisUtterance(response.data))
        setQuery("");
        // console.log(serverResponse)
      });
  };

  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Chat with us!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <RedditIcon /> How may I assist you ?
          </Modal.Title>

          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={handleClose}
          ></CloseIcon>
        </Modal.Header>

        <Modal.Body>
          <div className="card" style={{ height: "40vh" }}>
            <ul
              style={{
                listStyleType: "none",
                overflow: "auto",
                padding: "20px",
              }}
            >
              <Messages client={clientResponse} server={serverResponse} />
            </ul>h
          </div>
        </Modal.Body>

        <hr />
        {/* <Modal.Footer> */}

        <div className="row" style={{ padding: "10px" }}>
          <div className="col-md-9">
            <input
              className="form-control"
              placeholder="Type message..."
              value={query}
              onChange={clientHandler}
            />
          </div>

          <div className="col-md-3">
            {
              listening?
                <img style={{width:"30px"}} src={Loader} alt="loader"/> 
              :<MicIcon id="voice" onClick={voiceHandler}></MicIcon>
            }
            <SendIcon id="send" onClick={submitHandler}></SendIcon>
          </div>
        </div>

        {/* </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default ChatModal;
