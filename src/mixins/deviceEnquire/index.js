import {deviceEnquire} from '@/utils/device'

export default {

    mounted() {
        const {$store} = this

        let response = (deviceType) => {
            switch (deviceType) {
                case 'desktop':
                    $store.dispatch('frame/setDevice', 'desktop')
                    break

                case 'tablet':
                    $store.dispatch('frame/setDevice', 'tablet')
                    break

                case 'mobile':
                    $store.dispatch('frame/setDevice', 'mobile')
                    break

                default:
                    $store.dispatch('frame/setDevice', undefined)
                    break
            }
        }

        deviceEnquire(deviceType => response(deviceType))
    }

}