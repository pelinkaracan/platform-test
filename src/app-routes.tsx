import { HomePage, TasksPage, ProfilePage, OrderPage, AnalyticsDashboard } from './pages';
import { CompletedOrder } from './reports';
import { withNavigationWatcher } from './contexts/navigation';

const routes = [
    {
        path: '/tasks',
        element: TasksPage
    },
    {
        path: '/profile',
        element: ProfilePage
    },
    {
        path: '/home',
        element: HomePage
    },
    {
        path: '/orderList',
        element: OrderPage
    },
    {
        path: '/completedOrder',
        element: CompletedOrder
    },
    {
        path: '/dashboard',
        element: AnalyticsDashboard
    }
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
