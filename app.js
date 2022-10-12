/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import List from "@ckeditor/ckeditor5-list/src/list";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

class Google extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add("google", () => {
      // The button will be an instance of ButtonView.
      const button = new ButtonView();

      button.set({
        label: "Google",
        withText: true,
      });

      //Execute a callback function when the button is clicked
      button.on("execute", () => {
        const selection = editor.model.document.selection;
        const range = selection.getFirstRange();

        for (const item of range.getItems()) {
          window.open(`https://www.google.com/search?q=${item.data}`, "_blank");
        }
      });

      return button;
    });
  }
}

ClassicEditor.create(document.querySelector("#editor"), {
  plugins: [Essentials, Paragraph, Heading, List, Bold, Italic, Google],
  toolbar: [
    "heading",
    "bold",
    "italic",
    "numberedList",
    "bulletedList",
    "google",
  ],
})
  .then((editor) => {
    console.log("Editor was initialized", editor);
  })
  .catch((error) => {
    console.error(error.stack);
  });
