/* ************************************************************************

   Copyright:
     2015 Norbert Schröder

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

qx.Class.define("qxl.themedemo.window.Video", {
  extend: qxl.themedemo.window.Window,

  members: {
    htmlFrame: null,

    _createControls() {
      var layout = new qx.ui.layout.VBox();
      this.set({
        caption: "Video",
        layout: layout,
        contentPadding: 1,
        allowStretchX: false,
        showMaximize: false,
        showMinimize: false,
        resizable: false,
      });

      this.htmlFrame = new qx.ui.embed.Html();
      this.htmlFrame.set({
        width: 642,
        height: 482,
        decorator: "input",
        padding: 0,
      });

      this.add(this.htmlFrame, { flex: 1 });
    },

    setVideoLink(data) {
      this.htmlFrame.set({ width: data.width + 2, height: data.height + 2 });
      const html = `<iframe width="${data.width}" height="${data.height}" src="${data.url}" frameborder='0' allowfullscreen></iframe>`;
      this.htmlFrame.setHtml(html);
    },
  },
});