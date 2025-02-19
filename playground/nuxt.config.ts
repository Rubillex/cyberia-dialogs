export default defineNuxtConfig({
    modules: ['../src/module'],
    cyberiaDialogs: {
        components: {
            customModal: '~/components/CustomModal.vue',
        },
    },
    devtools: { enabled: true },
    compatibilityDate: '2025-02-18',
});
