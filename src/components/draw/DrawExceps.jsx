/***************
@   开奖异常列表
@**************/
import React from 'react';
import { Table, Button } from 'antd';
import {DrawExcepList} from '../../axios/draw';
import {withRouter} from 'react-router-dom'

const columns = (history)=>[{
    title: '名称',
    dataIndex: 'name',
    render: function (text, record, index) {
        let content = '充值订单'
        return (
            <span>
                {content}
            </span>
        )
    },
}, {
    title: '期号',
    dataIndex: 'issueNo',
}, {
    title: '优惠号码',
    dataIndex: 'prizeNum',
}, {
    title: '下单时间',
    dataIndex: 'drawTime',
    sorter: true,
}, {
    title: '人工处理状态',
    dataIndex: 'manualStatus',
    filters: [{
        text: '全部',
        value: "all",
    }, {
        text: '未处理',
        value: '1',
    }, {
        text: '异常预警',
        value: '2',
    }, {
        text: '24小时成功处理',
        value: '3',
    }, {
        text: '已超时',
        value: '4',
    }],
    filterMultiple: false,
    render: function (text, record, index) {
        let content = '未处理'
        if(record.manualStatus === 1){
            content = '未处理'
        }else if(record.manualStatus === 2){
            content = '异常预警'
        }else if(record.manualStatus === 3){
            content = '24小时成功处理'
        }else if(record.manualStatus === 4){
            content = '已超时'
        }else {
        }
        return (
            <span>
                {content}
            </span>
        )
    },
}, {
    title: '系统推送状态',
    dataIndex: 'status',
    filters: [{
        text: '全部',
        value: "all",
    }, {
        text: '处理中',
        value: '1',
    }, {
        text: '24小时成功处理',
        value: '2',
    }, {
        text: '已超时',
        value: '3',
    }],
    filterMultiple: false,
    render: function (text, record, index) {
        let content = '未处理'
        if(record.status === 1){
            content = '处理中'
        }else if(record.status === 2){
            content = '24小时成功处理'
        }else if(record.status === 3){
            content = '已超时'
        }else {
        }
        return (
            <span>
                {content}
            </span>
        )
    },
}, {
    title: '操作',
    width: '20%',
    render: function (text, record, index) {
        return (
            <DrawClick history={history} record={record} />
        )
    },
}];

class DrawClick extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            record: this.props.record,
        };

        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit = () => {
        console.log("recodr: ", this.state.record)
        this.props.history.push({
            pathname: '/app/draw/editdrawexcep',
            state: this.state.record,
        })
    }

    render() {
        return (
            <span>
              <Button type="primary" size="small"
                      onClick={this.handleEdit}
              >
                编辑
              </Button>
                <Button type="primary" size="small">
                历史记录
              </Button>
            </span>
        );
    }
}

class DrawExceps extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            pagination: {
                current: 1,
                pageSize: 15,
                showQuickJumper: true,
            },
            loading: false,

            // 默认请求参数
            params: {
                "page": 1,
                "pageSize": 15,
                "drawTimeOrder": "desc",
            },
        };

        this.handleTableChange = this.handleTableChange.bind(this);
   }

    // 页面加载后发送请求
    componentDidMount() {
        this.queryFetch(this.state.params)
    }

    // 用于接收传过来的参数
    componentWillReceiveProps(nextProps){
        if(nextProps.filters !== this.props.filters) {
            if (isNaN(nextProps.filters.startTime) || nextProps.filters.startTime === 0) {
                nextProps.filters.startTime = ''
            }
            if (isNaN(nextProps.filters.endTime) || nextProps.filters.endTime === 0) {
                nextProps.filters.endTime = ''
            }
            this.setState({
                params: {
                    ...this.state.params,
                    code: nextProps.filters.code,
                    startTime: nextProps.filters.startTime,
                    endTime: nextProps.filters.endTime,
                }
            }, () => {
                this.queryFetch(this.state.params);
            });
        }
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current
        pager.pageSize = pagination.pageSize

        const queryParams = { ...this.state.params };
        queryParams.page = pagination.current;
        queryParams.pageSize = pagination.pageSize
        for (let key in filters) {
            if(key === 'manualStatus'){
                if(filters[key][0] !== 'all'){
                    queryParams.manualStatus = filters.manualStatus
                }
            }else if(key === 'status'){
                if(filters[key][0] !== 'all'){
                    queryParams.status = filters.status
                }
            }
        }

        if(sorter.field === 'drawTime') {
            if(sorter.order === 'descend') {
                queryParams.drawTimeOrder = 'desc'
            }else {
                queryParams.drawTimeOrder = 'asce'
            }
        }

        this.setState({
            pagination: pager,
            params: queryParams,
        },()=>{
            this.queryFetch(this.state.params);
        });
    }

    // 发送查询请求
    queryFetch = (params = {}) => {
        this.setState({ loading: true });
        DrawExcepList(params).then((res) => {
            const pagination = { ...this.state.pagination };
            pagination.total = res.data.data.totalCount;

            this.setState({
                loading: false,
                data: res.data.data.content,
                pagination: pagination
            });

        }).catch((error) => {
            this.setState({ loading: false });
            console.log("==========draw exception listerr:", error)
        });
    }

    render() {
        const history = this.props.history
        return (
            <Table columns={columns(history)}
                   dataSource={this.state.data}
                   rowKey={(r,i)=>(i)}
                   loading={this.state.loading}
                   bordered
                   pagination={this.state.pagination}
                   onChange={this.handleTableChange}
            />
        );
    }
}

export default withRouter(DrawExceps);