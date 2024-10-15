import { adminService } from '~/api/superadmin/AdminService';
import type { Admin } from '~/common/types';

export default function () {
    const route = useRoute();
    const adminData: Ref<Admin | null> = ref(null);
    const pageStore = usePageStore();

    watchEffect(async () => {
        try {
            adminData.value = null;
            let params = {};
            const response = await adminService.find(route.params.uuid, params);
            if (response && response.data) {
                adminData.value = response.data;
                pageStore.setParams([
                    `${response.data.firstname} ${response.data.lastname}`,
                ]);
            } else {
                throw 'Empty data.';
            }
        } catch (error) {
            console.error(error);
        }
    });

    return { adminData };
}
