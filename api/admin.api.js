import { request } from './generic.api'

//Login
export const login = ({ data }) => request({ url: 'admin/admin-login', data })

//Cities
export const getCities = () => request({ url: 'admin/get-cities', method: 'get', file: true })

export const GET_GALLERY = () => request({ url: 'admin/gallery', method: 'get', file: true })
export const ADD_GALLERY = ({ data }) => request({ url: 'admin/gallery', data, file: true })
export const REMOVE_GALLERY = ({ data }) => request({ url: 'admin/gallery', data, method: 'delete' })

export const GET_PARTNERS = () => request({ url: 'admin/partner', method: 'get', file: true })
export const ADD_PARTNERS = ({ data }) => request({ url: 'admin/partner', data, file: true })
export const REMOVE_PARTNERS = ({ data }) => request({ url: 'admin/partner', data, method: 'delete' })

//Sliders
export const getSlider = () => request({ url: 'admin/slider', method: 'get', file: true })
export const addSlider = ({ data }) => request({ url: 'admin/slider', data, file: true })
export const deleteSlider = ({ data }) => request({ url: 'admin/slider', method: 'delete', data })

export const addLogo = ({ data }) => request({ url: 'admin/logo', data, file: true })
export const getLogo = () => request({ url: 'admin/logo', method: 'GET', file: true })
export const deleteLogo = ({ data }) => request({ url: 'admin/logo', data, method: 'delete' })

export const addBanner = ({ data }) => request({ url: 'admin/banner', data, file: true })
export const getBanner = () => request({ url: 'admin/banner', method: 'GET', file: true })
export const deleteBanner = ({ data }) => request({ url: 'admin/banner', data, method: 'delete' })

//About-us
export const getAboutUs = () => request({ url: 'admin/get-about_us', method: 'get', file: true })
export const addAboutUs = ({ data }) => request({ url: 'admin/add-about_us', data, file: true })
export const deleteAboutUs = ({ data }) => request({ url: 'admin/delete-about_us', data })

export const getMainNews = () => request({ url: 'admin/main-news', method: 'get', file: true })
export const addMainNews = ({ data }) => request({ url: 'admin/main-news', data, file: true })
export const deleteMainNews = ({ data }) => request({ url: 'admin/main-news', method: 'delete', data })

//Services
export const getServices = () => request({ url: `admin/get-services`, method: 'get' })
export const addServices = ({ data }) => request({ url: 'admin/add-services', data })
export const deleteServices = ({ data }) => request({ url: 'admin/delete-services', data })

//Laws
export const getLaws = ({ data }) => request({ url: `admin/get-documents?l=${data.l}&p=${data.p}`, method: 'get' })
export const addLaws = ({ data }) => request({ url: 'admin/add-documents', data, file: true })
export const deleteLaws = ({ data }) => request({ url: 'admin/delete-documents', data })

//News
export const getNews = ({ data }) => request({ url: `admin/get-news?l=${data.l}&p=${data.p}`, method: 'get' })
export const addNews = ({ data }) => request({ url: 'admin/add-news', data, file: true })
export const deleteNews = ({ data }) => request({ url: 'admin/delete-news', data })

//Travelers
export const getTravelers = ({ data }) =>
	request({ url: `admin/get-commutes/${data.uuid}?l=${data.l}&p=${data.p}`, method: 'get' })
export const addTravelers = ({ data }) => request({ url: 'admin/add-commutes', data })
export const deleteTravelers = ({ data }) => request({ url: 'admin/delete-commutes', data })

//Enterprices
export const getEnterprices = ({ data }) =>
	request({ url: `admin/get-enterprises/${data.uuid}`, method: 'get', file: true })
export const addEnterprices = ({ data }) => request({ url: 'admin/add-enterprises', data, file: true })
export const deleteEnterprices = ({ data }) => request({ url: 'admin/delete-enterprises', data })

//Contacts
export const getContacts = ({ data }) => request({ url: `admin/get-contact/${data.uuid}`, method: 'get', file: true })
export const addContacts = ({ data }) => request({ url: 'admin/add-contact', data })
export const deleteContacts = ({ data }) => request({ url: 'admin/delete-contact', data })

//Orders
export const getOrders = () => request({ url: 'admin/get-order-main', method: 'get', file: true })
export const addOrders = ({ data }) => request({ url: 'admin/add-order-main', data, file: true })
export const deleteOrders = ({ data }) => request({ url: 'admin/delete-order-main', data })

//ContactLists
export const getContactList = ({ data }) =>
	request({ url: `admin/get-contact-list/${data.uuid}?l=${data.l}&p=${data.p}`, method: 'get', file: true })

//ToOrders
export const getToTruckOrders = ({ data }) =>
	request({
		url: `admin/get-order-list-truck?l=${data.l}&p=${data.p}`,
		method: 'get',
		file: true
	})
export const getToBusOrders = ({ data }) =>
	request({
		url: `admin/get-order-list-bus?l=${data.l}&p=${data.p}`,
		method: 'get',
		file: true
	})
