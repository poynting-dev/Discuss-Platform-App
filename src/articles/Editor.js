import React, { Component } from 'react'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import FroalaEditor from 'react-froala-wysiwyg'

class Editor extends React.Component {
    constructor() {
        super()

        this.handleModelChange = this.handleModelChange.bind(this)

        this.state = {
            model: 'Example text',
        }
    }

    handleModelChange(model) {
        this.setState({
            model: model,
        })
        console.log(this.state.model)
    }
    render() {
        return (
            <FroalaEditor
                model={this.state.model}
                onModelChange={this.handleModelChange}
            />
        )
    }
}

export default Editor
