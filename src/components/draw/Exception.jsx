import React, {Component} from 'react';
import { Row, Col, Card } from 'antd';
import DrawExceps from './DrawExceps';
import BreadcrumbCustom from '../BreadcrumbCustom';
import FormDrawExcepList from './DrawExcepListForm'


class DrawExcepList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filters: {},
        }

        this.handleFilters = this.handleFilters.bind(this);
    }

    handleFilters = (filters) => {
        console.log("filters: ", filters)
        this.setState({filters: filters});
    }

    render() {
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="订单" second="订单列表" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <FormDrawExcepList handleFilters={this.handleFilters.bind(this)} />
                                <DrawExceps filters={this.state.filters} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DrawExcepList;