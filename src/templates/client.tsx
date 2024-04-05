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
                <File.Import name={['z']} path="zod" />
                <File.Import name={['fetcher', 'withKey', 'urlWithParams']} path="../../../utils" />
                <File.Source>{children}</File.Source>
            </File>
        </Editor>
    );
}

interface DefaultProps extends Pick<ComponentProps<typeof Client.templates.default>, 'name' | 'JSDoc'> {
    //
}

function Default(props: DefaultProps) {
    const { name, JSDoc = { comments: [] } } = props;

    const { getSchemas, getFile } = useOperationManager();
    const operation = useOperation();
    const schemas = getSchemas(operation);
    const swaggerFile = getFile(operation);
    const zodFile = getFile(operation, { pluginKey: swaggerZodPluginKey });

    const queryParamsSchema = toSchemaName(schemas.queryParams);
    const dataSchema = toSchemaName(schemas.request);
    const responseSchema = toSchemaName(schemas.response);
    const headersSchema = toSchemaName(schemas.headerParams);

    const params = new FunctionParams();
    params.add({
        name: 'params',
        type: 'z.output<typeof queryParamsSchema>',
    });
    if (dataSchema) {
        params.add({
            name: 'data',
            type: `z.output<typeof ${dataSchema}>`,
        });
    }
    if (headersSchema) {
        params.add({
            name: 'headers',
            type: `z.output<typeof ${headersSchema}>`,
        });
    }
    params.add({
        name: 'options',
        type: 'Parameters<typeof fetcher>[2]',
        required: false,
    });

    let path = operation.path;
    // FIXME: Workaround for bug in OpenAPI schema. See https://github.com/googlemaps/openapi-specification/issues/484.
    if (path === '/v1/snaptoroads') {
        path = '/v1/snapToRoads';
    }

    return (
        <>
            <File.Import name={[responseSchema]} root={swaggerFile.path} path={zodFile.path} />
            <File.Import
                name={[queryParamsSchema, dataSchema].filter(Boolean)}
                root={swaggerFile.path}
                path={zodFile.path}
            />
            <File.Import
                name={[schemas.pathParams?.name, schemas.headerParams?.name].filter(Boolean)}
                root={swaggerFile.path}
                path={zodFile.path}
                isTypeOnly
            />
            const queryParamsSchema = withKey({queryParamsSchema ? queryParamsSchema : 'z.object({})'});
            <br />
            <br />
            <KubbFunction
                name={name}
                async
                export
                params={params.toString()}
                JSDoc={{
                    comments: [
                        ...JSDoc.comments,
                        'biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore',
                        'needs to be async. See https://github.com/biomejs/biome/issues/1161.',
                    ],
                }}
            >
                const parsedParams = queryParamsSchema.parse(params);
                {dataSchema && `${dataSchema}.parse(data);`}
                <br />
                const url = urlWithParams('{path}', '{operation.schema.servers?.at(0)?.url}', parsedParams);
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
