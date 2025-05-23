import { HideMode, SeelenWegMode, SeelenWegSide } from '@seelen-ui/lib';
import { Button, InputNumber, Select, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../shared/utils/infra';

import { RootSelectors } from '../shared/store/app/selectors';
import { OptionsFromEnum } from '../shared/utils/app';
import { SeelenWegActions } from './app';
import { Icon } from 'src/apps/shared/components/Icon';

import { SettingsGroup, SettingsOption, SettingsSubGroup } from '../../components/SettingsBox';

export const SeelenWegSettings = () => {
  const settings = useAppSelector(RootSelectors.seelenweg);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onToggleEnable = (value: boolean) => {
    dispatch(SeelenWegActions.setEnabled(value));
  };

  return (
    <>
      <SettingsGroup>
        <SettingsOption>
          <div>
            <b>{t('weg.enable')}</b>
          </div>
          <Switch checked={settings.enabled} onChange={onToggleEnable} />
        </SettingsOption>
      </SettingsGroup>

      <SettingsGroup>
        <SettingsSubGroup label={t('weg.label')}>
          <SettingsOption>
            <div>{t('weg.width')}</div>
            <Select
              style={{ width: '120px' }}
              value={settings.mode}
              options={OptionsFromEnum(t, SeelenWegMode, 'weg.mode')}
              onChange={(value) => dispatch(SeelenWegActions.setMode(value))}
            />
          </SettingsOption>
          <SettingsOption>
            <div>{t('weg.dock_side')}</div>
            <Button.Group style={{ width: '120px' }}>
              {Object.values(SeelenWegSide).map((side) => (
                <Button
                  key={side}
                  type={side === settings.position ? 'primary' : 'default'}
                  onClick={() => dispatch(SeelenWegActions.setPosition(side))}
                >
                  <Icon iconName={`CgToolbar${side}`} size={18} />
                </Button>
              ))}
            </Button.Group>
          </SettingsOption>
          <SettingsOption>
            <div>{t('weg.margin')}</div>
            <InputNumber
              value={settings.margin}
              onChange={(value) => dispatch(SeelenWegActions.setMargin(value || 0))}
            />
          </SettingsOption>
          <SettingsOption>
            <div>{t('weg.padding')}</div>
            <InputNumber
              value={settings.padding}
              onChange={(value) => dispatch(SeelenWegActions.setPadding(value || 0))}
            />
          </SettingsOption>
        </SettingsSubGroup>
      </SettingsGroup>

      <SettingsGroup>
        <SettingsSubGroup
          label={
            <SettingsOption>
              <b>{t('weg.auto_hide')}</b>
              <Select
                style={{ width: '120px' }}
                value={settings.hideMode}
                options={OptionsFromEnum(t, HideMode, 'weg.hide_mode')}
                onChange={(value) => dispatch(SeelenWegActions.setHideMode(value))}
              />
            </SettingsOption>
          }
        >
          <SettingsOption>
            <span>{t('weg.delay_to_show')} (ms)</span>
            <InputNumber
              value={settings.delayToShow}
              min={0}
              disabled={settings.hideMode === HideMode.Never}
              onChange={(value) => {
                dispatch(SeelenWegActions.setDelayToShow(value || 0));
              }}
            />
          </SettingsOption>
          <SettingsOption>
            <span>{t('weg.delay_to_hide')} (ms)</span>
            <InputNumber
              value={settings.delayToHide}
              min={0}
              disabled={settings.hideMode === HideMode.Never}
              onChange={(value) => {
                dispatch(SeelenWegActions.setDelayToHide(value || 0));
              }}
            />
          </SettingsOption>
        </SettingsSubGroup>
      </SettingsGroup>

      <SettingsGroup>
        <SettingsSubGroup label={t('weg.filtering')}>
          <SettingsOption>
            <div>{t('weg.items.temporal_visibility.label')}</div>
            <Select
              style={{ width: '120px' }}
              value={settings.temporalItemsVisibility}
              options={[
                { value: 'All', label: t('weg.items.temporal_visibility.all') },
                { value: 'OnMonitor', label: t('weg.items.temporal_visibility.on_monitor') },
              ]}
              onChange={(value) => dispatch(SeelenWegActions.setTemporalItemsVisibility(value))}
            />
          </SettingsOption>
          <SettingsOption>
            <div>{t('weg.items.pinned_visibility.label')}</div>
            <Select
              style={{ width: '120px' }}
              value={settings.pinnedItemsVisibility}
              options={[
                { value: 'Always', label: t('weg.items.pinned_visibility.always') },
                { value: 'WhenPrimary', label: t('weg.items.pinned_visibility.when_primary') },
              ]}
              onChange={(value) => dispatch(SeelenWegActions.setPinnedItemsVisibility(value))}
            />
          </SettingsOption>
        </SettingsSubGroup>
      </SettingsGroup>

      <SettingsGroup>
        <SettingsSubGroup label={t('weg.items.label')}>
          <SettingsOption>
            <div>{t('weg.items.size')}</div>
            <InputNumber
              value={settings.size}
              onChange={(value) => dispatch(SeelenWegActions.setSize(value || 0))}
            />
          </SettingsOption>
          <SettingsOption>
            <div>{t('weg.items.gap')}</div>
            <InputNumber
              value={settings.spaceBetweenItems}
              onChange={(value) => dispatch(SeelenWegActions.setSpaceBetweenItems(value || 0))}
            />
          </SettingsOption>
          <SettingsOption>
            <div>{t('weg.items.thumbnail_generation_enabled')}</div>
            <Switch
              checked={settings.thumbnailGenerationEnabled}
              onChange={(value) => dispatch(SeelenWegActions.setThumbnailGenerationEnabled(value))}
            />
          </SettingsOption>
          <SettingsOption>
            <div>{t('weg.items.show_window_title')}</div>
            <Switch
              checked={settings.showWindowTitle}
              onChange={(value) => dispatch(SeelenWegActions.setShowWindowTitle(value))}
            />
          </SettingsOption>
          <SettingsOption>
            <div>{t('weg.items.show_instance_counter')}</div>
            <Switch
              checked={settings.showInstanceCounter}
              onChange={(value) => dispatch(SeelenWegActions.setShowInstanceCounter(value))}
            />
          </SettingsOption>
          <SettingsOption>
            <div>{t('weg.items.visible_separators')}</div>
            <Switch
              checked={settings.visibleSeparators}
              onChange={(value) => dispatch(SeelenWegActions.setVisibleSeparators(value))}
            />
          </SettingsOption>
        </SettingsSubGroup>
      </SettingsGroup>
    </>
  );
};
