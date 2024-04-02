import { AppBar, Toolbar, Box, InputBase, styled, IconButton } from '@mui/material';
import { Menu as MenuIcon, Tune, HelpOutlineOutlined, SettingsOutlined,AppsOutlined, AccountCircleOutlined, Search } from '@mui/icons-material'
import logo from '../images/forever-logo.png'
import './components.css'
import { useNavigate } from 'react-router-dom';


const NavBar = ({toggleDrawer}) => {
    const StyledAppBar = styled(AppBar)`
        background: #f6f8fc;
        box-shadow: none;
        height: 64px;
    `;
     const myPhoto = sessionStorage.getItem('myPhoto')
    const navigate = useNavigate()    
    return (
        <StyledAppBar position="static">
            <Toolbar>
                <IconButton onClick={toggleDrawer}>
                      <MenuIcon color="action"/>
                </IconButton>
              
                <img src={logo} alt="logo" className="navbar-logo"  onClick={()=> navigate('/')} />
                {/* <div className="navbar-search">
                   <Search color="action" />
                    <input type="text" className="navbar-search-input" />
                </div> */}
                <div className="navbar-photo" onClick={()=> navigate('/my-profile')}>
                    <img src={myPhoto} alt="DP" />
                </div>
            </Toolbar>
        </StyledAppBar>
    )
}

export default NavBar;