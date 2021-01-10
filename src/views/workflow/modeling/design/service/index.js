import axios from '@/axios'

const baseUrl = '/sys/flow'

export default {

    deploy: (data) => axios({
        url: `${baseUrl}/deploy`,
        method: 'POST',
        data
    })

}