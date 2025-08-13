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
import Gifts from "../pages/dashboard/GiftCustomer/GiftCustomers";
import GiftIndex from "../pages/dashboard/GiftCustomer/GiftCustomerIndex/GiftCustomerIndex";
import AddGift from "../pages/dashboard/GiftCustomer/AddGiftCustomer/AddGiftCustomer";
import EditGift from "../pages/dashboard/GiftCustomer/EditGiftCustomer/EditGiftCustomer";
import ShowGift from "../pages/dashboard/GiftCustomer/ShowGiftCustomer/ShowGiftCustomer";
import Works from "../pages/dashboard/work/Works";
import WorkIndex from "../pages/dashboard/work/WorkIndex/WorkIndex";
import AddWork from "../pages/dashboard/work/AddWork/AddWork";
import EditWork from "../pages/dashboard/work/EditWork/EditWork";
import Hobbies from "../pages/dashboard/hobby/Hobbies";
import HobbyIndex from "../pages/dashboard/hobby/HobbyIndex/HobbyIndex";
import AddHobby from "../pages/dashboard/hobby/AddHobby/AddHobby";
import EditHobby from "../pages/dashboard/hobby/EditHobby/EditHobby";
import AddEducation from "../pages/dashboard/education/AddEducation/AddEducation";
import Educations from "../pages/dashboard/education/Educations";
import EducationIndex from "../pages/dashboard/education/EducationIndex/EducationIndex";
import EditEducation from "../pages/dashboard/education/EditEducation/EditEducation";
import Giftss from "../pages/dashboard/gifts/Gifts";
import GiftsIndex from "../pages/dashboard/gifts/GiftsIndex/GiftsIndex";
import AddGifts from "../pages/dashboard/gifts/AddGifts/AddGifts";
import EditGifts from "../pages/dashboard/gifts/EditGifts/EditGifts";


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
                path: 'giftCustomer',
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
            },
            {
                path: 'work',
                element: <Works />,
                children: [
                    {
                        path: '',
                        element: <WorkIndex />
                    },
                    {
                        path: 'add',
                        element: <AddWork />
                    },
                    {
                        path: 'edit/:id',
                        element: <EditWork />
                    }
                ]
            },
            {
                path: 'hobby',
                element: <Hobbies />,
                children: [
                    {
                        path: '',
                        element: <HobbyIndex />
                    },
                    {
                        path: 'add',
                        element: <AddHobby />
                    },
                    {
                        path: 'edit/:id',
                        element: <EditHobby />
                    }
                ]
            },
            {
                path: 'education',
                element: <Educations />,
                children: [
                    {
                        path: '',
                        element: <EducationIndex />
                    },
                    {
                        path: 'add',
                        element: <AddEducation />
                    },
                    {
                        path: 'edit/:id',
                        element: <EditEducation />
                    }
                ]
            },
            {
                path: 'gifts',
                element: <Giftss />,
                children: [
                    {
                        path: '',
                        element: <GiftsIndex />
                    },
                    {
                        path: 'add',
                        element: <AddGifts />
                    },
                    {
                        path: 'edit/:id',
                        element: <EditGifts />
                    }
                ]
            },
        ]
    }
]);