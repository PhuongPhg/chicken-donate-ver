import { ECategoryTypes } from 'types/organisation';

export const PRICE_OF_EACH_EGG = 0.0001;
export const PRICE_FOR_CREATING_ACCOUNT = 0.001;

export const CATEGORY_LIST = [
  { title: 'Charity', value: ECategoryTypes.CHARITY },
  { title: 'Video Creators', value: ECategoryTypes.VIDEO_CREATORS },
  { title: 'Artist', value: ECategoryTypes.ARTIST },
  { title: 'Youtuber', value: ECategoryTypes.YOUTUBER },
  { title: 'Podcasters', value: ECategoryTypes.GAMING },
  { title: 'Video Creators', value: ECategoryTypes.PODCASTERS },
];

export const WEBSITE_DOMAIN = 'chicken-donate-twd.netlify.app/';

export const WEBSITE_PROFILE_DOMAIN = WEBSITE_DOMAIN + 'profile/';
