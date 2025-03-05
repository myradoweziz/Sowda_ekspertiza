import { request } from './generic.api'

//SendEmail
export const sendMail = ({ data }) => request({ url: 'user/send-email', data })

export const GET_GALLERY = () => request({ url: 'user/get-gallery', method: 'get' })
export const GET_PARTNERS = () => request({ url: 'user/get-partner', method: 'get' })

//Cities
export const getCities = () => request({ url: 'user/get-cities', method: 'get', file: true })
export const getShygar = () => request({ url: 'user/get-logo', method: 'get', file: true })
export const getMainNews = () => request({ url: 'user/get-main-news', method: 'get', file: true })

//News
export const getNews = ({ data }) =>
	request({ url: `user/get-news/?l=${data.l}&p=${data.p}`, method: 'get', file: true })
export const getNewsId = ({ data }) => request({ url: `user/get-news-id/${data.id}`, method: 'get', file: true })
export const getMainNewsId = ({ data }) => request({ url: `user/main-news/${data.id}`, method: 'get', file: true })

//AboutUs
export const getAboutUs = () => request({ url: `user/get-about_us`, method: 'get', file: true })

//Slider
export const getSlider = () => request({ url: 'user/get-slider', method: 'get', file: true })
export const getBanner = () => request({ url: 'user/get-banner', method: 'get', file: true })

//Services
export const getServices = () => request({ url: `user/get-services`, method: 'get', file: true })
export const getServicesId = ({ data }) =>
	request({ url: `user/get-services-id/${data.id}`, method: 'get', file: true })

//Documents
export const getDocuments = ({ data }) =>
	request({ url: `user/get-documents?l=${data.l}&p=${data.p}`, method: 'get', file: true })

//OrdersList
export const getOrderList = ({ data }) =>
	request({ url: `user/get-orders?v=${data.v}&e=${data.e}`, method: 'get', file: true })
//Order-Budget
export const getOrderBudget = ({ data }) =>
	request({ url: `user/get-orders?v=${data.v}&e=${data.e}&b=${data.b}`, method: 'get', file: true })

//Commutes
export const getCommutes = ({ data }) => request({ url: `user/get-commutes/${data.uuid}`, method: 'get', file: true })

//Orders
export const getOrders = () => request({ url: 'user/get-order-main', method: 'get', file: true })

//Companies
export const getCompanies = ({ data }) =>
	request({ url: `user/get-enterprises/${data.uuid}`, method: 'get', file: true })

//Contacts
export const getContacts = ({ data }) => request({ url: `user/get-contact/${data.uuid}`, method: 'get', file: true })

//SendTruck
export const sendTruckMail = ({ data }) => request({ url: 'user/orders-truck-entity', data })
//
export const sendBusMail = ({ data }) => request({ url: 'user/orders-bus-entity', data })

//OrdersPerson Send sms
export const sendBusPerson = ({ data }) => request({ url: `user/orders-bus-person?amount=${data.amount}`, data })
//Send truck Person
export const sendTruckPerson = ({ data }) => request({ url: `user/orders-truck-person?amount=${data.amount}`, data })
//GetOrderIdBySendPaymentMessage
export const SEND_PAYMENT_MESSAGE = ({ data }) => request({ url: `client/pay-res`, data })
