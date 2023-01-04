import React, {Component} from 'react';
import {Layout, Menu, Spin} from 'antd';
import {Link, Route, Routes} from "react-router-dom";
import {gaVersion} from "./api_calls/release_calls";
import {
    HistoryOutlined,
    ToolOutlined,
    RocketOutlined
} from '@ant-design/icons';
import RELEASE_HOME_PAGE from "./components/release/release_home_page";
import BUILD_HISTORY_HOME from "./components/build/build_history_home";



// require('dotenv').config();

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gaVersion: undefined,
        }
    }

    componentDidMount() {
        this.getGaVersion();
    }

    getGaVersion = () => {
        gaVersion().then(data => {
            this.setState({gaVersion: data["payload"]})
        })
    }

    render() {
        const {Header, Footer, Sider, Content} = Layout;

        return (
            <div>
                <Layout>
                    <Sider collapsed={false}>
                        <div>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                                <Menu.Item key="releaseStatusMenuItem" icon={<RocketOutlined/>}>
                                    <Link to="/release/status/?type=all">
                                        Release status
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="buildMenuItem" icon={<HistoryOutlined/>}>
                                    <Link to="/build/history">
                                        Build History
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={"whatsNew"} icon={<ToolOutlined/>}>
                                    <Link to={"/help"}>
                                        Help
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </div>
                    </Sider>

                    <Layout>

                        <Header style={{background: "white", height: "120px", float: "left"}}>
                            <div className="center">
                                <h1 style={{color: "#316DC1", margin: "20px"}}>OpenShift Release Portal</h1>
                            </div>
                        </Header>
                        {
                            this.state.gaVersion ?
                                <Content>
                                    <Routes>
                                        <Route path="/release/status/:branch" element={<RELEASE_HOME_PAGE />}/>
                                        {/*<Route path="/release/advisory/overview/:advisoryId"*/}
                                        {/*       component={ADVISORY_OVERVIEW_HOME}/>*/}
                                        <Route path="/build/history" element={<BUILD_HISTORY_HOME />}/>
                                        {/*<Route path="/help" component={WHATS_NEW_CAROUSEL}/>*/}
                                    </Routes>
                                    {/*<Navigate from=""*/}
                                    {/*          to={`/release/status/openshift-${this.state.gaVersion}`}*/}
                                    {/*/>*/}
                                </Content>
                                :
                                <Spin/>
                        }
                        <Footer style={{textAlign: 'center'}}>
                            RedHat ©2023
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}
