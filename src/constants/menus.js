export const menus = [
    { key: '/app/dashboard/index', title: '首页', icon: 'mobile', },
    {
        key: '/app/ui', title: '远方', icon: 'scan',
        sub: [
            { key: '/app/ui/gallery', title: '画廊', icon: '', },
        ],
    },
    {
        key: '/app/draw', title: '订单', icon: 'calendar',
        sub: [
            { key: '/app/order/issueNo', title: '订单调整', icon: '', },
            { key: '/app/order/exception', title: '订单列表', icon: '', },
        ],
    },
];