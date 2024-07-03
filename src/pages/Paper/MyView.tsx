import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';


const warning = () => {
    Modal.warning({
        title: '删除账号',
        content: '警告： 删除账号将会清除全部数据！',
    });
};

const MyView: React.FC = () => {
    const { t} = useTranslation();
    console.log('myView rendered'); // 确认组件重新渲染


    return (
        <div>
            <h3>{t('my.mail')}:</h3>1528338926@qq.com
            <div onClick={warning}><h3>{t('my.delete')}</h3></div>
        </div>
    )
}
export default MyView;
