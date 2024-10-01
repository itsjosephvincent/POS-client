import { usePageStore } from '~/stores/page'
import { useUserStore } from '~/stores/user'

const pageData = {
    index: {
        SuperAdmin: 'Dashboard',
        Admin: 'Dashboard',
        Manager: 'Dashboard',
        Cashier: 'POS',
    },
}

export const useSetPage = (currentPage: string) => {
    const pageStore = usePageStore()
    const page = computed(() => pageStore.getPage)
    const userStore = useUserStore()
    onMounted(() => {
        pageStore.setPage({ name: pageData[currentPage], title: pageData[currentPage][userStore.getRole] })
    })
    return { page }
}

export const usePage = () => {

    const pageStore = usePageStore()
    const title = computed(() => pageStore.getPage && pageStore.getPage.title ? pageStore.getPage.title : '')
    return { title }
}
