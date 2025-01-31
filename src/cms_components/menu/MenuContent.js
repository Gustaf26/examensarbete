import * as React from 'react';
import { useNavigate, Navigate } from 'react-router-dom'

import { useCreate } from '../../contexts/CreateContext'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Select, { selectClasses } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import CheckroomIcon from '@mui/icons-material/Checkroom'; import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { MenuItem } from '@mui/material';

const mainListItems = [
    { text: 'Home', icon: <HomeRoundedIcon />, url: 'cms/index' },
    { text: 'Analytics', icon: <AnalyticsRoundedIcon />, url: 'cms/index' },
    { text: 'Users', icon: <PeopleRoundedIcon />, url: 'cms/index' },
    { text: 'Products', icon: <CheckroomIcon />, url: '/cms/products/troussers' },
];

const secondaryListItems = [
    { text: 'Settings', icon: <SettingsRoundedIcon /> },
    { text: 'About', icon: <InfoRoundedIcon /> },
    { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {

    const navigate = useNavigate()
    const [itemSelected, setItemSelected] = React.useState(0)
    const { productCategories } = useCreate()
    const [standardProdOption, setStandardProdOption] = React.useState('')

    // React.useEffect(() => {
    //     setStandardProdOption('troussers')

    // }, [])

    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton selected={index === itemSelected} onClick={() => { setItemSelected(index); item.text !== "Products" && navigate(item.url) }}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                        {item.text === "Products" && itemSelected === 3 && (
                            <Select
                                labelId="company-select"
                                id="company-simple-select"
                                defaultValue={'troussers'}
                                onChange={(e) => { navigate(`cms/products/${e.target.value}`) }}
                                inputProps={{ 'aria-label': 'Select company' }}
                                fullWidth
                                sx={{
                                    marginLeft: '5px',
                                    maxHeight: 56,
                                    width: 218,
                                    marginTop: '5px',
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

                                {productCategories && productCategories.map(prodCat => {
                                    return (<MenuItem value={prodCat.name}>
                                        <ListItemText style={{ textTransform: 'capitalize', paddingLeft: '8px' }} primary={prodCat.name} />
                                    </MenuItem>)
                                })}
                            </Select>)}
                        {/* {standardProdOption && itemSelected === 3 && <Navigate to={`/cms/products/${standardProdOption}`} />} */}
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