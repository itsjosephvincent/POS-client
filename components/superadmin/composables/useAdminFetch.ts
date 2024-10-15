import { adminService } from '~/api/superadmin/AdminService';
import type { Admin } from '~/common/types';

export default function () {
    const route = useRoute();
    function fetch() {
        return new Promise<Admin>((resolve, reject) => {
            const params = {};
            adminService
                .find(route.params.uuid.toString(), params)
                .then((response) => {
                    if (!response.data) reject('Data not fetched');
                    resolve(response.data);
                })
                .catch((error) => reject(error));
        });
    }
    return { fetch };
}
