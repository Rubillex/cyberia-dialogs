import { useMetaDialogs, type MetaDialogState } from './meta/useMetaDialogs';
import { resolve } from 'path';

import type { Dialogs } from '~/dialogs';

export type DialogState<Name extends keyof Dialogs> = MetaDialogState<Dialogs, Name>;

export const useCyberiaDialogs = () => {
    const config = useRuntimeConfig();
    const nuxtApp = useNuxtApp();
    console.log('nuxtApp.options', nuxtApp.options);
    const components = Object.fromEntries(
        // @ts-ignore
        Object.entries(config.public.cyberiaDialogs.components || {}).map(([key, componentPath]: [any, string]) => {
            if (componentPath.startsWith('~/')) {
                // Получаем srcDir (или rootDir, если компонентов там)
                const srcDir = nuxtApp.options.srcDir;
                // Заменяем '~/'' на абсолютный путь
                componentPath = resolve(srcDir, componentPath.slice(2));
            }

            return [key, defineAsyncComponent(() => import(/* @vite-ignore */ componentPath as string))];
        }),
    );

    return useMetaDialogs<Dialogs>({
        components,
        fadeInDelay: 100,
        fadeOutDelay: 300,
    });
};
