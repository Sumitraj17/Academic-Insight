import {
    Box,
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    IconButton,

} from "@mui/material";
import '../index.css'

import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail";

import { useState } from "react";
import WideLogo from "./shared/WideLogo";

const SideBar = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => {
        setOpen(newOpen);
    }

    const DrawerList = (
        <Box sx={{ width: 400 }} role='presentation' onClick={() => toggleDrawer(false)}>
            <WideLogo />
            <Typography sx={{
                textAlign: 'center',
                mt: '3rem'
            }} variant="h5">
                Choose you class
            </Typography>
            <List>
                {['Inbox', 'Starred', 'Send Mail', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    )

    return (
        <div>
            <IconButton
                onClick={() => toggleDrawer(true)}
                sx={{
                    position: "absolute",
                    top: '20%',
                    left: '10%',
                }}
            >
                <MenuIcon
                    sx={{
                        transition: 'transform 0.3s ease',
                        transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                    }}
                />
            </IconButton>
            <Drawer open={open} onClose={() => toggleDrawer(false)}>{DrawerList}</Drawer>
        </div>
    )
}

export default SideBar;