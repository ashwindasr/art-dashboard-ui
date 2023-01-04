import React, {Component} from "react";
import {Select} from "antd";
import {getReleaseBranchesFromOcpBuildData} from "../../api_calls/release_calls";
import {Navigate} from "react-router";

const {Option} = Select;


export default class OpenshiftVersionSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            onSelectVersion: undefined
        }

        this.setData();
    }

    setData = () => {
        getReleaseBranchesFromOcpBuildData().then(data => {

            let select_data = [];
            data.forEach((openshiftVersionDetail) => {
                select_data.push(openshiftVersionDetail["name"]);
            });

            this.setState({data: select_data}, () => {
                this.setState({loading: false})
            })
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.setState({onSelectVersion: undefined})
    }

    onChange = (value) => {
        this.setState({onSelectVersion: value})
    }

    generateSelectOptionFromStateDate = (state_data) => {
        return state_data.map((openshiftVersion) => {
            return (
                <Option value={openshiftVersion}>{openshiftVersion}</Option>
            )
        })
    }

    render() {
        if (this.state.onSelectVersion === undefined) {
            return (
                <div className={"right"} style={{padding: "30px"}}>
                    <Select loading={this.state.loading} placeholder={"OpenShift Version"} onChange={this.onChange}>
                        {this.generateSelectOptionFromStateDate(this.state.data)}
                    </Select>
                </div>

            );
        } else {
            return <Navigate to={`/release/status/${this.state.onSelectVersion}`}/>;
        }

    }

}