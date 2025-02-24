'use client'

import type { ForwardedRef } from 'react'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  tablePlugin,
  diffSourcePlugin,
} from '@mdxeditor/editor'
import { basicDark } from "cm6-theme-basic-dark"
import { useTheme } from 'next-themes'
import { Separator } from '@radix-ui/react-dropdown-menu'

interface Props {
    value: string; 
    fieldChange: (value: string) => void;
    editorRef: ForwardedRef<MDXEditorMethods> | null 
}

const Editor = ({ value, editorRef, fieldChange, ...props }: Props) => {
    const { resolvedTheme } = useTheme();

    const theme = resolvedTheme === "dark" ? [basicDark] : [];

    return (
        <MDXEditor
            key={resolvedTheme}
            markdown={value}
            ref={editorRef}
            className="background-light800_dark200 light-border-2 markdown-editor dark-editor grid w-full border"
            onChange={fieldChange}
            plugins={[
                // Example Plugin Usage
                headingsPlugin(),
                listsPlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                tablePlugin(),
                imagePlugin(),
                codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
                codeMirrorPlugin({
                    codeBlockLanguages: {
                        css: 'css',
                        txt: 'txt',
                        sql: 'sql',
                        html: 'html',
                        scss: 'scss',
                        bash: 'bash',
                        js: 'javascript',
                        ts: 'typescript',
                        "": 'unspecified',
                        tsx: 'Typescript (React)',
                        jsx: 'Javascript (React)',
                    },
                    autoLoadLanguageSupport: true,
                    codeMirrorExtensions: theme,
                }),
                diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
                toolbarPlugin({
                    
                    toolbarContents: () => {
                        return <ConditionalContents
                            options={[
                                {
                                    when: (editor) => editor?.editorType === "code-block", contents: () => <ChangeCodeMirrorLanguage />
                                },
                                {
                                    fallback: () => (
                                        <>
                                            <UndoRedo />
                                            <Separator />

                                            <BoldItalicUnderlineToggles />
                                            <Separator />

                                            <ListsToggle />
                                            <Separator />

                                            <CreateLink />
                                            <InsertImage />
                                            <Separator />

                                            <InsertTable />
                                            <InsertThematicBreak />

                                            <InsertCodeBlock />
                                        </>
                                    )
                                }
                            ]}
                        />
                    }
                })
            ]}
            {...props}
            
        />
    )
}

export default Editor;
