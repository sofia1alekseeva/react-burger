import moment from 'moment';
import 'moment/locale/ru';

export const formatOrderTime = (time: moment.MomentInput) => {
  moment.locale('ru');
  return moment(time).calendar();
};