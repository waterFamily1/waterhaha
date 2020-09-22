import { getRouter } from '@api/router';
import createRoutes from '@/libs/router-util'

const data = getRouter()
const otherMenu = createRoutes(data)

export default {
    ...otherMenu
}