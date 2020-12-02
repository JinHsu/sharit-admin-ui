import {deviceEnquire} from '@/utils/device'

export default {

    mounted() {
        const {$store} = this

        let response = (deviceType) => {
            switch (deviceType) {
                case 'desktop':
                    $store.dispatch('app/setDevice', 'desktop')
                    break

                case 'tablet':
                    $store.dispatch('app/setDevice', 'tablet')
                    break

                case 'mobile':
                    $store.dispatch('app/setDevice', 'mobile')
                    break

                default:
                    $store.dispatch('app/setDevice', undefined)
                    break
            }
        }

        deviceEnquire(deviceType => response(deviceType))
    }

}