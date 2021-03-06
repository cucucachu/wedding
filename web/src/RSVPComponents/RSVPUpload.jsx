import React, { useState } from 'react';

import { Spinner } from '../components/Spinner';

export function RSVPUpload(props) {
    const { handleRSVPYes, uploading } = props;

    const [file, setFile] = useState(null);
    const [url, setURL] = useState(null);

    const handleChangeFile = e => {
        setURL(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    return (
        <div>
            <p>Please upload a picture of your vaccine card, or other verification of vaccination.</p>
            <p>If you don't have a picture handy, you can leave and come back later.</p>
            <img src={url}/>
            <input type='file' accept='image/*' onChange={handleChangeFile}/>
            {uploading ? 
                <Spinner/> 
                :
                <button 
                    onClick={() => handleRSVPYes(file)}
                >Upload</button>
            }
        </div>
    )
}