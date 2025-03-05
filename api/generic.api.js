import axios from 'axios'

const baseURL = 'https://tradinghouse.gov.tm/api/v1'
const fileURL = process.env.IMAGE_URL

export const request = async ({ url, method = 'post', headers = {}, params = {}, data = {}, file = false }) => {
	if (file) {
		2
		const formData = new FormData()
		headers['Accept'] = 'application/json'
		headers['Content-Type'] = 'application/octet-stream'

		if (data?.images?.length) {
			for (let i = 0; i < data.images.length; i++) {
				formData.append('images', data.images[i])
			}
		}

		if (data?.videos?.length) {
			for (let i = 0; i < data.videos.length; i++) {
				formData.append('videos', data.videos[i])
			}

			formData.append('categoryId', data.categoryId)
		} else {
			for (let [key, value] of Object.entries(data)) {
				formData.append(key, value)
			}
		}
		data = formData
	}
	if (typeof window !== 'undefined') {
		if (window.localStorage.getItem('Authorization') !== null) {
			headers['Authorization'] = `Bearer_${window.localStorage.getItem('Authorization')}`
		}
	}

	return axios({
		url: `${baseURL}/${url}`,
		method,
		headers,
		params,
		data
	})
}
