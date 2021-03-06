import React from 'react';
import Select from 'react-select';
import {FormattedMessage} from 'react-intl';

interface Props {
  language: languageOption;
  setLanguage: React.Dispatch<React.SetStateAction<languageOption>>;
}

export interface languageOption {
  value: string;
  icon: string;
  label: string;
}

export const languageOptions: languageOption[] = [
  { value: 'fr', icon: '🇫🇷', label: 'Français' },
  { value: 'en', icon: '🇬🇧', label: 'English' },
  { value: 'es', icon: '🇪🇸', label: 'Español' },
  { value: 'ja', icon: '🇯🇵', label: '日本語' },
];

const getLabel = ({ icon, label }: languageOption): JSX.Element => {
  return (
    <div style={{ alignItems: 'center', display: 'flex' }}>
      <span style={{ fontSize: 18, marginRight: '0.5em' }}>{icon}</span>
      <span style={{ fontSize: 14 }}>{label}</span>
    </div>
  );
}

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: 200,
    fontSize: 14,
    borderColor: "rgb(229, 231, 235)"
  }),
  menu: (provided) => ({
    ...provided,
    width: 200
  })
};

export function LanguageSelect({language, setLanguage}: Props): JSX.Element {

  return (
    <FormattedMessage id="language_select.choose">
      {(msg)=>(
        <Select
          formatOptionLabel={getLabel}
          value ={language}
          onChange={setLanguage}
          options={languageOptions}
          styles={customStyles}
          placeholder={msg}
        />
      )}

    </FormattedMessage>
  );
}

