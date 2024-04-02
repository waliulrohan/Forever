import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { toast } from 'react-hot-toast';

export const toaster = (a) => {
    toast((t) => (
      <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center',gap: '15px'}}>
        {a}
        <IconButton onClick={() => toast.dismiss(t.id)}>
          <Close sx={{fontSize:'28px',color:'black'}} />
        </IconButton>
      </span>
    ), {
      duration: 2000,
      style: {
        borderRadius: '0px',
        background: '#f6f8fc',
        color: 'black',
        height: "30px",
        border: ' 1px solid #dadce0',


      },
    });
  };