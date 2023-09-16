import React from "react";

import { renderClasses } from "../../utils/renderClasses";

import styles from "./text.module.scss";

interface TextProps {
    children: React.ReactNode,
    tag?: string,
    textAlign?: string,
    fontSize?: string,
    fontWeight?: string,
    lineHeight?: string,
    color?: string,
    customClassname?: string[]
  }

const Text = ({
  children,
  tag = "",
  customClassname = [],
  fontSize = "sm",
  fontWeight = "normal",
  lineHeight = "tight",
  color = "",
}: TextProps ) => {
    const Tag : any = tag ? tag : 'p';
  return (
    <Tag
      className={renderClasses([
        styles.text,
        ...customClassname,
      ])}
      data-fs = {fontSize}
      data-lh = {lineHeight}
      data-fw = {fontWeight}
      data-c = {color}
    >
      {children}
    </Tag>
  );
};

export default Text;
