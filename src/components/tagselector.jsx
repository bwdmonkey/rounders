import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';

class TagSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTags: [],
        }

        this.validTags = [];
        this.tagIDs= {};
        
        fetch('/tags')
            .then(res => res.json())
            .then(json => this.handleTagData(json.result))
            .catch(err => console.log("something bad happened", err));
        // let fakeTagData = [ {"id": 1, "label": "bananas"}, 
        //         {"id": 2, "label": "apples"},
        //         {"id": 3, "label": "mouse"}];
        // this.handleTagData(fakeTagData);
    }

    handleTagData = (tagData) => {
        this.validTags = tagData.map(e => e["label"]);
        tagData.forEach(e => this.tagIDs[e["label"]] = e["id"]);
        console.log(tagData);
    }

    handleTagChange = (event) => {
        let validTags = this.validTags;
        let tagList = event.target.value.split(',').map(w=>w.trim());
        tagList = tagList.filter((w,i)=>validTags.indexOf(w) > -1 && tagList.indexOf(w) === i);

        this.setState( { selectedTags: tagList });
    }

    render() {
        return (
            <div>
                <Form.Group controlId="formTags">
                    <Form.Label>{this.props.label}</Form.Label>
                    <Form.Control type="text" placeholder="My tag" onChange={this.handleTagChange}/>
                </Form.Group>
                <h6>
                    {this.state.selectedTags.map(t => 
                        <Badge variant='primary' key={this.tagIDs[t]}> {t} </Badge>)}
                </h6>
            </div>
        );
    }
}

export default TagSelector;
