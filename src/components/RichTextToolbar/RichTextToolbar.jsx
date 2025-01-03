import React from "react";
import { Box, Button } from "@mui/material";
import { RichUtils } from "draft-js";

const RichTextToolbar = ({ editorState, setEditorState }) => {
  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        mb: 2,
      }}
    >
      {/* Inline styles */}
      <Button
        size="small"
        onMouseDown={(e) => {
          e.preventDefault();
          toggleInlineStyle("BOLD");
        }}
      >
        <img
          src="/assets/images/bold_ico_67.png"
          alt="Bold"
          style={{ width: "32px", height: "32px" }}
        />
      </Button>
      <Button
        size="small"
        onMouseDown={(e) => {
          e.preventDefault();
          toggleInlineStyle("ITALIC");
        }}
      >
        <img
          src="/assets/images/italic_ico_67.png"
          alt="Italic"
          style={{ width: "32px", height: "32px" }}
        />
      </Button>
      <Button
        size="small"
        onMouseDown={(e) => {
          e.preventDefault();
          toggleInlineStyle("UNDERLINE");
        }}
      >
        <img
          src="/assets/images/underline_ico_67.png"
          alt="Underline"
          style={{ width: "32px", height: "32px" }}
        />
      </Button>

      {/* Block styles */}
      <Button
        size="small"
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlockType("header-one");
        }}
      >
        <img
          src="/assets/images/h1_ico_50.png"
          alt="H1"
          style={{ width: "32px", height: "32px" }}
        />
      </Button>
      <Button
        size="small"
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlockType("header-two");
        }}
      >
        <img
          src="/assets/images/h2_ico_48.png"
          alt="h2"
          style={{ width: "32px", height: "32px" }}
        />
      </Button>
      <Button
        size="small"
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlockType("blockquote");
        }}
      >
        <img
          src="/assets/images/quote_ico_64.png"
          alt="Quote"
          style={{ width: "32px", height: "32px" }}
        />
      </Button>
    </Box>
  );
};

export default RichTextToolbar;
