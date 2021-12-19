import { build } from 'https://deno.land/x/dnt/mod.ts';
await build({
    entryPoints: ['./src/mod.ts'],
    outDir: './npm',
    package: {
        name: '@sitebender/operations',
        version: Deno.args[0],
        description: 'A library for validation, formatting, and operations in Sitebender components.',
        license: 'MIT',
        repository: {
            type: 'git',
            url: 'git+https://github.com/site-bender/operations.git',
        },
        bugs: {
            url: 'https://github.com/site-bender/operations/issues',
        },
    },
    mappings: {
        [`https://cdn.skypack.dev/@js-temporal/polyfill?dts`]: {
            name: '@js-temporal/polyfill',
            version: '0.3.0',
        },
        [`'https://cdn.skypack.dev/@formatjs/intl-listformat?dts'`]: {
            name: '@formatjs/intl-listformat',
            version: '6.3.6',
        },
    },
});
Deno.copyFileSync('LICENSE', 'npm/LICENSE');
Deno.copyFileSync('README.md', 'npm/README.md');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRfbnBtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVpbGRfbnBtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQTtBQUV0RCxNQUFNLEtBQUssQ0FBQztJQUNYLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQztJQUM3QixNQUFNLEVBQUUsT0FBTztJQUNmLE9BQU8sRUFBRTtRQUNSLElBQUksRUFBRSx3QkFBd0I7UUFDOUIsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLFdBQVcsRUFDVixnRkFBZ0Y7UUFDakYsT0FBTyxFQUFFLEtBQUs7UUFDZCxVQUFVLEVBQUU7WUFDWCxJQUFJLEVBQUUsS0FBSztZQUNYLEdBQUcsRUFBRSxtREFBbUQ7U0FDeEQ7UUFDRCxJQUFJLEVBQUU7WUFDTCxHQUFHLEVBQUUsa0RBQWtEO1NBQ3ZEO0tBQ0Q7SUFDRCxRQUFRLEVBQUU7UUFDVCxDQUFDLG1EQUFtRCxDQUFDLEVBQUU7WUFDdEQsSUFBSSxFQUFFLHVCQUF1QjtZQUM3QixPQUFPLEVBQUUsT0FBTztTQUNoQjtRQUNELENBQUMseURBQXlELENBQUMsRUFBRTtZQUM1RCxJQUFJLEVBQUUsMkJBQTJCO1lBQ2pDLE9BQU8sRUFBRSxPQUFPO1NBQ2hCO0tBQ0Q7Q0FDRCxDQUFDLENBQUE7QUFHRixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQTtBQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJ1aWxkIH0gZnJvbSAnaHR0cHM6Ly9kZW5vLmxhbmQveC9kbnQvbW9kLnRzJ1xuXG5hd2FpdCBidWlsZCh7XG5cdGVudHJ5UG9pbnRzOiBbJy4vc3JjL21vZC50cyddLFxuXHRvdXREaXI6ICcuL25wbScsXG5cdHBhY2thZ2U6IHtcblx0XHRuYW1lOiAnQHNpdGViZW5kZXIvb3BlcmF0aW9ucycsXG5cdFx0dmVyc2lvbjogRGVuby5hcmdzWzBdLFxuXHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0J0EgbGlicmFyeSBmb3IgdmFsaWRhdGlvbiwgZm9ybWF0dGluZywgYW5kIG9wZXJhdGlvbnMgaW4gU2l0ZWJlbmRlciBjb21wb25lbnRzLicsXG5cdFx0bGljZW5zZTogJ01JVCcsXG5cdFx0cmVwb3NpdG9yeToge1xuXHRcdFx0dHlwZTogJ2dpdCcsXG5cdFx0XHR1cmw6ICdnaXQraHR0cHM6Ly9naXRodWIuY29tL3NpdGUtYmVuZGVyL29wZXJhdGlvbnMuZ2l0Jyxcblx0XHR9LFxuXHRcdGJ1Z3M6IHtcblx0XHRcdHVybDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9zaXRlLWJlbmRlci9vcGVyYXRpb25zL2lzc3VlcycsXG5cdFx0fSxcblx0fSxcblx0bWFwcGluZ3M6IHtcblx0XHRbYGh0dHBzOi8vY2RuLnNreXBhY2suZGV2L0Bqcy10ZW1wb3JhbC9wb2x5ZmlsbD9kdHNgXToge1xuXHRcdFx0bmFtZTogJ0Bqcy10ZW1wb3JhbC9wb2x5ZmlsbCcsXG5cdFx0XHR2ZXJzaW9uOiAnMC4zLjAnLFxuXHRcdH0sXG5cdFx0W2AnaHR0cHM6Ly9jZG4uc2t5cGFjay5kZXYvQGZvcm1hdGpzL2ludGwtbGlzdGZvcm1hdD9kdHMnYF06IHtcblx0XHRcdG5hbWU6ICdAZm9ybWF0anMvaW50bC1saXN0Zm9ybWF0Jyxcblx0XHRcdHZlcnNpb246ICc2LjMuNicsXG5cdFx0fSxcblx0fSxcbn0pXG5cbi8vIHBvc3QgYnVpbGQgc3RlcHNcbkRlbm8uY29weUZpbGVTeW5jKCdMSUNFTlNFJywgJ25wbS9MSUNFTlNFJylcbkRlbm8uY29weUZpbGVTeW5jKCdSRUFETUUubWQnLCAnbnBtL1JFQURNRS5tZCcpXG4iXX0=