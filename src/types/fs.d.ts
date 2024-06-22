declare module 'fs' {

    export type option = (
        {
            mode?: Mode | undefined;
            flag?: string | undefined;
            flush?: boolean | undefined;
        }
        & BufferEncoding


    )

    function writeFileSync(file_path: string | Buffer | URL, data: string, option?: option): void;
}