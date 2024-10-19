import { runningBillService } from '~/api/cashier/RunningBillService';
import type { BillingProduct } from '~/common/types';

export default function () {
    function fetch(params: any) {
        return new Promise<Array<BillingProduct>>((resolve, reject) => {
            runningBillService
                .fetch(params)
                .then((response) => {
                    if (!response.data) reject('Data not fetched');
                    resolve(response.data);
                })
                .catch((error) => reject(error));
        });
    }
    return { fetch };
}
