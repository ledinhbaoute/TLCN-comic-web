import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'report',
    path: '/report',
    icon: icon('ic_report'),
  },
  {
    title: 'Genre',
    path: '/genre',
    icon: icon('ic_genre'),
  },
  {
    title: 'Package Premium',
    path: '/package-premium',
    icon: icon('ic_premium'),
  },
  {
    title: 'Transaction',
    path: '/transaction',
    icon: icon('ic_premium'),
  },
];
export default navConfig;
