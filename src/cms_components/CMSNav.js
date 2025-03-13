import * as React from 'react';

import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import SelectContent from './menu/SelectContent';
import MenuContent from './menu/MenuContent';
// import CardAlert from './menu/CardAlert';
import OptionsMenu from './menu/OptionsMenu';

import { useAuth } from '../contexts/AuthContext'
import { useMobile } from '../contexts/MobileContext'

import useMobileStyles from '../hooks/useMobileStyles';


export default function CMSNav() {

    const { currentUser } = useAuth()
    const { mobile, mobileWidth, fullScreen, setFullScreen } = useMobile()

    const { microMobile } = useMobileStyles()

    const Drawer = styled(MuiDrawer)({
        width: fullScreen ? '100vw' : mobile ? 70 : 240,
        maxWidth: fullScreen ? mobileWidth : mobile ? 70 : 240,
        flexShrink: 1,
        boxSizing: 'border-box',
        mt: 10,
        [`& .${drawerClasses.paper}`]: {
            width: fullScreen ? '100vw' : microMobile ? 0 : mobile ? 70 : 240,
            boxSizing: 'border-box',
            overflowX: 'hidden'
        },

    });


    return (
        <Drawer id="CMS-nav" variant="permanent"
            sx={{
                display: { xs: 'block', md: 'block' },
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: 'background.paper',
                },
                // maxWidth: mobile ? 40 : 240,
                overflowX: 'hidden',
            }}>
            <Box
                sx={{
                    display: 'flex',
                    mt: 'calc(var(--template-frame-height, 0px) + 4px)',
                    p: 1.5,
                    ml: '10px'
                }}
            >
                <SelectContent onClick={() => setFullScreen(false)} />
            </Box>
            <Divider />
            <MenuContent onClick={() => setFullScreen(false)} />
            {/* <CardAlert /> */}
            <Stack
                direction="row"
                sx={{
                    p: 2,
                    gap: 1,
                    alignItems: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >

                <OptionsMenu />
                <Box sx={{ mr: 'auto', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body" sx={{ fontSize: '0.9em', fontWeight: 500, lineHeight: '16px' }}>
                        {currentUser.displayName}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.9em', color: 'text.secondary' }}>
                        {currentUser.email}
                    </Typography>
                </Box>
            </Stack>
        </Drawer >
    );
}