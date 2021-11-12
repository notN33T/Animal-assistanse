import React, {useState, useCallback}   from 'react'
import upImg                            from './media/upload-image.png'
import './css/admin-form.css'

export default function AdminForm() {
    const [form, setForm] = useState({
        title:'', mainText:'', img:''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return(
        <div className="adm-form-c">
            <div className="image-input-c">
                <label htmlFor="input-file">
                <div className="img-text-c">
                    <div className="img-c">
                        <img src={upImg} alt="sasa" required/>
                    </div>
                    <div className="text-upl-c">
                        <p className="upl-p">
                            Upload image
                        </p>
                    </div>
                </div>
                </label>
                
                <input type="file" name="img" id="input-file" className="input-img"/>
            </div>
            <textarea 
                type="text" 
                name="title" 
                placeholder="Title" 
                class="input_title"
                id="title" 
                maxlength="84" 
                required
                value={form.title}
                onChange={changeHandler}
            />

            <textarea 
                type="text" 
                name="mainText" 
                placeholder="Text of the post" 
                id="mainText" 
                class="input__post-text"
                maxlength="4800"
                required
                value={form.mainText}
                onChange={changeHandler}
            />
        </div>
        
    )


}