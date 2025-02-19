<template>
    <Teleport to="#teleports">
        <div class="dialogs">
            <component
                v-for="dialogState in openDialogs"
                :key="dialogState.id"
                :class="['dialog', { shown: dialogState.shown }]"
                :is="dialogState.component"
                :state="dialogState"
            />
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { useCyberiaDialogs } from '../composables/useCyberiaDialogs';

const { openDialogs, isAnyOpen } = useCyberiaDialogs();

watch(isAnyOpen, (value) => {
    if (value) {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollBarWidth}px`;
        document.body.classList.add('unscrollable');
    } else {
        document.body.style.paddingRight = `0`;
        document.body.classList.remove('unscrollable');
    }
});

const onKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 27 && isAnyOpen()) openDialogs.value[openDialogs.value.length - 1].close(null);
};

onMounted(() => {
    document.addEventListener('keydown', onKeyDown);
});

onUnmounted(() => {
    document.removeEventListener('keydown', onKeyDown);
});
</script>

<style scoped>
.dialog {
    transition: var(--cyberia-dialogs-transition);
    opacity: 0;
}

.dialog.shown {
    opacity: 1;
}
</style>
