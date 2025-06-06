import { DateToolbarItem } from '@seelen-ui/lib/types';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Item } from '../item/infra/infra';

import { Selectors } from '../shared/store/app';
import { useSyncClockInterval } from 'src/apps/shared/hooks';

import { WithDateCalendar } from './Calendar';

interface Props {
  module: DateToolbarItem;
}

const momentJsLangMap: { [key: string]: string } = {
  'no': 'nb',
  'zh': 'zh-cn',
};

export function DateModule({ module }: Props) {
  const dateFormat = useSelector(Selectors.dateFormat);

  const {
    i18n: { language: lang },
  } = useTranslation();
  let language = momentJsLangMap[lang] || lang;

  const [date, setDate] = useState(moment().locale(language).format(dateFormat));

  // inmediately update the date, like interval is reseted on deps change
  useEffect(() => {
    setDate(moment().locale(language).format(dateFormat));
  }, [dateFormat, language]);

  useSyncClockInterval(
    () => {
      setDate(moment().locale(language).format(dateFormat));
    },
    dateFormat.includes('ss') ? 'seconds' : 'minutes',
    [dateFormat, language],
  );

  return (
    <WithDateCalendar>
      <Item extraVars={{ date }} module={module} />
    </WithDateCalendar>
  );
}
