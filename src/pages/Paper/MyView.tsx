import { Modal } from 'antd';

const warning = () => {
    Modal.warning({
        title: '删除账号',
        content: '警告： 删除账号将会清除全部数据！',
    });
};

const MyView: React.FC = () => {
    return (
        <div>
            <h3>邮箱：</h3>1528338926@qq.com
            <div onClick={warning}><h3>删除账号</h3></div>
        </div>
    )
}
export default MyView;
