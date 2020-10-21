import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon'
import { mount } from 'enzyme';
import './setup.js';

import { ContactForm } from '../components/contact-form';


describe('ContactForm Component', () => {

    var wrapper, contactData, fields, onChange, onSubmit;
    beforeEach(() => {
        // Initial Form Data
        contactData = {
            name: 'Test',
            email: 'test@example.com',
            option: 'A',
            select: '3',
            message: 'Test message',
            terms: true
        };
        // Form callbacks Spies
        onChange = sinon.spy();
        onSubmit = sinon.spy();
        // Form Wrapper
        wrapper = mount(<ContactForm data={contactData}
                                     onChange={onChange}
                                     onSubmit={onSubmit}/>);
        // Form Fields wrappers
        fields = {
            name: wrapper.find('[name="name"]'),
            email: wrapper.find('[name="email"]'),
            options: wrapper.find('[name="option"]'),
            select: wrapper.find('[name="select"]'),
            message: wrapper.find('[name="message"]'),
            terms: wrapper.find('[name="terms"]'),
        };
    });

    it('should call onSubmit when form is submitted', () => {
      onSubmit.resetHistory();
      wrapper.find('form').simulate('submit');

      expect(onSubmit.calledWithMatch(contactData)).to.be.true;
      expect(onSubmit).to.have.property('callCount', 1);
    });

    it('should call onSubmit when send button is clicked', () => {
      onSubmit.resetHistory();

      let defaultPrevented = false;
      wrapper.find('form [type="submit"]').simulate('click', { preventDefault() { defaultPrevented = true; } });
      if (!defaultPrevented) {
        wrapper.find('form').simulate('submit');
      }

      expect(onSubmit.called).to.be.true;
      expect(onSubmit).to.have.property('callCount', 1);
    });

    it('should call onChanges with updated contact data when `name` field changes', () => {
        testOnChanges(onChange, 'name');
    });

    it('should call onChanges with updated contact data when `email` field changes', () => {
        testOnChanges(onChange, 'email');
    });

    it('should call onChanges with updated contact data when `options` field changes', () => {
        const key = 'option';

        fields.options.forEach(option => {
            option.simulate('change')
            expect(onChange.calledWithMatch({
                ...contactData,
                [key]: option.instance().value
            }), `onChange wasn't called when '${key}' changed`).to.be.ok
        });
    });

    it('should call onChanges with updated contact data when `select` field changes', () => {
        // Get IDs and test with random one
        let keys = wrapper.instance().options.map(option => option.id.toFixed());
        testOnChanges(onChange, 'select', keys[1]);
    });

    it('should call onChanges with updated contact data when `message` field changes', () => {
        testOnChanges(onChange, 'message');
    });

    it('should call onChanges with updated contact data when `terms` field changes', () => {
        testOnChanges(onChange, 'terms', true);
    });

    function testOnChanges(spy, key, changedValue) {
        if (typeof changedValue === 'boolean') {
            fields[key].instance().checked = changedValue;
        } else {
            changedValue = changedValue || `Changed ${key}`;
            fields[key].instance().value = changedValue;
        }
        fields[key].simulate('change');

        expect(spy.calledWithMatch({
            ...contactData,
            [key]: changedValue
        }), `onChange wasn't called when '${key}' changed`).to.be.ok;
    };

    it('should update `name` field value', () => {
         testField('name', fields.name, 'name', 'changed');
    });

    it('should update `email` field value', () => {
         testField('email', fields.email, 'email', 'changed');
    });

    it('should show correct initial value for `options` field', () => {
        // Check initial value
        fields.options.forEach(option => {
            if (option.instance().value == contactData.option) {
                expect(option, `Initial 'options' field is not checked`).to.be.checked();
            } else {
                expect(option, `Incorrect 'options' field is checked`).not.to.be.checked();
            }
        });
    });

    it('should update `options` field', () => {
        // Change Value
        let changedValue = ['B','C'][1];
        wrapper.setProps({
            data:{
                ...contactData,
                option: changedValue
            }
        });
        wrapper.update();

        // Check Changed Value
        fields.options.forEach(option => {
            if (option.instance().value == changedValue) {
                expect(option, `Incorrect 'options' field is checked after update`).to.be.checked();
            } else {
                expect(option, `Incorrect 'options' field is checked after update`).not.to.be.checked();
            }
        });

    });

    it('should update `select` field value', () => {
        // Get IDs and test with random one
        let keys = wrapper.instance().options.map(option => option.id.toFixed());
        testField('select', fields.select, 'select', keys[1]);
    });

    it('should update `message` field value', () => {
        testField('message', fields.message, 'message', 'changed');
    });

    function testField(name, field, key, changedValue) {
        // Test initial value
        expect(field, `Field '${name}' initial value is missing`).to.have.value(contactData[key]);
        // Change Value
        wrapper.setProps({
            data:{
                ...contactData,
                [key]: changedValue
            }
        });
        wrapper.update();
        // Test changed Value
        expect(field, `Field '${name}' value is not updated correctly`).to.have.value(changedValue);
    }

    it('should render options with labels using component`s `options` values', () => {
        let optionsConfigured = wrapper.instance().options.map(option => option.label);
        let optionsRendered  = fields.select.find('option').map(node => node.instance().textContent);
        expect(optionsConfigured, 'Select question type options are not rendered correctly').to.deep.eq(optionsRendered);
    });

});
