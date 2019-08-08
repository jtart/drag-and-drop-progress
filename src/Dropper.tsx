import React, { useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/styles";
import "babel-polyfill";
import "react-app-polyfill/ie11";

const StyledLinearProgress = withStyles({
  root: {
    height: 50,
    backgroundColor: "grey",
    margin: "10rem",
    borderRadius: 20
  },
  bar: {
    borderRadius: 20
  }
})(LinearProgress);

const DropperView = () => {
  const [uploadPercantage, setUploadPercentage] = React.useState<number>(0);

  const onDrop = useCallback(async acceptedFiles => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    const url = "https://mockbin.org/request";
    const localUrl = "/file";
    await axios.post(url, formData, {
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadPercentage(percentCompleted);
      },
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()} style={{ border: "4px solid grey" }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {uploadPercantage === 100 ? (
        <>
          <h1>Uploaded!</h1>
        </>
      ) : (
        <StyledLinearProgress variant="determinate" value={uploadPercantage} />
      )}
    </>
  );
};

export default DropperView;
