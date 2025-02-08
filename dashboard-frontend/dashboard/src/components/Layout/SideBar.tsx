import { AppBarProps, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SpeedDial, SpeedDialAction, styled, Toolbar, useMediaQuery } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MuiAppBar from '@mui/material/AppBar';
import Dashboard from "../../Pages/Dashboard";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useThemeContext } from "./ThemeProvider";
import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';
import Temperature from "../../Pages/Temperature";

interface SideBarProps {
  onActionClick: (component: React.ReactNode) => void;
}

const drawerWidth = 240;

export default function SideBar(props: SideBarProps) {
  const [selectedIcon, setSelectedIcon] = React.useState<React.ReactNode>(<DashboardIcon />);
  const [open, setOpen] = React.useState(false);
  const { isDarkMode, toggleTheme } = useThemeContext();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const actions = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      component: <Dashboard />,
    },
    {
      name: "Temperature",
      icon: <DeviceThermostatIcon />,
      component: <Temperature />,
    },
  ];

  const isMobile = useMediaQuery("(max-width:600px)");

  if(isMobile) {
    return (
      <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={selectedIcon}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              props.onActionClick(action.component)
              setSelectedIcon(action.icon)
            }}
          />
        ))}
        <SpeedDialAction
            key="Theme"
            icon={isDarkMode ? <NightsStayIcon /> : <LightModeIcon />}
            tooltipTitle="Theme"
            onClick={toggleTheme}
          />
      </SpeedDial>
      </>
    );
  }else{
    return (
      <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
          color="inherit"
            onClick={toggleTheme}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              
            ]}
          >
            {isDarkMode ? <NightsStayIcon /> : <LightModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {actions.map((act) => (
            <ListItem key={act.name} disablePadding>
              <ListItemButton onClick={() => props.onActionClick(act.component)}>
                <ListItemIcon>
                  {act.icon}
                </ListItemIcon>
                <ListItemText primary={act.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
    );
  }
}


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }: { open: boolean }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));