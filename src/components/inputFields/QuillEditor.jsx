import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = () => {
  const [editorContent, setEditorContent] = useState("");

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    // ["blockquote", "code-block"],
    // ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  const quillRef = useRef(null);

  const handleChange = (value) => {
    console.log(value);
    setEditorContent(value);
  };

  return (
    <ReactQuill
      className="w-full h-64 rounded-md "
      ref={quillRef}
      theme="snow"
      value={editorContent}
      onChange={handleChange}
      modules={{ toolbar: toolbarOptions }}
      //   toolbar={[
      //     [{ header: [1, 2, false] }],
      //     ["bold", "italic", "underline"],
      //     ["list", "bullet"],
      //   ]}
    />
  );
};

export default QuillEditor;
