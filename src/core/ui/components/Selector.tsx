import { SelectorDataType } from '@/core/types/selectorTypes';
import Select from 'react-select';

import React from 'react';
import AsyncSelect from 'react-select/async';
import Creatable from 'react-select/creatable';

export interface SelectorProps {
  label?: string;
  placeholder?: string;
  id: string;
  name?: string;
  isMulti?: boolean;
  required?: boolean;
  className?: string;
  options: any;
  defaultValue?: SelectorDataType;
  isClearable?: boolean;
  isCompact?: boolean;
  suffix?: React.ReactNode;
  type?: 'Creatable' | 'Select' | 'Async';
  onChange?: any;
  formatOptionLabel?: () => React.ReactNode;
}

class Selector extends React.Component {
  constructor(props: SelectorProps) {
    super(props);
  }
  props: SelectorProps = this.props;

  render() {
    return (
      <div className={` flex-col last-of-type:mb-0 ` + this.props.className}>
        {this.props.label ? (
          <label htmlFor={this.props.id} className="text-sm mb-2 text-dark-500">
            {this.props.label}
          </label>
        ) : (
          <></>
        )}
        {this.props.type == 'Creatable' ? (
          <Creatable
            id={this.props.id}
            isClearable={this.props.isClearable}
            required={this.props.required}
            options={this.props.options}
            isMulti={this.props.isMulti}
            name={this.props.name}
            placeholder={this.props.placeholder}
            formatOptionLabel={this.props.formatOptionLabel}
            defaultValue={this.props.defaultValue}
            onChange={this.props.onChange}
            styles={{
              control: () => ({
                border: 'none',
                outline: 'none',
                borderRadius: 6,
                backgroundColor: '#F5F8FA',
                flexWrap: 'wrap',
              }),
            }}
            className="w-full border rounded-md bg-transparent text-sm focus:outline-none custom-scrollbar min-h-[44px]"
          />
        ) : this.props.type == 'Async' ? (
          <AsyncSelect
            id={this.props.id}
            required={this.props.required}
            isMulti={this.props.isMulti}
            name={this.props.name}
            placeholder={this.props.placeholder}
            loadOptions={this.props.options} // Assuming options is a function for AsyncSelect
            formatOptionLabel={this.props.formatOptionLabel}
            onChange={this.props.onChange}
            styles={{
              control: () => ({
                minHeight: this.props.isCompact ? 34 : 44,
                maxHeight: this.props.isCompact ? 34 : 44,
                border: 'none',
                outline: 'none',
                borderRadius: 6,
                backgroundColor: '#F5F8FA',
                flexWrap: 'wrap',
              }),
            }}
            className={`w-full border rounded-md bg-transparent text-sm focus:outline-none custom-scrollbar items-center `}
          />
        ) : (
          <Select
            id={this.props.id}
            required={this.props.required}
            isMulti={this.props.isMulti}
            name={this.props.name}
            placeholder={this.props.placeholder}
            options={this.props.options}
            formatOptionLabel={this.props.formatOptionLabel}
            onChange={this.props.onChange}
            styles={{
              control: () => ({
                minHeight: this.props.isCompact ? 34 : 44,
                maxHeight: this.props.isCompact ? 34 : 44,
                border: 'none',
                outline: 'none',
                borderRadius: 6,
                backgroundColor: '#F5F8FA',
                flexWrap: 'wrap',
                display: 'flex',
              }),
            }}
            className={`w-full border rounded-md bg-transparent text-sm focus:outline-none custom-scrollbar `}
          />
        )}
      </div>
    );
  }
}

export default Selector;
