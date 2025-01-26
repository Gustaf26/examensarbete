import * as React from 'react';
import { styled } from '@mui/material/styles';
// import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import SelectContent from './menu/SelectContent';
import MenuContent from './menu/MenuContent';
import CardAlert from './menu/CardAlert';
import OptionsMenu from './menu/OptionsMenu';
import { useAuth } from '../contexts/AuthContext'


const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

export default function CMSNav() {

    const { currentUser } = useAuth()

    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', md: 'block' },
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: 'background.paper',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    mt: 'calc(var(--template-frame-height, 0px) + 4px)',
                    p: 1.5,
                }}
            >
                <SelectContent />
            </Box>
            <Divider />
            <MenuContent />
            <CardAlert />
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
                {/* <Avatar
                    sizes="small"
                    alt="Riley Carter"
                    src="/static/images/avatar/7.jpg"
                    sx={{ width: 36, height: 36 }}
                /> */}

                <FiberManualRecordIcon sx={{ width: 44, height: 44 }} />
                <p style={{ color: 'white', zIndex: 100, position: 'absolute', left: '32px', bottom: "27px", margin: 0 }}>
                    {currentUser.email.slice(0, 1).toUpperCase()}
                </p>
                <Box sx={{ mr: 'auto', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body" sx={{ fontWeight: 500, lineHeight: '16px' }}>
                        {currentUser.displayName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {currentUser.email}
                    </Typography>
                </Box>
                <OptionsMenu />

            </Stack>
        </Drawer>
    );
}