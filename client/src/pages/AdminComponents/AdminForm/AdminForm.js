import React                    from 'react'
import upImg                    from './media/upload-image.png'
import './css/admin-form.css'

export default function AdminForm() {


    return(
        <div className="adm-form-c">

            <div className="image-input-c">

                <label htmlFor="input-file">
                <div className="img-text-c">

                    <div className="img-c">
                        <img src={upImg} alt="sasa" />
                    </div>

                    <div className="text-upl-c">
                        <p className="upl-p">
                            Upload image
                        </p>
                    </div>

                </div>
                </label>
                
                <input type="file" name="file" id="input-file" className="input-img"/>
            </div>
            <input type="text" />
            <input type="text" />
        </div>
        
    )


}