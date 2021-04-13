import enquireJs from 'enquire.js'

// 获取设备类型
export const deviceEnquire = (callback) => {
    const matchDesktop = {
        match: () => {
            callback && callback('desktop')
        }
    }

    const matchTablet = {
        match: () => {
            callback && callback('tablet')
        }
    }

    const matchMobile = {
        match: () => {
            callback && callback('mobile')
        }
    }

    // screen and (max-width: 1087.99px)
    enquireJs.register('screen and (max-width: 576px)', matchMobile)
        .register('screen and (min-width: 576px) and (max-width: 1199px)', matchTablet)
        .register('screen and (min-width: 1200px)', matchDesktop)

}
