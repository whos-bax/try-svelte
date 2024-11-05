export type ListItemType = {
	id: string;
	label: string;
	link: string;
	children?: ListItemType[];
};

const storageTabs: ListItemType[] = [
	{
		id: 'storage/info',
		label: '내 스토리지 현황',
		link: '/storage/info'
	},
	{
		id: 'storage',
		label: '파일 보관함',
		link: '/storage'
	},
	{
		id: 'storage/views',
		label: '미리보기',
		link: '/storage/views'
	}
];

const userPopupList: ListItemType[] = [
	{ id: 'mypage', label: '프로필 관리', link: '/mypage' },
	{ id: 'subscribe', label: '구독 관리', link: '/mypage/subscribe' },
	{ id: 'logout', label: '로그아웃', link: '' }
];

export const mainList: ListItemType[] = [
	{
		id: 'project',
		label: '프로젝트',
		link: '/project',
		children: []
	},
	{
		id: 'storage',
		label: '스토리지',
		link: '',
		children: storageTabs
	},
	{
		id: 'mypage',
		label: '설정',
		link: '',
		children: userPopupList
	}
];

export const subList: ListItemType[] = [
	{
		id: 'tech-blog',
		label: '기술 블로그',
		link: 'https://tech.tensorcube.net',
		children: []
	},
	{
		id: 'community',
		label: '커뮤니티',
		link: '',
		children: []
	},
	{
		id: 'cs-center',
		label: '고객센터',
		link: '',
		children: []
	}
];
