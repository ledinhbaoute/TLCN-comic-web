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
    title: 'users',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Báo cáo',
    path: '/report',
    icon: icon('ic_report'),
  },
  {
    title: 'Thể loại',
    path: '/genre',
    icon: icon('ic_genre'),
  },
  {
    title: 'Gói premium',
    path: '/package-premium',
    icon: icon('ic_premium'),
  },
  {
    title: 'Giao dịch',
    path: '/transaction',
    icon: icon('ic_transaction'),
  },
  {
    title: 'Giá',
    path: '/price',
    icon: icon('ic_price'),
  },
];
export default navConfig;
