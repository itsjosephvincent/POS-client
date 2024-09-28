import { usePageStore } from '~/stores/page.js'

export const useSetPage = () => {
    const pageStore = usePageStore()
    const page = computed(() => pageStore.getPage)
    onMounted(() => {
        pageStore.setPage({ name: 'dashboard', title: 'Super Admin' })
    })
    return { page }
}

export const usePage = () => {

    const pageStore = usePageStore()
    const title = computed(() => pageStore.getPage && pageStore.getPage.title ? pageStore.getPage.title : '')
    return { title }
}
