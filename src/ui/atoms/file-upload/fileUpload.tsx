"use client";
import React, { useState } from "react";
import { Button, Upload } from "antd";
import { RcFile } from "antd/lib/upload/interface";
import { UploadOutlined } from "@ant-design/icons";

interface FileUploadProps {
  value?: RcFile;
  onChange?: (files: RcFile) => void;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const [fileList, setFileList] = useState<RcFile[]>(value ? [value] : []);

  const handleFileChange = (file: RcFile) => {

    setFileList([file]);

    if (onChange) {
      onChange(file);
    }

    return false;
  };

  return (
    <Upload
      fileList={fileList}
      multiple={true}
      showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
      beforeUpload={handleFileChange}
      disabled={disabled}
    >
      {fileList.length === 0 && (
        <Button
          icon={<UploadOutlined />}
          style={{ width: "150px", height: "150px" }}
          disabled={disabled}
        >
          Upload Files
        </Button>
      )}
    </Upload>
  );
};
