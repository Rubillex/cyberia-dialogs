import { defineNuxtModule, createResolver, addComponent, addImports } from '@nuxt/kit';
import { fileURLToPath } from 'node:url';
import { resolve } from 'path';

export interface CyberiaDialogsOptions {
    components?: Record<string, string>;
}

export default defineNuxtModule<CyberiaDialogsOptions>({
    meta: {
        name: 'cyberia-dialogs',
        configKey: 'cyberiaDialogs',
        compatibility: {
            nuxt: '^3.0.0',
        },
    },
    defaults: {
        components: {},
    },
    setup(_options, _nuxt) {
        if (!_nuxt.options.runtimeConfig) {
            _nuxt.options.runtimeConfig = {
                // @ts-ignore
                app: {},
                // @ts-ignore
                public: {},
            };
        }
        // @ts-ignore
        if (!_nuxt.options.runtimeConfig.public) _nuxt.options.runtimeConfig.public = {};

        _nuxt.options.runtimeConfig.public.cyberiaDialogs = _options;

        const resolver = createResolver(import.meta.url);

        const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url));
        _nuxt.options.build.transpile.push(runtimeDir);

        addComponent({
            name: 'CyberiaDialogsModal',
            filePath: resolve(__dirname, 'runtime/components/CyberiaDialogsModal.vue'),
        });

        addImports({
            name: 'useCyberiaDialogs',
            as: 'useCyberiaDialogs',
            from: resolver.resolve('runtime/composables/useCyberiaDialogs'),
        });

        _nuxt.hook('imports:dirs', (dirs) => {
            dirs.push(resolver.resolve(runtimeDir), 'composables');
            dirs.push(resolver.resolve(runtimeDir), 'components');
        });
    },
});
