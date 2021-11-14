import React, {useState, useEffect}     from 'react'
import upImg                            from './media/upload-image.png'
import Header                           from '../HeaderAdmin/Header'
import Loading                          from '../../Common/Loading/Loading'
import './css/admin-form.css'
export default function AdminForm() {
    const [form, setForm] = useState({
        title:'', mainText:'', img:''
    })
    const [prevImg, setPrevImg] = useState(null)
    const [file, setFile] = useState(null)
    const [ready, setReady] = useState(false)
    
    useEffect(() => {
        setReady(true)
    })

    const changeHandler = event => {
        if (event.target.name === 'img') {
            let img = event.target.value
            let splitimg = img.split("\\")
            img = splitimg[splitimg.length - 1]
            setForm({ ...form, [event.target.name]: img })
            const file = event.target.files[0]

            try {
                setPrevImg(URL.createObjectURL(file))
            } catch(e) {}
            setFile(file)
        return
        }
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const deletImgHandler = () => {
        let deleteImg = window.confirm("Are you wanna delete img")
        if (!deleteImg) return
        setReady(false)
        setFile(null)
        setPrevImg(null)
        setForm({ ...form, img: '' })
    }

    if(ready) {
        return(
            <>
            <Header form={form} file={file}/>
            <div className="adm-form-c">
                <div className="image-input-c">
                    <label htmlFor="input-file">
                    <div className="img-text-c">
                        <div className="img-c">
                            <img src={upImg} alt="sasa" required/>
                        </div>
                        <div className="text-upl-c">
                            <p className="upl-p">
                                {form.img ? form.img : "Upload image"}
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

                    {form.img ?
                     <div className="prev__img-c">
                        <img src={prevImg} className="prev__img" onClick={deletImgHandler}/> 
                        <p className="img-hdn-delete">Press<br />to<br />delete</p> 
                    </div>
                    : null}

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
    return(<Loading />)
}