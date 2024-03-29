/* ************************************************************************

   Copyright:
     2015-2021 Norbert Schröder

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Norbert Schröder (scro34)
     * Dmitrii Zolotov (goldim)

   Note:
     The Audio Player loads its playlist from a file containing data in
     JSON format. See the accompanying "playlist.json" for information
     about the data structure.
   

************************************************************************ */

qx.Class.define("scro34.themedemo.window.Video", {
  extend: scro34.themedemo.window.Window,

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

      let decorator = qx.theme.manager.Decoration.getInstance().resolve("theme-demo-input");
      if (!decorator){
        decorator = qx.theme.manager.Decoration.getInstance().resolve("input");
      }
      this.htmlFrame = new qx.ui.embed.Html();
      this.htmlFrame.set({
        width: 642,
        height: 482,
        decorator: decorator ?? null,
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
