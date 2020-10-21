import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import './setup.js';

import { Message } from '../components/message';

describe('Message Component', () => {

  it('should render Message with no header and empty content', () => {
      let wrapper = mount(<Message/>);
      expect(wrapper.find('.message-header').exists(),
          '.message-header should not be rendered when no header given').to.be.false;
  });

  it('should render Message with header when `header` prop was provided', () => {
      let testHeader = 'Test Header';

      let wrapper = mount(<Message header={testHeader}/>);

      expect(wrapper.find('.message-header').exists(),
          '.message-header should be rendered when header prop given').to.be.true;

      expect(wrapper.find('.message-header').text()).to.be.eq(testHeader);
  });

  it('should render Message with body when `text` prop was provided', () => {
      let testText = 'Test Text';

      let wrapper = mount(<Message text={testText}/>);

      expect(wrapper.find('.message-body').exists(),
          '.message-body should be rendered when text prop given').to.be.true;

      expect(wrapper.find('.message-body').text().trim()).to.be.equal(testText);
  });

  it('should render Messsage content children when `text` prop was not provided', () => {
      let testContent = <div>Text HTML Content</div>;

      let wrapper = mount(<Message>{testContent}</Message>);

      expect(wrapper.find('.message-body').exists(),
          '.message-body should be rendered when children prop given').to.be.true;

      expect(wrapper.find('.message-body')).to.containMatchingElement(testContent);
  });

});
