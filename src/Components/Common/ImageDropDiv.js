import React from 'react'
import {Form,Segment,Icon,Header,Image} from 'semantic-ui-react'
import {useRef} from 'react'
const ImageDropDiv=({setmedia,media,setmediapreview,mediapreview,
sethighlighted,highlighted,handlechange})=>{
    // console.log(media);
const inputref=useRef();
    return (
        <div>
            <Form.Field>
                <Segment placeholder >
                    <input type="file" accept="image/*" style={{display:"none"}}
                     name="media" onChange={handlechange}
                     ref={inputref}></input>
                 
                <div
                 onDragOver={(e)=>{
                     e.preventDefault()
                     sethighlighted(true);
                 }}

                 onDragLeave={(e)=>{
                     e.preventDefault()
                     sethighlighted(false);
                 }}

                 onDrop={(e)=>{
                     e.preventDefault()
                     sethighlighted(true);
                     const dropfile=Array.from(e.dataTransfer.files)
                     
                     setmedia(dropfile[0]);
                     setmediapreview(URL.createObjectURL(dropfile[0]))
                 }}
                >
                    {mediapreview.length===0?<>
                    <Segment color={highlighted?"green":"grey"} placeholder>
                        <Header icon>
                     
                        <Icon name='file image outline'  style={{cursor:"pointer"}}
                     onClick={()=>inputref.current.click()}></Icon>
                            Drag n Drop or Click to Updload File
                        </Header>
                    </Segment>
                    </>:<>
                   
                    <Segment color="green" placeholder>
                     <Image src={mediapreview} size="medium"
                     centered styel={{cursor:"pointer"}}
                     onClick={()=>inputref.current.click()}></Image>
                    </Segment>
                    </>}
                </div>
                </Segment>
            </Form.Field>
        </div>
    )
}

export default ImageDropDiv
