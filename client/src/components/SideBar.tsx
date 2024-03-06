import {
    Box,
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    IconButton,

} from "@mui/material";

import '../index.css'

import MenuIcon from '@mui/icons-material/Menu';

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import WideLogo from "./shared/WideLogo";
import { getClasses } from "../helpers/api-communicator";
import { Classes } from "../interfaces/Classes";

interface SideBarProps {
    onSelectClass: (selectedClass: Classes) => void;
}

const SideBar = ({ onSelectClass }: SideBarProps) => {
    const [open, setOpen] = useState(false);

    const { isPending, error, data } = useQuery({
        queryKey: ['classes'],
        queryFn: () => getClasses(),
        enabled: open
    });

    const toggleDrawer = (newOpen: boolean) => {
        setOpen(newOpen);
    }

    const handleClassSelection = (_class: Classes) => {
        onSelectClass(_class);
        toggleDrawer(false);
    }

    const DrawerList = (
        <Box sx={{ width: 400 }} role='presentation' onClick={() => toggleDrawer(false)}>
            <WideLogo />
            <Typography sx={{
                textAlign: 'center',
                mt: '3rem'
            }} variant="h5">
                Choose your class
            </Typography>
            {isPending && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            <List>
                {data?.map((_class: Classes) => (
                    <ListItem key={_class.course_id} disablePadding>
                        <ListItemButton
                            sx={{
                                display: "flex",
                                justifyContent: "space-around"
                            }}
                            onClick={() => handleClassSelection(_class)}
                        >
                            <ListItemText primary={_class.course_id} />
                            <ListItemText primary={_class.course_name} />
                            <ListItemText primary={_class.semsec} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box >
    )

    return (
        <div>
            <IconButton
                onClick={() => toggleDrawer(true)}
                sx={{
                    position: "absolute",
                    top: '20%',
                    left: '10%',
                    // opacity: 0
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