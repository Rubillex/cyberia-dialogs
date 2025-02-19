<template>
    <div>
        <div>
            Nuxt module playground!
            <button @click="useCyberiaDialogs().open('customModal')">Открыть модалку</button>
        </div>

        <CyberiaDialogsModal />
    </div>
</template>

<script setup lang="ts">
const { openDialogs, isAnyOpen } = useCyberiaDialogs();
</script>
