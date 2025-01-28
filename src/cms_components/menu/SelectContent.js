import * as React from 'react';

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

// import { useCreate } from '../../contexts/CreateContext'
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


    const { setMobile, setMobileDisplays } = useMobile()

    const handleChange = (event) => {
        event.preventDefault()
        setCompany(event.target.value);
        if (event.target.value === 0) {
            setMobile(false)
            setMobileDisplays(false)
        }

        else { setMobile(true); }
    };

    return (
        <Select
            labelId="company-select"
            id="company-simple-select"
            value={company}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Select company' }}
            fullWidth
            sx={{
                maxHeight: 56,
                width: 215,
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
            <ListSubheader sx={{ pt: 0 }}>Production</ListSubheader>
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