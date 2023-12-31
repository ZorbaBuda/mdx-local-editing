"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import CodeMirror, { BasicSetupOptions } from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { githubDark } from "@uiw/codemirror-theme-github";
import { EditorView } from "@codemirror/view";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { defaultTemplate } from "@/data/frontmatter-template";
import { postData, aboutData } from "@/lib/http-post";
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";

import { upsertPost, upsertAbout } from "@/lib/admin-backend";

const EditorComp = dynamic(
  () => import("@/components/post-mdxEditor/EditorComponent"),
  { ssr: false }
);

const setupOptions: BasicSetupOptions = {
  lineNumbers: false,
  foldGutter: false,
};

export default function Post(props: {
  content: string;
  fileName: string;
  sha: string;
  path: string;
  type: string;
}) {

  // console.log(props.sha)
  const [postMD, setPostMD] = useState(props.content || defaultTemplate);
  // console.log(props.type);
  const [file, setFile] = useState<File>();

  const [slug, setSlug] = useState(props.fileName);

  const [sha, setSha] = useState(props.sha);

  const router = useRouter();

  const editorRef = React.useRef<MDXEditorMethods>(null);

  function handleChange() {
    // console.log("👌 parent");
    const text = editorRef.current?.getMarkdown();
    //TODO what the heck
    if (text !== undefined) setPostMD(text);
  }


  const onSubmit = () => {
    if (props.type === "post") {
      const finalSlug = slug.endsWith(".mdx") ? slug : slug + ".mdx";
      postData("/api/posts", {
        post: postMD,
        slug: finalSlug,
        sha: sha,
      });
    }else if(props.type === "about") {
      //  console.log(postMD, '✔')
       aboutData("/api/about", {
         about: postMD,
         sha: sha,
       })
    }
    router.refresh();
    router.push("/editor");
  };

  const uploadImage = async (file: File | undefined) => {
    setFile(file);
    //e.preventDefault()
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/images", {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <div className="container">
      <Label className="w-50 justify-end" htmlFor="imageFile">
        Upload image
      </Label>
      <Input
        className="w-50 justify-end"
        id="imageFile"
        type="file"
        name="file"
        onChange={(e) => uploadImage(e.target.files?.[0])}
      />

      <Button className="mt-2 mb-4 w-40 float-right" onClick={() => onSubmit()}>
        {props.type === "post" ? "Save post" : "Save About"}
      </Button>
      <div className="grid w-full items-center gap-1.5 mb-5">
        <Label htmlFor="slug">Slug</Label>
        <Input
          type="slug"
          id="slug"
          placeholder="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>
      <EditorComp
        markdown={postMD}
        editorRef={editorRef}
        change={handleChange}
      />
      {/* <CodeMirror
        value={postMD}
        theme={githubDark}
        minHeight="400px"
        extensions={[markdown({ base: markdownLanguage, codeLanguages: languages }), EditorView.lineWrapping]}
        basicSetup={setupOptions}
        onChange={e => setPostMD(e)}
      /> */}
    </div>
  );
}
