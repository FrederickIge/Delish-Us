import React from 'react';
import { render } from 'react-testing-library'
import Landingpage from './pages/Landingpage';
import { MemoryRouter } from 'react-router-dom'

it('renders without crashing', () => {
  expect(1 + 1).toBe(2);
});

it('<App/>', () => {
    const wrapper = render(
        <MemoryRouter>
                <Landingpage/>
        </MemoryRouter>
    );
    expect(wrapper.getByText('Welcome to Doggie Time').tagName).toBe('H1')
  });
  