import axios from '@/axios'
import Axios from 'axios'

const getPolicy = () => axios({url: '/oss/policy', method: 'GET'})

const upload = (host, data) => Axios.post(host, data, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

export default {
    getPolicy, upload
}