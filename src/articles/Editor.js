import React, { Component } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import parse from 'html-react-parser'
import './handler.css'

var text = ''
class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = { text: '' }
    }

    render() {
        return (
            <>
                <div className="editor">
                    <CKEditor
                        editor={ClassicEditor}
                        data={text}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            this.setState({ data })
                            {
                                text = data
                                console.log(data)
                            }
                            // setEditorText(data)
                        }}
                    />
                </div>
                <div>
                    <h2>Content here</h2>
                    <p>{parse(text)}</p>
                </div>
            </>
        )
    }
}

export default Editor
