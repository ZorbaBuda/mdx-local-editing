 'use client'
// import '@mdxeditor/editor/style.css'
import { MDXEditor, MDXEditorMethods } from '@mdxeditor/editor/MDXEditor'
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo'
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles'
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar'
import { AdmonitionDirectiveDescriptor, CreateLink, DiffSourceToggleWrapper, InsertAdmonition, InsertCodeBlock, InsertFrontmatter, InsertThematicBreak, ListsToggle, codeBlockPlugin, codeMirrorPlugin, diffSourcePlugin, directivesPlugin, headingsPlugin, imagePlugin, linkPlugin, listsPlugin, quotePlugin } from '@mdxeditor/editor'
import React, { useState } from "react"
import {FC} from 'react'
import { BlockTypeSelect, InsertImage, Separator } from '@mdxeditor/editor'
import { linkDialogPlugin } from '@mdxeditor/editor'
import { frontmatterPlugin } from '@mdxeditor/editor'
import { thematicBreakPlugin } from '@mdxeditor/editor/plugins/thematic-break'

interface EditorProps {
  markdown: string
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>
 change:Function
}


/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs. 
*/
const Editor: FC<EditorProps> = ({ markdown, editorRef, change }) => {
  //¿is needed save state, what if I'm working on a mdx and I lose current work?
  // const [text, setText] = useState(markdown)
  
 function handleChange() {
  console.log(editorRef.current?.getMarkdown())
   change()
 }

  return (
    <div className='bg-slate-400 overflow-auto'>
  <MDXEditor 
     ref={editorRef}  
     markdown={markdown} 
     onChange={handleChange}
    //  className=' '
     contentEditableClassName="prose"

  plugins={[
    
    headingsPlugin(),
    imagePlugin(),
    linkDialogPlugin(),
    linkPlugin(),
    frontmatterPlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
    thematicBreakPlugin(),
    listsPlugin(),
    codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),
    directivesPlugin({ directiveDescriptors: [ AdmonitionDirectiveDescriptor] }),
    diffSourcePlugin({ diffMarkdown: 'boo', viewMode: 'rich-text' }),
    quotePlugin(),
    toolbarPlugin({
    toolbarContents: () => (
      <DiffSourceToggleWrapper>
        <UndoRedo />
        <Separator/>
        <BoldItalicUnderlineToggles />
        <Separator/>
        <ListsToggle />
        <Separator/>
        <BlockTypeSelect/>
        <Separator/>
        <CreateLink />
        <InsertImage />
        <Separator/>
        <InsertAdmonition />
        <Separator/>
        <InsertFrontmatter />
        <InsertThematicBreak />
        </DiffSourceToggleWrapper>
        
        )
  })]}
   />
   
   </div>
  )
}

export default Editor
