import {deviceEnquire} from '@/utils/device'

export default {

    mounted() {
        const {$store} = this

        let response = (deviceType) => {
            switch (deviceType) {
                case 'desktop':
                    $store.dispatch('framework/setDevice', 'desktop')
                    break

                case 'tablet':
                    $store.dispatch('framework/setDevice', 'tablet')
                    break

                case 'mobile':
                    $store.dispatch('framework/setDevice', 'mobile')
                    break

                default:
                    $store.dispatch('framework/setDevice', undefined)
                    break
            }
        }

        deviceEnquire(deviceType => response(deviceType))
    }

}