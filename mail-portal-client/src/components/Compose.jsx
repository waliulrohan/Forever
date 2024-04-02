import React, { useState, useRef } from 'react';
import './components.css';
import { Dialog, IconButton } from '@mui/material';
import { AddPhotoAlternate, ArrowBack, Close, DeleteOutline } from '@mui/icons-material';
import EmojiPicker from 'emoji-picker-react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { toaster} from '../config/toaster'
import  Wait from '../config/Wait'

const Compose = ({ openCompose, setOpenCompose }) => {
    const token = sessionStorage.getItem("token");
    const [data, setData] = useState({
        to: '',
        subject: '',
        body: ''
    });
    const [attachment , setAttachment] = useState(false)
    const [isEmoji, setIsEmoji] = useState(false);
    const [isPhotoDialog , setIsPhotoDialog] = useState(false)
    const textareaRef = useRef(null);
    const [imageUrl, setImageUrl] = useState('');
    const [inputFile , setInputFile] = useState(null)
    const hiddenFileInput = useRef(null);
    const [wait , setWait]  = useState(false)

    const handleFileChange = async (e)=>{
        const files = e.target.files;
        const file = files && files.length ? files[0] : null;
        setInputFile(file)
        if (FileReader && files && files.length) {
          const reader = new FileReader();
          reader.onload = function () {
              setImageUrl(reader.result);
              document.getElementById("upload-photo").style.display = "block"
          };
          reader.readAsDataURL(files[0]);
      } else{
         console.log('something went wrong in file reader');
      }
      };

      

    const dialogStyle = {
        maxHeight: "100%",
        maxWidth: '100%',
        height: "90%",
        width: "80%",
        borderRadius: '10px 10px 0 0',
        overflow: 'hidden',
    };
    const handleAttach=()=>{
        setAttachment(true)
        document.getElementById("upload-photo").style.display = "none"
        setIsPhotoDialog(false)

    }

    const handleComposeSend = async(e) => {
        const { to, subject, body } = data;
        console.log(body)
        e.preventDefault();
        if (token) {
            if(!attachment){
                if (subject && to && body) {
                    setWait(true)
                fetch('http://localhost:5000/email/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        to,
                        body,
                        subject,
                    })
                }).then(res => res.json()).then(data => {
                   setWait(false)
                    if (data.error) {
                        toaster(data.error);
                    } else {
                        toaster(data.message);
                        setOpenCompose(false);
                        setImageUrl('');
                        setInputFile(null);
                        setAttachment(false);
                        setData({})
                    }

                })

            } else {
                toaster("Please add all the fields properly")
            }
            }else{
                if (subject && to && body) {
                    setWait(true)
                    try{
                    const formData = new FormData();
                    formData.append("file", inputFile);
                    formData.append("upload_preset", "waliul-photographic");
                    formData.append("cloud_name", "dlaikb0id");
              
                    const response = await fetch('https://api.cloudinary.com/v1_1/dlaikb0id/image/upload', {
                        method: 'POST',
                        body: formData,
                    });
              
                    if (response.ok) {
                        const result = await response.json();
                        if(token && result.secure_url){

                                fetch('http://localhost:5000/email/send', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'authorization': `Bearer ${token}`
                                    },
                                    body: JSON.stringify({
                                        to,
                                        body,
                                        subject,
                                        attachment: result.secure_url,
                                    })
                                }).then(res => res.json()).then(data => {
                                    setWait(false)
                                    if (data.error) {
                                        toaster(data.error);
                                    } else {
                                        toaster(data.message);
                                        setOpenCompose(false);
                                        setImageUrl('');
                                        setInputFile(null);
                                        setAttachment(false);
                                        setData({})
                                    }
                
                                })
                
                        
                        }
              
                    } else {
                        console.error('Error uploading image to Cloudinary');
                    }
                } catch (error) {
                    console.error('Error uploading image to Cloudinary', error);
                }
                }else {
                    toaster("Please add all the fields properly")
                }

            }
            
        }
    };

    const handleComposeClose = () => {
        setOpenCompose(false);
    };

    const handleFieldChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleEmojiClick = (emoji) => {
        const textarea = textareaRef.current;
        const { selectionStart, selectionEnd, value } = textarea;
    
        const textBefore = value.substring(0, selectionStart);
        const textAfter = value.substring(selectionEnd, value.length);
    
        const newValue = textBefore + emoji + textAfter;
    
        setData(prevData => ({
            ...prevData,
            body: newValue
        }));
    
        const newCursorPosition = selectionStart + emoji.length;
    
        const scrollTop = textarea.scrollTop;
    
        textarea.value = newValue;
    
        textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    
        textarea.scrollTop = scrollTop;
    
        textarea.focus();
    };
    
    
    
    

    return (
        <Dialog
            open={openCompose}
            PaperProps={{ sx: dialogStyle }}
            onClose={() => setOpenCompose(false)}
        >
            <div className="compose">

                <div className="compose-header">
                    <p>New Message</p>
                    <IconButton onClick={handleComposeClose}>
                        <Close fontSize='small' />
                    </IconButton>
                </div>
                <div className="compose-field">
                    <input value={data.to} type="text" name="to" placeholder='Recipients' onChange={handleFieldChange} />
                </div>
                <div className="compose-field">
                    <input value={data.subject} type="text" name="subject" placeholder='Subject' onChange={handleFieldChange} />
                </div>
                <div className="compose-body">
                    <textarea autoFocus ref={textareaRef} name="body" onChange={handleFieldChange} value={data.body}></textarea>
                    {
                        isEmoji &&

                        <div
                            style={{
                                position: "fixed",
                                bottom: 0,
                                right: 0,
                            }}>
                            <EmojiPicker
                                onEmojiClick={(emojiData, event) => {
                                    handleEmojiClick(emojiData.emoji);
                                }}
                                searchDisabled={true}
                                skinTonesDisabled={true}
                                emojiStyle="native"
                                className='emoji-picker'
                                previewConfig={{
                                    showPreview: false
                                }}
                                height={300}
                                width={265}

                            />
                        </div>
                    }

                </div>
                <div className="compose-footer">
                {wait && <Wait/>}
                    <button className="compose-send-btn" onClick={handleComposeSend}>Send</button>
                    <IconButton onClick={() => setIsEmoji(!isEmoji)}>
                        <SentimentSatisfiedAltIcon />
                    </IconButton>
                    {!attachment ?
                    <IconButton onClick={()=>{                                    
                                    setIsPhotoDialog(true)}}>
                        <AddPhotoAlternate />
                    </IconButton>
                    :
                         <div className="footer-frame" onClick={()=>setIsPhotoDialog(true)}>
                            <img src={imageUrl} alt="attachment" />
                        </div>

                    }
                </div>
                <Dialog
                    open={isPhotoDialog}
                    PaperProps={{ sx: dialogStyle }}
                    onClose={() =>{;
                    setIsPhotoDialog(false)}}
                >
                    <div className='update-profile-dialog' >
                        <div className="email-view-header">
                            <IconButton onClick={()=>{                                    
                                    setIsPhotoDialog(false)}}>
                                <ArrowBack sx={{fontSize:'20px',color:'black'}} />
                            </IconButton>
                        </div>
                        <p style={{margin:'10px', fontSize:'.95rem'}}>Add a photo</p>
                        <div className="dialog-frame" style={{borderRadius:0}}>
                        <img src={imageUrl} alt="attachment" />
                        </div>
                        <div className="signout">
                            <div className="profile-btn" style={{borderRadius:'30px 0px 0px 30px'}} onClick={()=>{                                    
                                    setIsPhotoDialog(false)
                                    setImageUrl('');
                                    setInputFile(null);
                                    setAttachment(false)
                                    document.getElementById("upload-photo").style.display = "none";
                                }}>
                                <p>Cancel</p>
                            </div>
                            <div onClick={()=> hiddenFileInput.current.click()} className="profile-btn"  style={{borderRadius:'0px 30px 30px 0px'}}>
                                <p>Choose</p>
                            </div>
                        </div>
                        <div  id="upload-photo" onClick={handleAttach}>
                           <p>Attach</p>
                        </div>
                        <input type="file" onChange={e => handleFileChange(e)}  ref={hiddenFileInput}  style={{ display:"none"}}/>
                    </div>
               </Dialog>
            </div>
        </Dialog>
    );
};

export default Compose;
