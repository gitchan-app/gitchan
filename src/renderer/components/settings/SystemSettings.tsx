import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeviceDesktopIcon, SyncIcon } from '@primer/octicons-react';
import { Button, ButtonGroup, IconButton, Stack, Text } from '@primer/react';

import {
  APPLICATION,
  MASCOT_MODELS,
  type MascotModelId,
} from '../../../shared/constants';

import { useAppContext } from '../../context/App';
import { defaultSettings } from '../../context/defaults';
import {
  changeLanguage,
  getCurrentLanguage,
  type Language,
  SUPPORTED_LANGUAGES,
} from '../../i18n';
import type { Percentage } from '../../types';
import { OpenPreference } from '../../types';
import {
  canDecreaseVolume,
  canIncreaseVolume,
  decreaseVolume,
  increaseVolume,
} from '../../utils/notifications/sound';
import { Checkbox } from '../fields/Checkbox';
import { RadioGroup } from '../fields/RadioGroup';
import { VolumeDownIcon } from '../icons/VolumeDownIcon';
import { VolumeUpIcon } from '../icons/VolumeUpIcon';
import { Title } from '../primitives/Title';

export const SystemSettings: FC = () => {
  const { settings, updateSetting } = useAppContext();
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    getCurrentLanguage(),
  );

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    changeLanguage(language);
  };

  return (
    <fieldset>
      <Title icon={DeviceDesktopIcon}>{t('settings.system.title')}</Title>

      <Stack direction="vertical" gap="condensed">
        <Stack
          align="center"
          className="text-sm"
          direction="horizontal"
          gap="condensed"
        >
          <label className="cursor-pointer" htmlFor="language">
            {t('settings.system.language')}
          </label>
          <select
            className="cursor-pointer rounded border border-gray-300 bg-transparent px-2 py-1 text-sm"
            id="language"
            onChange={(evt) =>
              handleLanguageChange(evt.target.value as Language)
            }
            value={currentLanguage}
          >
            {Object.keys(SUPPORTED_LANGUAGES).map((lang) => (
              <option key={lang} value={lang}>
                {t(`settings.system.languages.${lang}`)}
              </option>
            ))}
          </select>
        </Stack>

        <RadioGroup
          label={t('settings.system.openLinks')}
          name="openLinks"
          onChange={(evt) => {
            updateSetting('openLinks', evt.target.value as OpenPreference);
          }}
          options={[
            {
              label: t('settings.system.openForeground'),
              value: OpenPreference.FOREGROUND,
            },
            {
              label: t('settings.system.openBackground'),
              value: OpenPreference.BACKGROUND,
            },
          ]}
          tooltip={
            <Stack direction="vertical" gap="condensed">
              <Text>
                Controls the behavior of how external links should opened.
              </Text>
              <Text>
                <Text as="strong">Foreground</Text> will open the link and bring
                the opened window or browser to the front.
              </Text>
              <Text>
                <Text as="strong">Background</Text> opens the link without
                stealing focus from the current window.
              </Text>
            </Stack>
          }
          value={settings.openLinks}
        />

        <Checkbox
          checked={settings.keyboardShortcut}
          label={t('settings.system.keyboardShortcut')}
          name="keyboardShortcut"
          onChange={(evt) =>
            updateSetting('keyboardShortcut', evt.target.checked)
          }
          tooltip={
            <div>
              {t('settings.system.keyboardShortcutDescription')}{' '}
              <Text as="strong" className="text-gitify-caution">
                {APPLICATION.DEFAULT_KEYBOARD_SHORTCUT}
              </Text>
            </div>
          }
        />

        <Checkbox
          checked={settings.showNotifications}
          label={t('settings.system.showSystemNotifications')}
          name="showNotifications"
          onChange={(evt) =>
            updateSetting('showNotifications', evt.target.checked)
          }
          tooltip={
            <Text>
              {t('settings.system.showSystemNotificationsDescription')}
            </Text>
          }
        />

        <Stack
          align="center"
          className="text-sm"
          direction="horizontal"
          gap="condensed"
        >
          <Checkbox
            checked={settings.playSound}
            label={t('settings.system.playSound')}
            name="playSound"
            onChange={(evt) => updateSetting('playSound', evt.target.checked)}
          />

          <ButtonGroup
            className="ml-2"
            data-testid="settings-volume-group"
            hidden={!settings.playSound}
          >
            <IconButton
              aria-label={t('settings.system.volumeDown')}
              data-testid="settings-volume-down"
              disabled={!canDecreaseVolume(settings.notificationVolume)}
              icon={VolumeDownIcon}
              onClick={() => {
                updateSetting(
                  'notificationVolume',
                  decreaseVolume(settings.notificationVolume),
                );
              }}
              size="small"
              unsafeDisableTooltip={true}
            />

            <Button
              aria-label={t('settings.system.volumePercentage')}
              disabled
              size="small"
            >
              {settings.notificationVolume.toFixed(0)}%
            </Button>

            <IconButton
              aria-label={t('settings.system.volumeUp')}
              data-testid="settings-volume-up"
              disabled={!canIncreaseVolume(settings.notificationVolume)}
              icon={VolumeUpIcon}
              onClick={() => {
                updateSetting(
                  'notificationVolume',
                  increaseVolume(settings.notificationVolume),
                );
              }}
              size="small"
              unsafeDisableTooltip={true}
            />

            <IconButton
              aria-label={t('settings.system.resetVolume')}
              data-testid="settings-volume-reset"
              icon={SyncIcon}
              onClick={() => {
                updateSetting(
                  'notificationVolume',
                  defaultSettings.notificationVolume,
                );
              }}
              size="small"
              unsafeDisableTooltip={true}
              variant="danger"
            />
          </ButtonGroup>
        </Stack>

        <Checkbox
          checked={settings.openAtStartup}
          label={t('settings.system.openAtStartup')}
          name="openAtStartup"
          onChange={(evt) => updateSetting('openAtStartup', evt.target.checked)}
          tooltip={<Text>{t('settings.system.openAtStartupDescription')}</Text>}
          visible={!window.gitify.platform.isLinux()}
        />

        <Stack
          align="center"
          className="text-sm"
          direction="horizontal"
          gap="condensed"
        >
          <label className="cursor-pointer" htmlFor="mascotModel">
            {t('settings.system.mascotCharacter')}
          </label>
          <select
            className="cursor-pointer rounded border border-gray-300 bg-transparent px-2 py-1 text-sm"
            id="mascotModel"
            onChange={(evt) => {
              const modelId = evt.target.value as MascotModelId;
              updateSetting('mascotModel', modelId);
              window.gitify.mascot.changeModel(modelId);
            }}
            value={settings.mascotModel}
          >
            {Object.values(MASCOT_MODELS).map((model) => (
              <option key={model.id} value={model.id}>
                {t(`mascot.${model.id}.name`)} -{' '}
                {t(`mascot.${model.id}.description`)}
              </option>
            ))}
          </select>
        </Stack>

        <Stack
          align="center"
          className="text-sm"
          direction="horizontal"
          gap="condensed"
        >
          <label className="cursor-pointer" htmlFor="mascotScale">
            {t('settings.system.mascotSize')}
          </label>
          <input
            className="w-24 cursor-pointer"
            id="mascotScale"
            max="150"
            min="50"
            onChange={(evt) => {
              const scale = Number.parseInt(evt.target.value, 10) as Percentage;
              updateSetting('mascotScale', scale);
              window.gitify.mascot.setScale(scale);
            }}
            step="10"
            type="range"
            value={settings.mascotScale}
          />
          <ButtonGroup data-testid="settings-mascot-scale-group">
            <Button aria-label="Scale percentage" disabled size="small">
              {settings.mascotScale}%
            </Button>
            <IconButton
              aria-label="Reset scale"
              data-testid="settings-mascot-scale-reset"
              icon={SyncIcon}
              onClick={() => {
                updateSetting('mascotScale', defaultSettings.mascotScale);
                window.gitify.mascot.setScale(defaultSettings.mascotScale);
              }}
              size="small"
              unsafeDisableTooltip={true}
              variant="danger"
            />
          </ButtonGroup>
        </Stack>

        <Stack
          align="center"
          className="text-sm"
          direction="horizontal"
          gap="condensed"
        >
          <label className="cursor-pointer" htmlFor="mascotBadgeY">
            {t('settings.system.badgePosition')}
          </label>
          <input
            className="w-24 cursor-pointer"
            id="mascotBadgeY"
            max="200"
            min="20"
            onChange={(evt) => {
              const y = Number.parseInt(evt.target.value, 10);
              updateSetting('mascotBadgeY', y);
              window.gitify.mascot.setBadgeY(y);
            }}
            step="10"
            type="range"
            value={settings.mascotBadgeY}
          />
          <ButtonGroup data-testid="settings-mascot-badge-group">
            <Button aria-label="Badge Y position" disabled size="small">
              {settings.mascotBadgeY}px
            </Button>
            <IconButton
              aria-label="Reset badge position"
              data-testid="settings-mascot-badge-reset"
              icon={SyncIcon}
              onClick={() => {
                updateSetting('mascotBadgeY', defaultSettings.mascotBadgeY);
                window.gitify.mascot.setBadgeY(defaultSettings.mascotBadgeY);
              }}
              size="small"
              unsafeDisableTooltip={true}
              variant="danger"
            />
          </ButtonGroup>
        </Stack>

        <Stack
          align="center"
          className="text-sm"
          direction="horizontal"
          gap="condensed"
        >
          <label className="cursor-pointer" htmlFor="mascotWindowScale">
            {t('settings.system.windowSize')}
          </label>
          <input
            className="w-24 cursor-pointer"
            id="mascotWindowScale"
            max="200"
            min="50"
            onChange={(evt) => {
              const scale = Number.parseInt(evt.target.value, 10) as Percentage;
              updateSetting('mascotWindowScale', scale);
              window.gitify.mascot.setWindowScale(scale);
            }}
            step="10"
            type="range"
            value={settings.mascotWindowScale}
          />
          <ButtonGroup data-testid="settings-mascot-window-scale-group">
            <Button aria-label="Window scale percentage" disabled size="small">
              {settings.mascotWindowScale}%
            </Button>
            <IconButton
              aria-label="Reset window scale"
              data-testid="settings-mascot-window-scale-reset"
              icon={SyncIcon}
              onClick={() => {
                updateSetting(
                  'mascotWindowScale',
                  defaultSettings.mascotWindowScale,
                );
                window.gitify.mascot.setWindowScale(
                  defaultSettings.mascotWindowScale,
                );
              }}
              size="small"
              unsafeDisableTooltip={true}
              variant="danger"
            />
          </ButtonGroup>
        </Stack>
      </Stack>
    </fieldset>
  );
};
