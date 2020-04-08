export const topMenu = [
	{ link: '/admin', label: 'Admin', icon: 'palette' },
	{ link: '/dashboard', label: 'Dashboard', icon: 'format_paint' }
];

export const sideMenuOne = [
	{ link: '/home', label: 'Home', icon: 'home' },
	{ link: '/trendings', label: 'Trending', icon: 'whatshot' },
	{ link: '/subscriptions', label: 'Subscriptions', icon: 'subscriptions' },
	...topMenu
];

export const sideMenuTwo = [
	{ link: '/about', label: 'About', icon: 'info' },
	{ link: '/settings', label: 'Settings', icon: 'settings' }
];

export const menuAdmin = [
	{ link: '/blogs', label: 'My Blogs', icon: 'home', isMobile: true },
	{ link: '/admin', label: 'Gallery', icon: 'whatshot', isMobile: true },
	{ link: '/videos', label: 'Videos', icon: 'account_circle', isMobile: false },
	{
		link: '/collections',
		label: 'Collections',
		icon: 'subscriptions',
		isMobile: true
	},
	{
		link: '/categories',
		label: 'Categories',
		icon: 'format_paint',
		isMobile: false
	},
	{ link: '/comments', label: 'Comments', icon: 'view_stream', isMobile: true },
	{ link: '/statistics', label: 'Statistics', icon: 'menu', isMobile: false },
	{ link: '/trash', label: 'Trash', icon: 'settings', isMobile: false }
];

// TODO: Only show when small device
// blogs gallery collections comments
