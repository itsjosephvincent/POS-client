import { storeService } from '~/api/superadmin/StoreService';
import type { Store, Admin } from '~/common/types';

export default function (admin: Admin) {
    const route = useRoute();
    function fetch() {
        return new Promise<Store>((resolve, reject) => {
            const params = {
                admin_id: admin.id,
            };
            storeService
                .find(route.params.store_uuid.toString(), params)
                .then((response) => {
                    if (!response.data) reject('Data not fetched');
                    resolve(response.data);
                })
                .catch((error) => reject(error));
        });
    }
    return { fetch };
}
