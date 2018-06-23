import React, { Component } from 'react';
import { Card, Form, Input, Select, Row, Col, Button, DatePicker, message, Modal } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {AdjustDrawIssueNoFunc} from '../../axios/draw';

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

class DrawIssueNoEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) {
                return
            }

            let params = {
                itemCode: fieldsValue.itemCode,
                drawIssue: fieldsValue.drawIssue,
                drawDate: fieldsValue['drawDate'].format('YYYY-MM-DD HH:mm:ss'),
            }

            // 在 confirm 的 onOk 中调用 this.adjustDrawIssueEdit 需要在外部声明
            const adjustDrawIssueEdit = this.adjustDrawIssueEdit
            confirm({
                title: '确认是否提交?',
                onOk() {
                    console.log('OK');
                    adjustDrawIssueEdit(params)
                },
                onCancel() {
                },
            });

        });
    };

    // 购买期号调整
    adjustDrawIssueEdit = (params = {}) => {
        this.setState({ loading: true });

        // 获取开奖异常列表
        AdjustDrawIssueNoFunc(params).then((res) => {
            message.success("更改期号成功")
            this.setState({
                loading: false,
            });
        }).catch((error) => {
            message.error("更改期号失败")
            this.setState({ loading: false });
        });
    }

    // 只包含数字和字母
    LetterNum = (rule, value='', callback) => {
        if (value.length > 32) {
            callback("数据过长,应少于32");
            return;
        }
        let reg = /^[0-9a-zA-Z]+$/
        if(!reg.test(value)){
            callback("你输入的字符不是数字或者字母");
            return;
        }
        callback();
        return;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 8,
                },
            },
        };

        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };

        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="订单" second="期号调整" />
                <Row gutter={24}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="编辑购买期号" bordered={false} >
                                <Form onSubmit={this.handleSubmit} style={{float: 'left', marginTop: 20, width: 500}} >
                                    <FormItem
                                        {...formItemLayout}
                                        label="选择订单"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('itemCode', {
                                            initialValue: '111111',
                                            rules: [
                                                { required: true, message: 'Please select!' },
                                            ],
                                        })(
                                            <Select
                                                showSearch
                                                allowClear
                                                placeholder="选择订单"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >

                                                <Option value="111111">支付订单</Option>
                                                <Option value="222222">购买订单</Option>
                                                <Option value="333333">出货订单</Option>
                                            </Select>
                                        )}
                                    </FormItem>

                                    <FormItem
                                        {...formItemLayout}
                                        label="输入期号"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('drawIssue', {
                                            rules: [{
                                                required: true, message: '请输入合理期号',
                                            },{
                                                validator: this.LetterNum,
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>

                                    <FormItem
                                        {...formItemLayout}
                                        label="下单时间: "
                                    >
                                        {getFieldDecorator('drawDate', config)(
                                            <DatePicker
                                                showTime
                                                style={{width: 335}}
                                                placeholder="Please Select Time"
                                                format="YYYY-MM-DD HH:mm:ss"
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit" size="large">提交</Button>
                                    </FormItem>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const FormDrawIssueNoEdit = Form.create()(DrawIssueNoEdit);

export default FormDrawIssueNoEdit;