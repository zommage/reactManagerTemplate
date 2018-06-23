import React, {Component} from 'react';
import { Row, Select, Button, DatePicker, Form } from 'antd';
import {withRouter} from 'react-router-dom'

const Option = Select.Option;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

class Exceptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // 查询的参数
            filters: {},
        }

        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd = () =>{
        console.log("add new exception")
        this.props.history.push({
            pathname: '/app/order/addDrawExcep',
        })
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                let startTime = 0
                let endTime = 0

                for(let key in fieldsValue['rangeTimePicker']) {
                    // 将字符串转换为 date类型
                    let d = new Date(Date.parse(fieldsValue['rangeTimePicker'][key].replace(/-/g,  "/")))
                    // Date.parse 精确到秒
                    let tmpTimestamp = Date.parse(d)/1000
                    if(key === '0'){
                       startTime = tmpTimestamp
                    }else if(key === '1') {
                       endTime = tmpTimestamp
                    }
                }

                //  将子组件的值传给父组件,
                let filters = {
                        code: fieldsValue.code,
                        startTime: startTime,
                        endTime: endTime,
                    }
                this.props.handleFilters(filters);
            }
        });
    }

    handleTimeChange = (value, dateString) =>{
        for(let key in dateString) {
            // 将字符串转换为 date类型
            let d = new Date(Date.parse(dateString[key].replace(/-/g,  "/")))
            // Date.parse 精确到秒
            let tmpTimestamp = Date.parse(d)/1000
            if(key === '0'){
                console.log("000000000")
                this.setState({
                    startTime: tmpTimestamp,
                });
            }else if(key === '1'){
                this.setState({
                    endTime: tmpTimestamp,
                });
            }
        }
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const rangeConfig = {
            rules: [{ type: 'array', required: false, message: 'Please select time!' }],
        };
        return (
            <div className="gutter-example">
                <Row gutter={24}>
                    <Form layout="inline"
                          onSubmit={this.handleSearch}
                          style={{float: 'right', marginBottom: 20}}
                    >
                        <FormItem hasFeedback >
                            {getFieldDecorator('code', {
                            })(
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="选择订单"
                                    style={{width: 150}}
                                >

                                    <Option value="111111">支付订单</Option>
                                    <Option value="222222">购买订单</Option>
                                    <Option value="333333">出货订单</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('rangeTimePicker', rangeConfig)(
                                <RangePicker
                                    showTime
                                    style={{width: 300}}
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button
                                type="primary"
                                icon="search"
                                htmlType="submit"
                            >
                                Search
                            </Button>
                        </FormItem>

                        <FormItem>
                            <Button type="primary" icon="plus"
                                    onClick={this.handleAdd}
                            >
                                新建订单
                            </Button>
                        </FormItem>
                    </Form>
                </Row>
            </div>
        )
    }
}

const FormDrawExcepList = Form.create()(Exceptions);

export default withRouter(FormDrawExcepList);