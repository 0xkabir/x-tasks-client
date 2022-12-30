import React, { useMemo } from 'react';
import {useDropzone} from 'react-dropzone';
import BackupIcon from '@mui/icons-material/Backup';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px 5px 0px 5px',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const focusedStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };

  const rejectStyle = {
    borderColor: '#ff1744'
  };

const DropZone = (props) => {
    const {register} = props
    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
      } = useDropzone({ 
        accept: {
            'image/png': ['.jpg','.jpeg','.png']
          },   
        maxFiles:3
      });

      const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isFocused,
        isDragAccept,
        isDragReject
      ]);

      console.log(acceptedFiles)
    
      const acceptedFileItems = acceptedFiles.map(file => (
        <span key={file.path}>
          {file.path} - {file.size} bytes
        </span>
      ));
    
      const fileRejectionItems = fileRejections.map(({ file, errors  }) => { 
       return (
         <span key={file.path}>
              {file.path} - {file.size} bytes
              <ul>
                {errors.map(e => <span key={e.code}>{e.message}</span>)}
             </ul>
    
         </span>
       ) 
      });
      
    
      return (
        <section className="container">
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} {...register('image')}/>
            <BackupIcon style={{fontSize: '48px'}}/>
            <p>Drag 'n Drop or Click Here to Upload</p>
          </div>
          <aside>
            {acceptedFiles && <p>{acceptedFileItems}</p>}
            {fileRejections && <ul style={{color: '#d32f2f'}}>{fileRejectionItems}</ul>}
          </aside>
        </section>
      );
};

export default DropZone;