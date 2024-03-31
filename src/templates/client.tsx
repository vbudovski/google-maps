import { camelCase } from '@kubb/core/transformers';
import { FunctionParams } from '@kubb/core/utils';
import { Editor, File, Function as KubbFunction } from '@kubb/react';
import type { OperationSchema } from '@kubb/swagger';
import type { Client } from '@kubb/swagger-client/components';
import { type FileMeta, pluginKey as swaggerZodPluginKey } from '@kubb/swagger-zod';
import { useOperation, useOperationManager } from '@kubb/swagger/hooks';
import type { ComponentProps, ReactNode } from 'react';

function toSchemaName(value: OperationSchema | undefined) {
    return value ? camelCase(`${value.name}Schema`) : undefined;
}

interface RootProps {
    children?: ReactNode;
}

function Root(props: RootProps) {
    const { children } = props;

    const { getFile } = useOperationManager();
    const operation = useOperation();
    const file = getFile(operation);

    return (
        <Editor language="typescript">
            <File baseName={file.baseName} path={file.path} meta={file.meta as FileMeta}>
                <File.Import name={['z']} path="zod" isTypeOnly />
                <File.Import name={['fetcher']} path="../../fetcher" />
                <File.Source>{children}</File.Source>
            </File>
        </Editor>
    );
}

interface DefaultProps extends ComponentProps<typeof Client.templates.default> {
    //
}

function Default(props: DefaultProps) {
    const { name, generics = '', JSDoc = { comments: [] } } = props;

    const { getSchemas, getFile } = useOperationManager();
    const operation = useOperation();
    const schemas = getSchemas(operation);
    const swaggerFile = getFile(operation);
    const zodFile = getFile(operation, { pluginKey: swaggerZodPluginKey });

    const queryParamsSchema = toSchemaName(schemas.queryParams);
    const dataSchema = toSchemaName(schemas.request);
    const responseSchema = toSchemaName(schemas.response);

    const params = new FunctionParams();
    // params.add(
    //     getASTParams(schemas.pathParams, {
    //         typed: true,
    //         asObject: pathParamsType === 'object',
    //     })
    // );
    if (schemas.request) {
        params.add({
            name: 'data',
            type: `z.output<typeof ${toSchemaName(schemas.request)}>`,
        });
    }
    if (schemas.queryParams) {
        params.add({
            name: 'params',
            type: `z.output<typeof ${toSchemaName(schemas.queryParams)}>`,
        });
    }
    if (schemas.headerParams) {
        params.add({
            name: 'headers',
            type: `z.output<typeof ${toSchemaName(schemas.headerParams)}>`,
        });
    }
    params.add({
        name: 'options',
        type: 'Parameters<typeof fetcher>[2]',
    });

    return (
        <>
            <File.Import name={[toSchemaName(schemas.response)]} root={swaggerFile.path} path={zodFile.path} />
            <File.Import
                name={[toSchemaName(schemas.queryParams), toSchemaName(schemas.request)].filter(Boolean)}
                root={swaggerFile.path}
                path={zodFile.path}
            />
            <File.Import
                name={[schemas.pathParams?.name, schemas.headerParams?.name].filter(Boolean)}
                root={swaggerFile.path}
                path={zodFile.path}
                isTypeOnly
            />
            <KubbFunction
                name={name}
                async
                export
                generics={generics}
                params={params.toString()}
                JSDoc={{
                    comments: [
                        ...JSDoc.comments,
                        'biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore',
                        'needs to be async. See https://github.com/biomejs/biome/issues/1161.',
                    ],
                }}
            >
                {queryParamsSchema && `const parsedParams = ${queryParamsSchema}.parse(params)`}
                {dataSchema && `${dataSchema}.parse(data)`}
                <br />
                <br />
                const url = new URL('{operation.path}', '{operation.schema.servers?.at(0)?.url}');
                <br />
                <br />
                {queryParamsSchema && (
                    <>
                        {'for (const [name, value] of Object.entries(parsedParams || {})) {'}
                        <br />
                        {'url.searchParams.set(name, value as unknown as string);'}
                        <br />
                        {'}'}
                    </>
                )}
                <br />
                <br />
                return fetcher({responseSchema}, url {'{'} method: '{operation.method}' {', ...options}'});
            </KubbFunction>
        </>
    );
}

export const templates = {
    root: Root,
    default: Default,
} as const;
