import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles for react-quill

const decodeHtmlEntities = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const LegalDocumentPreview = () => {
  const [templateHTML, setTemplateHTML] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(false);
  const [editorContent, setEditorContent] = useState('');

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setUploadedFile(file);
      setTemplateHTML(e.target.result);
    };

    reader.readAsText(file);
  };

  // Function to update template HTML
  const updateTemplate = (newHTML) => {
    // Update the template in your backend or wherever you store it
    setTemplateHTML(newHTML);
  };

  // Function to handle editing template
  const handleEditTemplate = () => {
    setEditingTemplate(true);
    setEditorContent(decodeHtmlEntities(templateHTML));
  };

  // Function to handle saving edited template
  const handleSaveTemplate = () => {
    updateTemplate(editorContent);
    setEditingTemplate(false);
  };

  // Function to handle creating a new template
  const handleCreateTemplate = () => {
    setEditingTemplate(true);
    setEditorContent('');
  };

  return (
    <div>
      <h2>Legal Document Template Preview</h2>
      <input type="file" accept=".html" onChange={handleFileUpload} />
      {uploadedFile && (
        <div>
          <h3>Uploaded Template</h3>
          <button onClick={handleEditTemplate}>Edit Template</button>
          <div>{!editingTemplate ? <div dangerouslySetInnerHTML={{ __html: templateHTML }} /> : <ReactQuill value={editorContent} onChange={setEditorContent} />}</div>
          {editingTemplate && <button onClick={handleSaveTemplate}>Save Template</button>}
        </div>
      )}
      {!uploadedFile && (
        <div>
          <h3>Create New Legal Template</h3>
          <button onClick={handleCreateTemplate}>Create Template</button>
          {editingTemplate && <ReactQuill value={editorContent} onChange={setEditorContent} />}
          {editingTemplate && <button onClick={handleSaveTemplate}>Save Template</button>}
        </div>
      )}
    </div>
  );
};

export default LegalDocumentPreview;
