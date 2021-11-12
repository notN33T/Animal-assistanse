import React, {useState}                from 'react'
import upImg                            from './media/upload-image.png'
import Header                           from '../HeaderAdmin/Header'
import './css/admin-form.css'
export default function AdminForm() {
    const [form, setForm] = useState({
        title:'', mainText:'', img:''
    })
    const [file, setFile] = useState(null)

    const changeHandler = event => {
        if (event.target.name == 'img') {
            let img = event.target.value
            let splitimg = img.split("\\")
            img = splitimg[splitimg.length - 1]
            setForm({ ...form, [event.target.name]: img })
            const file = event.target.files[0]
            setFile(file)
            return
        }
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return(
        <>
        <Header form={form} file={file}/>
        <div className="adm-form-c">
        {console.log(form.img)}
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
                
                <input 
                    type="file" 
                    name="img" 
                    id="input-file" 
                    className="input-img"
                    onChange={changeHandler}
                />
            </div>
            <textarea 
                type="text" 
                name="title" 
                placeholder="Title" 
                className="input_title"
                id="title" 
                maxLength="84" 
                required
                value={form.title}
                onChange={changeHandler}
            />

            <textarea 
                type="text" 
                name="mainText" 
                placeholder="Text of the post" 
                id="mainText" 
                className="input__post-text"
                maxLength="4800"
                required
                value={form.mainText}
                onChange={changeHandler}
            />
        </div>
        </>
    )


}