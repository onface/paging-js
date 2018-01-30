import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { expect } from 'chai';
import { mount } from 'enzyme';

import Button from "../lib/index"
import React, { Component } from "react"

describe('<Basic />', () => {
    it('has className', () => {
        expect(
            mount(<Button>demo</Button>).find('.face-btn').length
        ).to.equal(1)
    });
})
