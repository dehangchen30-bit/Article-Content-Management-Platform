import { dayjs } from 'element-plus'

// 日期处理
export const formatDate = (time) => dayjs(time).format('YYYY年MM月DD日')
