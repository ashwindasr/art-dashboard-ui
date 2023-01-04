import React, {Component} from "react";
import RELEASE_BRANCH_DETAIL from "./release_branch_detail";
import {message} from "antd";
import OpenshiftVersionSelect from "./openshift_version_select";
import {useParams} from "react-router-dom";



export default class Release_home_page extends Component {

    constructor(props) {
        super(props);

        this.state = {
            release_table_data: [],
            current_branch: undefined,
            loaded_shown: false,
        }

        message.config({
            maxCount: 2
        })

    }


    componentDidMount() {
        this.setState({current_branch: window.location.href.split("/")[5]});
        this.display_loading();
    }

    display_loading = () => {
        message.loading({content: "Loading Data", duration: 0, style: {position: "fixed", left: "50%", top: "20%"}});
    }

    destroy_loading = () => {

        message.destroy()
        message.success({
            content: "Loaded",
            duration: 2,
            style: {position: "fixed", left: "50%", top: "20%", color: "#316DC1"}
        })

    }


    render() {
        return (
            <div>
                <OpenshiftVersionSelect/>
                <RELEASE_BRANCH_DETAIL branch={this.state.current_branch}
                                       destroy_loading_callback={this.destroy_loading}/>
            </div>
        );
    }
}