import { createHashRouter } from "react-router-dom";
import AddInfo from "../pages/AddInfo/AddInfo";
import Error from "../pages/Error/Error";
import Login from "../pages/Login/Login";
import Items from "../pages/dashboard/Items";
import CustomerIndex from "../pages/dashboard/customer/CustomerIndex/CustomerIndex";
import AddCustomer from "../pages/dashboard/customer/AddCustomer/AddCustomer";
import EditCustomer from "../pages/dashboard/customer/EditCustomer/EditCustomer";
import ShowCustomer from "../pages/dashboard/customer/ShowCustomer/ShowCustomer";
import Customers from "../pages/dashboard/customer/Customers";
import Areas from "../pages/dashboard/area/Areas";
import AreaIndex from "../pages/dashboard/area/AreaIndex/AreaIndex";
import AddArea from "../pages/dashboard/area/AddArea/AddArea";
import EditArea from "../pages/dashboard/area/EditArea/EditArea";
import ShowArea from "../pages/dashboard/area/ShowArea/ShowArea";
import Gifts from "../pages/dashboard/Gift/Gifts";
import GiftIndex from "../pages/dashboard/Gift/GiftIndex/GiftIndex";
import AddGift from "../pages/dashboard/Gift/AddGift/AddGift";
import EditGift from "../pages/dashboard/Gift/EditGift/EditGift";
import ShowGift from "../pages/dashboard/Gift/ShowGift/ShowGift";


export const routers = createHashRouter([
    {
        path: '/',
        element: <AddInfo />,
        errorElement: <Error />,
    },
    {
        path: '/auth',
        element: <Login />,
        errorElement: <Error />
    },
    {
        path: '/admin',
        element: <Items />,
        errorElement: <Error />,
        children: [
            {
                path: 'area',
                element: <Areas />,
                children: [
                    {
                        path: '',
                        element: <AreaIndex />
                    },
                    {
                        path: 'add',
                        element: <AddArea />
                    },
                    {
                        path: 'edit/:id',
                        element: <EditArea />
                    },
                    {
                        path: 'show/:id',
                        element: <ShowArea />
                    }
                ]
            },
            {
                path: 'customer',
                element: <Customers />,
                children: [
                    {
                        path: '',
                        element: <CustomerIndex />
                    },
                    {
                        path: 'add',
                        element: <AddCustomer />
                    },
                    {
                        path: 'edit/:id',
                        element: <EditCustomer />
                    },
                    {
                        path: 'show/:id',
                        element: <ShowCustomer />
                    }
                ]
            },
            {
                path: 'gift',
                element: <Gifts />,
                children: [
                    {
                        path: '',
                        element: <GiftIndex />
                    },
                    {
                        path: 'add',
                        element: <AddGift />
                    },
                    {
                        path: 'edit/:id',
                        element: <EditGift />
                    },
                    {
                        path: 'show/:id',
                        element: <ShowGift />
                    }
                ]
            }
        ]
    }
]);