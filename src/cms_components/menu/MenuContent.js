import * as React from 'react';
import { useNavigate } from 'react-router'

// import { useCreate } from '../../contexts/CreateContext'
import { useMobile } from '../../contexts/MobileContext';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import Select, { selectClasses } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
// import { Fullscreen } from '@mui/icons-material';
// import { MenuItem } from '@mui/material';

const mainListItems = [
    { text: 'Home', icon: <HomeRoundedIcon />, url: 'cms/index' },
    { text: 'Analytics', icon: <AnalyticsRoundedIcon />, url: 'cms/index' },
    { text: 'Users', icon: <PeopleRoundedIcon />, url: 'cms/index' },
    { text: 'Products', icon: <CheckroomIcon />, url: '/cms/products/prod-list' },
];

const secondaryListItems = [
    { text: 'Settings', icon: <SettingsRoundedIcon /> },
    { text: 'About', icon: <InfoRoundedIcon /> },
    { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {

    const navigate = useNavigate()
    const [itemSelected, setItemSelected] = React.useState(0)
    const { fullScreen, setFullScreen, setMobile } = useMobile()

    // React.useEffect(() => {

    //     if (itemSelected === 3) navigate(`/cms/products/prod-list`, { replace: true })

    // }, [itemSelected])

    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton selected={index === itemSelected} onClick={() => {
                            if (item.text === 'Products' && window.innerWidth > 900) setMobile(false)
                            setItemSelected(index); navigate(item.url); fullScreen && setFullScreen(false)
                        }}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>

                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack >
    );
}