import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import './setup.js';

import { App } from '../components/app';
import { ContactForm } from '../components/contact-form';
import { Message } from '../components/message';
import { UserPanel } from '../components/user-panel';

describe('App Component', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<App/>);
    });

    it('should render ContactForm', () => {
        expect(wrapper.find(ContactForm).exists()).to.be.true;
    });

    it('should hide <ContactForm/> after sendContact() was called', () => {
        wrapper.instance().sendContact({});
        wrapper.update();
        expect(wrapper.find(ContactForm).exists()).not.to.be.true;
    });

    it('should show <Message/> after sendContact() was called', () => {
        expect(wrapper.find(Message).exists()).to.be.false;
        wrapper.instance().sendContact({});
        wrapper.update();
        expect(wrapper.find(Message).exists()).to.be.true;
    });

    it('should have empty currentUser data until logged in', () => {
        let instance = wrapper.instance();
        expect(instance.state.currentUser).not.to.exist;
        instance.logIn();
        expect(instance.state.currentUser).to.exist;
    });

    it('should populate contact with user details (name, email) after login', () => {
        let instance = wrapper.instance();

        expect(instance.state.currentUser).not.to.exist;

        instance.logIn();
        expect(instance.state.currentUser.name).to.eq(instance.state.contact.name);
        expect(instance.state.currentUser.email).to.eq(instance.state.contact.email);
    });

    it('should show <UserPanel> with currentUser info after login', () => {
        expect(wrapper.find(UserPanel).exists()).to.be.false;

        wrapper.instance().logIn();
        wrapper.update();
        expect(wrapper.find(UserPanel).exists()).to.be.true;
    });
});
