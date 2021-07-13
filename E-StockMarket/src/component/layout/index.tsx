import React from 'react';
import { connect } from 'react-redux';
import {
	alpha,
	makeStyles,
	Theme,
	createStyles,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Person from '@material-ui/icons/Person';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Add from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import ExitToApp from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Logout from '../../auth/Logout';
import {
	Fab,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Drawer,
} from '@material-ui/core';
import clsx from 'clsx';
import { selectedCompany } from '../../actions';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		grow: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			display: 'none',
			[theme.breakpoints.up('sm')]: {
				display: 'block',
			},
			cursor: 'pointer',
		},
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: alpha(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: alpha(theme.palette.common.white, 0.25),
			},
			marginRight: theme.spacing(2),
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(3),
				width: 'auto',
			},
		},
		pageHeaderRoot: {
			padding: theme.spacing(0, 2),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexGrow: 1,
		},
		inputRoot: {
			color: 'inherit',
		},
		pageHeader: {
			padding: theme.spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('md')]: {
				width: '100%',
			},
			display: 'flex',
			justifyContent: 'center',
			fontSize: '1.5rem',
		},
		sectionDesktop: {
			display: 'none',
			[theme.breakpoints.up('md')]: {
				display: 'flex',
			},
		},
		sectionMobile: {
			display: 'flex',
			[theme.breakpoints.up('md')]: {
				display: 'none',
			},
		},
		list: {
			width: 250,
		},
		fullList: {
			width: 'auto',
		},
		navigationBar: {
			'MuiToolbar-regular': {
				[theme.breakpoints.up('md')]: {
					minHeight: '50px',
				},
			},
		},
		iconText: {
			fontSize: '1.25rem',
		},
	})
);

function Layout(props: any) {
	const {
		children,
		props: { history },
	} = props;
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [
		mobileMoreAnchorEl,
		setMobileMoreAnchorEl,
	] = React.useState<null | HTMLElement>(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const [state, setState] = React.useState({
		left: false,
	});
	const toggleDrawer = (anchor: string, open: boolean) => (
		event: React.KeyboardEvent | React.MouseEvent
	) => {
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor: string) => (
		<div
			className={clsx(classes.list)}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{['Stock Details', 'Company List'].map((text, index) => (
					<ListItem
						button
						key={text}
						onClick={
							text === 'Company List' ? navigateHome : navigateStockDetails
						}
					>
						<ListItemIcon>
							{text === 'Company List' ? <ListIcon /> : <Add />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['Profile', 'Sign Out'].map((text, index) => (
					<ListItem
						button
						key={text}
						onClick={
							text === 'Sign Out' ? signOut : toggleDrawer('left', false)
						}
					>
						<ListItemIcon>
							{text === 'Profile' ? <Person /> : <ExitToApp />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const signOut = () => {
		Logout(history);
	};

	const navigateHome = () => {
		history.push('/Home');
	};

	const navigateAddCompany = () => {
		props.selectedCompany(null);
		history.push('/Add');
	};

	const navigateStockDetails = () => {
		props.selectedCompany(null);
		history.push('/StockDetails');
	};

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>
				<Person /> Profile
			</MenuItem>
			<MenuItem onClick={signOut}>
				<ExitToApp />
				Sign Out
			</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem onClick={navigateAddCompany}>
				<IconButton aria-label='show 5 new notifications' color='inherit'>
					<Badge badgeContent={5} color='secondary'>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
			<MenuItem onClick={signOut}>
				<IconButton
					edge='end'
					aria-label='account of current user'
					aria-controls='signOut'
					aria-haspopup='true'
					color='inherit'
				>
					<ExitToApp />
				</IconButton>
				<p>Sign Out</p>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar className={classes.navigationBar} position='static'>
				<Toolbar>
					<IconButton
						onClick={toggleDrawer('left', true)}
						edge='start'
						className={classes.menuButton}
						color='inherit'
						aria-label='open drawer'
					>
						<MenuIcon />
					</IconButton>
					<Typography
						className={classes.title}
						variant='h5'
						noWrap
						onClick={navigateHome}
					>
						E-STOCK MARKET
					</Typography>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<IconButton
							aria-label='add company'
							color='inherit'
							onClick={navigateAddCompany}
							className={classes.iconText}
						>
							ADD COMPANY
						</IconButton>
						<IconButton aria-label='show 5 new notifications' color='inherit'>
							<Badge badgeContent={5} color='secondary'>
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<Fab
							color='secondary'
							aria-label='add'
							onClick={handleProfileMenuOpen}
							style={{ height: '40px', width: '40px', marginLeft: '15px' }}
						>
							<h2>A</h2>
						</Fab>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
			{children}
			<Drawer
				anchor={'left'}
				open={state['left']}
				onClose={toggleDrawer('left', false)}
			>
				{list('left')}
			</Drawer>
		</div>
	);
}

export default connect(null, { selectedCompany })(Layout);
