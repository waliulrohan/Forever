import React, { useEffect, useRef, useState } from 'react';
import './tabs.css'
import { Dialog, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { toaster} from '../../config/toaster'

import { confirmAlert } from 'react-confirm-alert';
import '../../config/confirmModal.css'
import Loader from '../../config/Loader';

const MyProfile = () => {
    const myId = sessionStorage.getItem('myId');
    const token = sessionStorage.getItem('token');
    const [data , setData] = useState({});
    const [dpDialog  , setDpDialog]  = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [inputFile , setInputFile] = useState(null)
    const hiddenFileInput = useRef(null);
    const removedPhoto = 'https://res.cloudinary.com/dlaikb0id/image/upload/v1705229649/noProfile_cy0wyc.png';
      const uploadPhoto = async ()=>{
        try {
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
          setImageUrl(result.secure_url);
          if(token && result.secure_url){
            fetch('https://forever-server-8try.onrender.com/user/uploadProfilePic',{
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                photo: result.secure_url,
              })
            }).then(res => res.json()).then(data =>{
              if (data.error) {
                  toaster(data.error);
              }else{
                toaster(data.message)
                document.getElementById("upload-photo").style.display = "none";
                setData(data.user)
                sessionStorage.setItem('myPhoto' , data.user.photo)
                setDpDialog(false)
                setImageUrl(data.user.photo)
              }

              })
          }

      } else {
          console.error('Error uploading image to Cloudinary');
      }
  } catch (error) {
      console.error('Error uploading image to Cloudinary', error);
  }
  }
      // signout confirm
      const handleSignout = () => {
        confirmAlert({
            title: 'Sign Out',
            message: 'Are you sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                         sessionStorage.removeItem("token");
                         sessionStorage.removeItem("myPhoto");
                         sessionStorage.removeItem("myId");
                         window.location.reload();
                    }
                },
                {
                    label: 'No',
                    onClick: () => toaster("You don't want to logout")
                }
            ]
        });
    };
// update photo confirm
const handleUpdatePhoto = () => {
  confirmAlert({
      title: 'Update photo',
      message: 'Are you sure?',
      buttons: [
          {
              label: 'Yes',
              onClick: () => {
                   uploadPhoto()
              }
          },
          {
              label: 'No',
              onClick: () => toaster("Okay.")
          }
      ]
  });
};
// remove photo confirm
const handleRemovePhoto = () => {
  confirmAlert({
      title: 'Remove photo',
      message: 'Are you sure?',
      buttons: [
          {
              label: 'Yes',
              onClick: () => {
                if(sessionStorage.getItem('myPhoto') === removedPhoto){
                  toaster('Already removed')
                }else{
                  if(token ){
                    fetch('https://forever-server-8try.onrender.com/user/removeProfilePic',{
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                      },
                    }).then(res => res.json()).then(data =>{
                      if (data.error) {
                          toaster(data.error);
                      }else{
                        toaster(data.message)
                        setData(data.user)
                        sessionStorage.setItem('myPhoto' , data.user.photo)
                        setDpDialog(false)
                        setImageUrl(data.user.photo)
                      }
        
                      })
                  }
              }
            }
          },
          {
              label: 'No',
              onClick: () => toaster("Okay.")
          }
      ]
  });
};
    useEffect(()=>{
        if(token && myId){
            fetch('https://forever-server-8try.onrender.com/user/userData',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  userId : myId,
                })
              }).then(res => res.json()).then(data =>{
                if (data.error) {
                    toaster(data.error);
                }else{
                    setData(data)
                    setImageUrl(data.photo)
                }

                })
          
        }
    },[])

    const handleFileChange = async (e)=>{
      const files = e.target.files;
      const file = files && files.length ? files[0] : null;
      setInputFile(file)
      if (FileReader && files && files.length) {
        const reader = new FileReader();
        reader.onload = function () {
            setImageUrl(reader.result);
            document.getElementById("upload-photo").style.display = "block";
        };
        reader.readAsDataURL(files[0]);
    } else{
       console.log('something went wrong in file reader');
    }
    }

 

    const dialogStyle = {
      maxHeight: "100%",
      maxWidth: '100%',
      height: "90%",
      width: "80%",
      borderRadius: '10px 10px 0 0',
  };

    if(data && data.bio){
        const {bio , _id , name , email , photo} = data
class ClickToCopy extends React.Component {
    constructor(props) {
      super(props);
      this.textRef = React.createRef();
    }
  
    copyToClipboard = () => {
      const textArea = this.textRef.current;
      textArea.select();
      document.execCommand('copy');
      toaster('email copied');
    };
  
    render() {
      return (
        <div>
          <textarea
            ref={this.textRef}
            defaultValue={this.props.content}
            readOnly
            style={{ position: 'absolute', left: '-9999px' }}
          />
          <p className="profile-email" title='click to copy' onClick={this.copyToClipboard}>{email}</p>
        </div>
      );
    }
  }
        return (
            <div className='emails profile'>
                <div className="email-view-header">
                     <IconButton onClick={()=>window.history.back()}>
                        <ArrowBack sx={{fontSize:'20px',color:'black'}} />
                     </IconButton>
                </div>
                <ClickToCopy content={email} />
                <div className="profile-frame" onClick={() => setDpDialog(true)}>
                    <img src={photo} alt="" />
                </div>
                <div className="profile-info">
                    <p className="profile-name">{name}</p>
                    <p className="profile-bio">{bio}</p>
                </div>
                <div className="signout">
                    <div onClick={()=> toaster('I will add something here later')} className="profile-btn" style={{borderRadius:'30px 0px 0px 30px'}}>
                        <p>.....</p>
                    </div>
                    <div onClick={handleSignout} className="profile-btn"  style={{borderRadius:'0px 30px 30px 0px'}}>
                        <p>Sign out</p>
                    </div>
                </div>

                <Dialog
            open={dpDialog}
            PaperProps={{ sx: dialogStyle }}
            onClose={() =>{
              document.getElementById("upload-photo").style.display = "none";
               setDpDialog(false)}}
        >
            <div className='update-profile-dialog' >
                <div className="email-view-header">
                     <IconButton onClick={()=>{
                            document.getElementById("upload-photo").style.display = "none";
                            setDpDialog(false)}}>
                        <ArrowBack sx={{fontSize:'20px',color:'black'}} />
                     </IconButton>
                </div>
                <p style={{margin:'10px', fontSize:'.95rem'}}>Update your photo</p>
                <div className="dialog-frame">
                  <img src={imageUrl} alt="dp" />
                </div>
                <div className="signout">
                    <div onClick={handleRemovePhoto} className="profile-btn" style={{borderRadius:'30px 0px 0px 30px'}}>
                        <p>Remove</p>
                    </div>
                    <div onClick={()=> hiddenFileInput.current.click()} className="profile-btn"  style={{borderRadius:'0px 30px 30px 0px'}}>
                        <p>Change</p>
                    </div>
                </div>
                <div onClick={handleUpdatePhoto} id="upload-photo">
                  <p>Upload</p>
                </div>
                <input type="file" onChange={e => handleFileChange(e)}  ref={hiddenFileInput}  style={{ display:"none"}}/>
            </div>
        </Dialog>
            </div>
        );
    }else{
        return(<Loader/>)
    }
};

export default MyProfile;