import { useState, useEffect } from 'react'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { Row } from "react-bootstrap";

import { useMobile } from '../contexts/MobileContext'

const MobileList = () => {

    const { setMobileWidth, setMobileHeight, mobileWidth, mobileDisplays } = useMobile()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [deviceTypes, setDeviceTypes] = useState()


    useEffect(() => {

        if (mobileDisplays) {

            async function getDevices() {
                await fetch('/rawDevices.json')
                    .then(res => res.json())
                    .then(res => setDeviceTypes(res.devices))
                    .catch(err => console.log(err))
            }
            getDevices()
        }

    }, [mobileDisplays])


    return (<Row style={{ zIndex: '10', position: 'absolute', top: '0', left: '10px' }}>
        <List sx={{ borderTopLeftRadius: 19, borderTopRightRadius: 19, overflow: 'hidden' }} style={{
            zIndex: '4', position: 'absolute', backgroundColor: 'rgba(233, 232, 232, 0.9)', paddingTop: '0',
            paddingLeft: '0', width: `${mobileWidth}px`, right: '0', top: `0`,
            left: '0', height: 'fit-content', listStyleType: 'none', overflow: 'hidden'
        }}>
            {deviceTypes && deviceTypes.map((device, i) => {
                return (
                    <ListItem disablePadding sx={{ display: 'block', borderBottom: '1px solid rgb(220,220,220)' }}>
                        <ListItemButton id="0" selected={selectedIndex === i.toString()} onClick={(e) => {
                            setSelectedIndex(i.toString());
                            setMobileWidth(device.width);
                            setMobileHeight(device.height);
                        }} className="mobile-displays-item" >
                            <ListItemText primary={device.device} style={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List>
    </Row>
    )
}

export default MobileList