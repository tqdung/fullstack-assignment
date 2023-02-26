import { useEffect } from 'react';
import { useOutlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import { ROUTE_PATHS } from '@routes/routes';
import { LodashUtils } from '@utils/lodash';

const { Header, Sider, Content } = Layout;

export default function MainPage() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const outlet = useOutlet();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (LodashUtils.isEqual(location.pathname, ROUTE_PATHS.MAIN)) {
            navigate(ROUTE_PATHS.EMPLOYEE);
        }
    }, [location, navigate]);

    return (
        <Layout>
            <Header>Header</Header>
            <Layout>
                <Sider width={200} style={{ backgroundColor: colorBgContainer }}>
                    <Menu
                        defaultActiveFirst
                        defaultSelectedKeys={[location.pathname]}
                        activeKey={location.pathname}
                        items={[
                            { key: ROUTE_PATHS.EMPLOYEE, label: 'Employee', onClick: LodashUtils.wrap([ROUTE_PATHS.EMPLOYEE], LodashUtils.spread(navigate)) },
                            { key: ROUTE_PATHS.CAFE, label: 'Cafe', onClick: LodashUtils.wrap([ROUTE_PATHS.CAFE], LodashUtils.spread(navigate)) },
                        ]}
                    />
                </Sider>
                <Layout style={{ padding: "24px" }}>
                    <Content
                        style={{
                            margin: 0,
                            padding: "24px",
                            minHeight: "calc(100vh - 64px)",
                            backgroundColor: colorBgContainer
                        }}
                    >
                        {outlet}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
