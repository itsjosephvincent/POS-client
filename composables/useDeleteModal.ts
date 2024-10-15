export default function () {
    const deleteLoading = ref(false);
    const showDeleteModal = ref(false);

    function clickDelete() {
        showDeleteModal.value = true;
    }
    function closeDeleteModal() {
        showDeleteModal.value = false;
    }
    async function handleDelete(callback: Promise<any>) {
        return new Promise((resolve, reject) => {
            closeDeleteModal();
            deleteLoading.value = true;
            callback
                .then(() => {
                    deleteLoading.value = false;
                    resolve(true);
                })
                .catch((error) => {
                    deleteLoading.value = false;
                    reject(error);
                });
        });
    }

    return {
        deleteLoading,
        showDeleteModal,
        clickDelete,
        closeDeleteModal,
        handleDelete,
    };
}
