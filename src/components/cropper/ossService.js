import axios from '@/axios'
import Axios from 'axios'

const getPolicy = () => axios({url: '/oss/policy', method: 'GET'})

const upload = (host, data) => Axios.post(host, data, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

const uploadFile = () => {

}

const uploadBlobFile = async (blob, {fileName, fileType, lastModified}) => {
    // 获取policy
    const policyData = await getPolicy()
    const {accessid, policy, signature, dir, host, callback} = policyData
    // 组装FormData
    const formData = new FormData()
    formData.append("policy", policy)
    formData.append("OSSAccessKeyId", accessid)
    formData.append("signature", signature)
    formData.append("dir", dir)
    formData.append("success_action_status", "200")
    formData.append("callback", callback)

    formData.append("key", dir + fileName) // 文件名
    const file = new File([blob], fileName, {type: fileType, lastModified}) // blob转file
    formData.append('file', file)

    const {status, data} = await upload(host, formData)

    if (status !== 200) {
        throw new Error(data.message)
    } else {
        return new Promise(resolve => resolve(data.url))
    }

}

export default {
    uploadFile, uploadBlobFile
}