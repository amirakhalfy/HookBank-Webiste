import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ChatBot.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';


const ChatBot = ({ user_id }) =>  {
  const [question, setQuestion] = useState("");
  const [recording, setRecording] = useState(false); // State to track recording


  const startRecording = () => {
    setRecording(true);
    setQuestion("");
    const recognition = new window.webkitSpeechRecognition(); // Create a new SpeechRecognition instance
    recognition.lang = 'en-US'; // Set the language for speech recognition
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript; // Get the transcribed speech
      setQuestion(transcript); // Update the question state with the transcribed speech
      setRecording(false); // Set recording state to false after recognition is complete
    };
  
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setRecording(false); // Set recording state to false if there's an error
    };
  
    recognition.onend = () => {
      setRecording(false); // Set recording state to false when recognition ends
    };
  
    recognition.start(); // Start speech recognition
  };

  class Chatbox {
    constructor() {
      this.args = {
        openButton: document.querySelector('.chatbox__button'),
        chatBox: document.querySelector('.chatbox__support'),
        sendButton: document.querySelector('.send__button')
      }

      this.state = false;
      this.messages = [];
    }

    display() {
      const {openButton, chatBox, sendButton} = this.args;

      openButton.addEventListener('click', () => this.toggleState(chatBox))

      sendButton.addEventListener('click', () => this.onSendButton(chatBox))

      const node = chatBox.querySelector('input');
      node.addEventListener("keyup", ({key}) => {
        if (key === "Enter") {
          this.onSendButton(chatBox)
        }
      })
    }

    toggleState(chatbox) {
      this.state = !this.state;

      // show or hides the box
      if(this.state) {
        chatbox.classList.add('chatbox--active')
      } else {
        chatbox.classList.remove('chatbox--active')
      }
    }

    onSendButton(chatbox) {
      var textField = chatbox.querySelector('input');
      let text1 = textField.value
      if (text1 === "") {
        return;
      }

      let msg1 = { name: "User", message: text1 }
      this.messages.push(msg1);
      fetch('http://127.0.0.1:5000/ChatBot/1/user_input?user_input=1?user_input='+text1, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(r => r.json())
        .then(r => {
          let msg2 = { name: "Sam", message: r.Response };
          this.messages.push(msg2);
          this.updateChatText(chatbox)
          textField.value = ''

      }).catch((error) => {
          console.error('Error:', error);
          this.updateChatText(chatbox)
          textField.value = ''
        });
        setQuestion("");
    }

    updateChatText(chatbox) {
      var html = '';
      this.messages.slice().reverse().forEach(function(item, index) {
        if (item.name === "Sam")
        {
          html += '<div class="messages__item messages__item--visitor style={{width=100%}}">' + item.message + '</div>'
        }
        else
        {
          html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
        }
      });

      const chatmessage = chatbox.querySelector('.chatbox__messages');
      chatmessage.innerHTML = html;
    }
  }

  useEffect(() => {
    const chatbox = new Chatbox();
    chatbox.display();
  }, []);

  return (
    <div className="container">
        <div className="chatbox">
            <div className="chatbox__support" style={{width:"400px"}}>
                <div className="chatbox__header">
                    <div className="chatbox__image--header">
                        <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image"/>
                    </div>
                    <div className="chatbox__content--header">
                        <h4 className="chatbox__heading--header">Carthago support</h4>
                        <p className="chatbox__description--header">How can I help you?</p>
                    </div>
                </div>
                <div className="chatbox__messages">
                    <div></div>
                </div>
                <div className="chatbox__footer">
                    <input 
                        type="text" 
                        placeholder="Write a message..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <button className="chatbox__send--footer send__button">Send</button>
                    <button
                        className={`microphone__send--footer microphone__button bg-slate-100/20 p-2 rounded-full text-white ${recording ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-200'}`}
                        onClick={recording ? null : startRecording}
                        disabled={recording}
                    >
                        <FontAwesomeIcon icon={faMicrophone} />
                    </button>
                </div>
            </div>
            <div className="chatbox__button">
                <button className='chatbox_pop' style={{backgroundColor:"#c69e53"}}><FontAwesomeIcon  icon="fa-solid fa-message" /></button>
            </div>
        </div>
    </div>
  );
}

export default ChatBot;
