import { useState } from 'react'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useMobile } from '../contexts/MobileContext'

const MobileList = () => {

    const { setMobileWidth, setMobileHeight } = useMobile()
    const [selectedIndex, setSelectedIndex] = useState(0)

    return (
        <List style={{ position: 'absolute', backgroundColor: 'rgba(255, 255, 255,0.9)', paddingLeft: '0', borderRadius: '5px', right: '20px', top: `0`, left: '0', listStyleType: 'none', zIndex: '3' }}>
            <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton id="0" selected={selectedIndex === '0'} onClick={(e) => { setSelectedIndex('0'); setMobileWidth(500); setMobileHeight(600) }} className="mobile-displays-item" >
                    <ListItemText primary={'Samsung'} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton id="0" selected={selectedIndex === '1'} onClick={(e) => { setSelectedIndex('1'); setMobileWidth(450); setMobileHeight(650) }} className="mobile-displays-item" >
                    <ListItemText primary={'Apple'} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton id="0" selected={selectedIndex === '2'} onClick={(e) => { setSelectedIndex('2'); setMobileWidth(350); setMobileHeight(700) }} className="mobile-displays-item" >
                    <ListItemText primary={'Sony'} />
                </ListItemButton>
            </ListItem>
        </List>
    )
}

export default MobileList