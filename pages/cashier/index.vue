<script setup lang="ts">
import { productService } from '~/components/api/ProductService'

definePageMeta({
    middleware: ['auth', 'cashier'],
    layout: 'pos',
})
const pageStore = usePageStore()
const pageTitle = 'POS'
useHead({
    title: pageTitle,
})

const viewport = useViewport()
const productsData = ref([])
const isLoading = ref(false)

const rowsPerPage = ref(10)
const totalPages = ref(0)
const currentPage = ref(1)

const getRowsPerPage = computed(() => rowsPerPage.value || 10)
const getTotalPages = computed(() => totalPages.value)
const getCurrentPage = computed(() => currentPage.value)

onMounted(() => {
    pageStore.setPage(pageTitle)
    fetch()
})

async function fetch(params: object = {}) {
    try {
        isLoading.value = true
        const response = await productService.all(params)
        isLoading.value = false
        if (response.data) {
            productsData.value = response.data.map((d: object) => {
                if (d.category) {
                    d.category_uuid = d.category.uuid
                    d.category_name = d.category.name
                }
                delete d.category
                return d
            })
            rowsPerPage.value = response.meta.per_page
            totalPages.value = response.meta.last_page
            currentPage.value = response.meta.current_page
        }
    } catch (error) {
        isLoading.value = false
        console.error(error)
    }
}

function previousPageClick() {
    fetch({ page: currentPage.value - 1 })
}
function nextPageClick() {
    fetch({ page: currentPage.value + 1 })
}
function goToPage(page: number) {
    fetch({ page })
}

</script>

<template>
    <div>
        <div class="flex justify-start items-start w-full h-[calc(100vh-75px)] overflow-y-auto overflow-x-hidden p-4">
            <PurchaseList :data-source="productsData" :loading="isLoading" :show-pagination="true" :current-page="getCurrentPage"
            :rows-per-page="getRowsPerPage" :total-pages="getTotalPages" @previous-page="previousPageClick"
            @next-page="nextPageClick" @go-to-page="goToPage" />
            
        </div>
    </div>
</template>