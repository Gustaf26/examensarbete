import * as React from 'react';
import { useNavigate } from 'react-router';

import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Select, { selectClasses } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';

import { useMobile } from '../../contexts/MobileContext'

const Avatar = styled(MuiAvatar)(({ theme }) => ({
    width: 28,
    height: 28,
    backgroundColor: (theme.vars || theme).palette.background.paper,
    color: (theme.vars || theme).palette.text.secondary,
    border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
    minWidth: 0,
    marginRight: 12,
});

export default function SelectContent() {
    const [company, setCompany] = React.useState(0);
    const navigate = useNavigate()

    const { setMobile, setMobileDisplays, mobile, fullScreen, setFullScreen } = useMobile()

    const handleChange = (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (fullScreen) setFullScreen(false)
        setCompany(event.target.value);

        if (event.target.value === 0) {
            if (window.innerWidth < 1100) {
                alert('Your device is too small for Desktop View')
                setMobile(true)
                return
            }
            setMobile(false)
            setMobileDisplays(false)
        }
        else if (event.target.value === 40) {
            navigate('cms/create')
        }

        else if (event.target.value === 10) { setMobile(true); }
    };

    return (
        <Select
            labelId="company-select"
            id="company-simple-select"
            value={mobile ? 'Dis' : company}
            onChange={handleChange}
            // displayEmpty
            inputProps={{ 'aria-label': 'Select company' }}
            fullWidth
            sx={{
                maxHeight: 56,
                margin: mobile ? '0 auto 0 -10px' : 'none',
                width: mobile ? 60 : 215,
                '&.MuiList-root': {
                    p: '8px',
                },
                [`& .${selectClasses.select}`]: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    pl: 1,
                },
            }}
        >
            <MenuItem value={'Dis'}>
                <ListItemText primary="" secondary="Dis" />
            </MenuItem>
            <ListSubheader style={{ zIndex: 5 }} sx={{ pt: 0 }}>Production</ListSubheader>
            <MenuItem value={0}>
                <ListItemAvatar>
                    <Avatar alt="Sitemark web">
                        <DevicesRoundedIcon sx={{ fontSize: '1rem' }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Your CMS" secondary="Web app" />
            </MenuItem>
            <MenuItem value={10}>
                <ListItemAvatar>
                    <Avatar alt="Sitemark App">
                        <SmartphoneRoundedIcon sx={{ fontSize: '1rem' }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Your CMS" secondary="Mobile application" />
            </MenuItem>
            <ListSubheader>Development</ListSubheader>
            <MenuItem value={30}>
                <ListItemAvatar>
                    <Avatar alt="Sitemark Store">
                        <ConstructionRoundedIcon sx={{ fontSize: '1rem' }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Sitemark-Admin" secondary="Web app" />
            </MenuItem>
            <Divider sx={{ mx: -1 }} />
            <MenuItem value={40}>
                <ListItemIcon>
                    <AddRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Add product" secondary="Web app" />
            </MenuItem>
        </Select>
    );
}